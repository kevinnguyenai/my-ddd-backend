const path = require('path');
const logPath = path.join(__dirname, '../../logs/development.log');

module.exports = {
  timezone: process.env.TIMEZONE,
  authSecret: 'XaU7234#123#!!;;41~005FF',
  AdministratorEmail: "limloto@pi.as",
  web: {
    port: 4000,
    protocol: 'https'
  },
  logging: {
    appenders: {
      default:{ 
        type: 'console',
        filename: logPath 
      }
    },
    categories: {
      default: {
        appenders: ["default"],
        level: "debug"
      }
    }
  }
};

