const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { Usuario, Profile, knownledge, Performance, SoftSkills, Technologies } = require("../../db/connection");

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
      profile.age = req.body.age;
      profile.studies = req.body.studies;
      profile.languages = req.body.languages;
      profile.linkedin = req.body.linkedin;
      profile.hobbies = req.body.hobbies;
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
  