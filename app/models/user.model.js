module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      id:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      name:{
        type: Sequelize.STRING
      },
      PatientID:{
        type: Sequelize.STRING,
        unique: true
      },
      DOB:{
        type: Sequelize.STRING
      },
      HospitalID:{
        type: Sequelize.STRING,
        unique: true
      },
      Xrayimage:{
        type: Sequelize.STRING
      },
    },{
        timestamps: false
    });
  
    return Users;
  };