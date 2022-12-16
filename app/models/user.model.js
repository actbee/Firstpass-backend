module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      email: {
        type: Sequelize.STRING(100),
        primaryKey: true
      },
      password: {
        type: Sequelize.BOOLEAN(50)
      }
    },{
        timestamps: false
    });
  
    return Users;
  };