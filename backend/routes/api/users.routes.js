const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { Usuario, Profile } = require("../../db/connection");
//const { check, validationResult } = require("express-validator");
//const midd = require('../Middlewares/midd.usuario')
const usuariosService = require("../../services/users.service");
const midd = require('../../middlewares/midd.users')

router.post("/register", midd.checkDatosAlta, async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10); // aqui nos pasa la contraseña ya encriptada
    const user = await Usuario.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      profile: {
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }
    }, {
      include: [Profile]
    });
    
    res.json(user);
  } catch (error) {
    res
      .status(400)
      .render("404", {
        msj: error.message,
        titulo: "Error al realizar su registro",
      });
  }
});

router.post("/login",  async (req, res) => {
  try {
    const user = await Usuario.findOne({ where: { email: req.body.email } });
    console.log(req.body.email)
    if (user) {
      Usuario
      const iguales = bcrypt.compareSync(req.body.password, user.password);
      if (iguales) {
        let token = await usuariosService.generaToken(req.body);
        console.log('regresa token')
        res.json({usuario:user,token:token});
      } else {
        res.json("Usuario o contraseña no coinciden");
      }
    } else {
        res.json("Usuario o contraseña no coinciden");
    }
    
  } catch (error) {
    res
      .status(400)
      .render("404", {
        msj: error.message,
        titulo: "Error al realizar su registro",
      });
  }
});

router.put("/changePass",  async (req, res) => {
  try {
    const user = await Usuario.findOne({ where: { email: req.body.email } });
    console.log(req.body.email)
    if (user) {
      user.password = bcrypt.hashSync(req.body.password, 10);
      await user.save();
      res.json(user);
    } else {
        res.json("Usuario no encontrado");
    }
    
  } catch (error) {
    res
      .status(400)
      .json("404", {
        msj: error.message,
        titulo: "Error al realizar su registro",
      });
  }
});


router.post('/addProfile', async (req,res) =>{
  try {
    console.log(req.body)
    let id = Number(req.body.idUser)
    const profile = await Profile.create({firstName:req.body.firstName, lastName:req.body.lastName, usuarioId: id})
    const user = await Usuario.findOne({ where:{ id : id}, include: Profile});
    res.json(user);
  } catch (error) {
    res
      .status(400)
      .json("404", {
        msj: error.message,
        titulo: "Error al realizar su registro",
      });
  }
})

router.get('/getProfile/:idUser', async (req,res) =>{
  try {
    console.log(req.body)
    let id = Number(req.params.idUser)
    //const user = await Usuario.findOne({ where:{ id : id}, include: Profile});
    const user = await Profile.findOne({ where:{ usuarioId : id}});
    res.json(user);
  } catch (error) {
    res
      .status(400)
      .json("404", {
        msj: error.message,
        titulo: "Error al realizar su registro",
      });
  }
})
module.exports = router;
