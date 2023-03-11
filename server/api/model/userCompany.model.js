module.exports = (sequelize, Sequelize) => {
    const UserCompanies = sequelize.define(
      "user_companies",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        company_name: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: {
            args: true,
            msg: "Company name already in use!",
          },
          validate: {
            notNull: {
              msg: "Please enter company name", // custom error message for notNull
            },
            notEmpty: {
              msg: "Please enter company name", // custom error message for empty
            },
          },
        },
        company_email: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: {
            args: true,
            msg: "Email already in use!",
          },
          validate: {
            notNull: {
              msg: "Please enter email", // custom error message for notNull
            },
            notEmpty: {
              msg: "Please enter email", // custom error message for empty
            },
            isEmail: {
              msg: "Please enter valid email", // custom error message for empty
            },
          },
        },
        company_phone: {
          type: Sequelize.STRING(10),
          allowNull: false,
          unique: {
            args: true,
            msg: "Phone number  already in use!",
          },
          validate: {
            validatePhone: function (value) {
              if (!/^[6-9]\d{9}$/i.test(value)) {
                throw new Error("Invalid Mobile Number");
              }
            },
            len: {
              args: [10, 10],
              msg: "Phone number should be of 10 digits. Please enter the mobile number correctly",  // custom error message for legth of mobile number
            },
            notNull: {
              msg: "Please enter phone number", // custom error message for notNull
            },
            notEmpty: {
              msg: "Please enter phone number", // custom error message for empty
            },
          },
        },
        company_address: {
          type: Sequelize.STRING(255),
        },
      },
      { timestamps: true }
    );
  
    return UserCompanies;
  };
  