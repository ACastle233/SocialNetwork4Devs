const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { Usuario, Profile, knownledge, Performance, SoftSkills, Technologies } = require("../../db/connection");
//const { check, validationResult } = require("express-validator");
//const midd = require('../Middlewares/midd.usuario')
const usuariosService = require("../../services/users.service");
const midd = require('../../middlewares/midd.users');
const technologiesModel = require("../../models/technologies.model");

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
      },
      
    }, {
      include: [Profile]
    });
    console.log(user.id)
    let id = Number(user.id)
    await knownledge.create({apis:1, bd:1, oop:1, security:1, testing:1, usuarioId: id})
    await Performance.create({qualityCode:1, deliverySpeed:1, codePerformance:1, usuarioId: id})
    await SoftSkills.create({focus:1, teamWork:1, compromise:1, communication:1, learning:1, troubleshooting:1, usuarioId: id})
    await Technologies.create({nodejs:1, frontend:1, swagger:1, js:1, usuarioId: id})
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
    const profile = await Profile.findOne({where:{usuarioId: id}})
    profile.firstName = req.body.firstName;
    profile.lastName = req.body.lastName;
    profile.country = req.body.country;
    profile.city = req.body.city;
    profile.description = req.body.description;
    await profile.save();
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
});

router.get('/profiles', async (req,res) =>{
  try {
    const profiles = await Profile.findAll();
    res.json(profiles)
  } catch (error) {
    es
      .status(400)
      .json("404", {
        msj: error.message,
        titulo: "Error al obtener perfiles",
      });
  }
});

router.post('/updateSkills', async (req,res) =>{
  try {
    console.log(req.body)
    let id = Number(req.body.usuarioId)
    const profile = await knownledge.findOne({where:{usuarioId: req.body.usuarioId}})
    const perfo = await Performance.findOne({where:{usuarioId: req.body.usuarioId}})
    const softS = await SoftSkills.findOne({where:{usuarioId: req.body.usuarioId}})
    const tech = await Technologies.findOne({where:{usuarioId: req.body.usuarioId}})
    profile.bd = req.body.knownledge.bd;
    profile.apis = req.body.knownledge.apis;
    profile.testing = req.body.knownledge.testing;
    profile.security = req.body.knownledge.security;
    profile.oop = req.body.knownledge.oop;
    perfo.qualityCode = req.body.performance.qualityCode;
    perfo.deliverySpeed = req.body.performance.deliverySpeed;
    perfo.codePerformance = req.body.performance.codePerformance;
    softS.focus = req.body.softSkills.focus;
    softS.teamWork = req.body.softSkills.teamWork;
    softS.compromise = req.body.softSkills.compromise;
    softS.communication = req.body.softSkills.communication;
    softS.learning = req.body.softSkills.learning;
    softS.troubleshooting= req.body.softSkills.troubleshooting;
    tech.nodejs = req.body.technologies.nodejs;
    tech.frontend = req.body.technologies.frontend;
    tech.swagger = req.body.technologies.swagger;
    tech.js = req.body.technologies.js;
    await profile.save();
    await perfo.save();
    await softS.save();
    await tech.save();
    const user = await Usuario.findOne({ where:{ id : profile.usuarioId}, include: [knownledge, Performance, SoftSkills, Technologies]});
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
    const user = await Profile.findOne({ where:{ usuarioId : id}});
    //const user = await Profile.findOne({ where:{ usuarioId : id}});
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
