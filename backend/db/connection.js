const Sequelize = require("sequelize");
const modeloUsuarios = require("../models/users.model")
const modelProfile = require('../models/profile.model');
const usersModel = require("../models/users.model");
const sequelize = new Sequelize("SocialNetwork4DevsDB", "SA", "Root233425?", {
    host: "localhost",
    dialect: "mssql",
  });

const Usuario = modeloUsuarios(sequelize, Sequelize);
const Profile = modelProfile(sequelize, Sequelize)

Usuario.hasOne(Profile);
Profile.belongsTo(Usuario)

sequelize.sync({ force: false }).then(() => {
  console.log("Tablas sincronizadas");
});

module.exports = {
  Usuario,
  Profile
};
