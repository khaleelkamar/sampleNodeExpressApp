const dbConfig = require("../../common/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.usersCompany = require("./userCompany.model.js")(sequelize, Sequelize);
db.users.hasMany(db.usersCompany, {
    foreignKey: {
      name: "user_id",
      allowNull: false,
      isInt: true, // validate the foreign key is an integer
      validate: {
        notNull: {
          msg: "User id cannot be null.",
        },
        notEmpty: {
          msg: "User id cannot be empty.",
        },
      },
    },
    as:"usersCompany",
  });

db.usersCompany.belongsTo(db.users, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
    isInt: true, // validate the foreign key is an integer
    validate: {
      notNull: {
        msg: "User id cannot be null.",
      },
      notEmpty: {
        msg: "User id cannot be empty.",
      },
    },
  },
  as:"companyUsers"
});

module.exports = db;
