module.exports = {
    HOST: "192.168.1.14",
    USER: "actbee",
    PASSWORD: "iamdan1998",
    DB: "demo",
    port:3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };