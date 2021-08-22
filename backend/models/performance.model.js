module.exports =(sequelize, type) =>{
    return sequelize.define('performance',{
        qualityCode: type.INTEGER,
        deliverySpeed: type.INTEGER,
        codePerformance: type.INTEGER
    })
}