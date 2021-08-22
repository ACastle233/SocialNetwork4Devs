const Sequelize = require("sequelize");
const modeloUsuarios = require("../models/users.model")
const modelProfile = require('../models/profile.model');
const knownledgeModel = require("../models/knownledge.model");
const performanceModel = require("../models/performance.model")
const softSkillsModel = require("../models/softSkills.model")
const technologiesModel = require("../models/technologies.model")
const sequelize = new Sequelize("SocialNetwork4DevsDB", "SA", "Root233425?", {
    host: "localhost",
    dialect: "mssql",
  });

const Usuario = modeloUsuarios(sequelize, Sequelize);
const Profile = modelProfile(sequelize, Sequelize);
const knownledge = knownledgeModel(sequelize, Sequelize);
const Performance = performanceModel(sequelize, Sequelize);
const SoftSkills = softSkillsModel(sequelize, Sequelize);
const Technologies = technologiesModel(sequelize, Sequelize);

Usuario.hasOne(Profile);
Usuario.hasOne(knownledge);
Usuario.hasOne(Performance);
Usuario.hasOne(SoftSkills);
Usuario.hasOne(Technologies);

Profile.belongsTo(Usuario);
knownledge.belongsTo(Usuario);
Performance.belongsTo(Usuario);
SoftSkills.belongsTo(Usuario);
Technologies.belongsTo(Usuario);

sequelize.sync({ force: false }).then(() => {
  console.log("Tablas sincronizadas");
});

module.exports = {
  Usuario,
  Profile,
  knownledge,
  Profile,
  SoftSkills,
  Technologies,
  Performance
};
