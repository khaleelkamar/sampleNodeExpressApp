module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: {
          args: true,
          msg: "User name already in use!",
        },
        validate: {
          notNull: {
            msg: "Please enter userName", // custom error message for notNull
          },
          notEmpty: {
            msg: "Please enter userName", // custom error message for empty
          },
        },
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
       
        validate: {
          notNull: {
            msg: "Please enter Password", // custom error message for notNull
          },
          notEmpty: {
            msg: "Please enter Password", // custom error message for empty
          },
        },
      },
     
    },
    { timestamps: true }
  );

  return User;
};
