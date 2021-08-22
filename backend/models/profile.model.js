module.exports =(sequelize, type) =>{
    return sequelize.define('profile',{
        idProfile:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: type.STRING,
        lastName: type.STRING,
        country: type.STRING,
        city: type.STRING,
        description: type.STRING,
        age: type.STRING,
        studies: type.STRING,
        languages: type.STRING,
        hobbies: type.STRING,
        linkedin: type.STRING
    })
}