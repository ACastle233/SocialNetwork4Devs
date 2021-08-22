module.exports =(sequelize, type) =>{
    return sequelize.define('technologies',{
        nodejs: type.INTEGER,
        frontend: type.INTEGER,
        swagger: type.INTEGER,
        js: type.INTEGER
    })
}