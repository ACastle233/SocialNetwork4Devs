module.exports =(sequelize, type) =>{
    return sequelize.define('profile',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: type.STRING,
        lastName: type.STRING,
        country: type.STRING,
        city: type.STRING,
        description: type.STRING
    })
}