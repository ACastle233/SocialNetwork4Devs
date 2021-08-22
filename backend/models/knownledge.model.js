module.exports =(sequelize, type) =>{
    return sequelize.define('knownledge',{
        bd: type.INTEGER,
        apis: type.INTEGER,
        testing: type.INTEGER,
        security: type.INTEGER,
        oop: type.INTEGER,
    })
}