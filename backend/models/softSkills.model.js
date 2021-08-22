module.exports =(sequelize, type) =>{
    return sequelize.define('softSkills',{
        focus: type.INTEGER,
        teamWork: type.INTEGER,
        compromise: type.INTEGER,
        communication: type.INTEGER,
        learning: type.INTEGER,
        troubleshooting: type.INTEGER,
    })
}