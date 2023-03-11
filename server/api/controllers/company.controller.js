const db = require("../model");
const { Op } = require("sequelize");
const { users: User, usersCompany: usersCompany } = db;

const sequelizeError = require("../../common/sequelizeError");

exports.createCompany = async (req, res) => {
  // Create a userJson
  const companyDetails = {
    company_name: req.body.companyName,
    company_email: req.body.companyEmail,
    company_phone: req.body.companyPhone,
    company_address: req.body.companyAddress,
    user_id: req.userId,
  };
  try {
    // Save user in the database
    await usersCompany
      .create(companyDetails)
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "user company created successfully",
          data: data,
        });
      })
      .catch(async (err) => {
        const errorMessage = await sequelizeError(err);
        res.status(404).send({
          status: 404,
          message:
            errorMessage || "Some error occurred while creating the user.",
        });
      });
  } catch (e) {
    const errorMessage = await sequelizeError(e);

    res.status(404).send({
      status: 404,
      message: errorMessage || "Some error occurred while creating the user.",
    });
  }
};

exports.getUserCompany = async (req, res) => {
  // Create a userJson

  const userId = req.userId;

  User.findOne({
    where: { id: userId },
    include: {
      model: usersCompany,
      as: "usersCompany",
    },
  })
    .then((user) => {
      if (user) {
        // User exists, do something with the user object
        res.status(200).send({
          status: 200,
          message: "user company details",
          data: user,
        });
        console.log(user);
      } else {
        // User does not exist
        res.status(404).send({
          status: 404,
          message: "User Company not found1",
          data: userId,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        status: 404,
        message: "User Company not found",
        data: err,
      });
    });
};

exports.updateCompanyData = async (req, res) => {
  // Create a userJson

  const {
    companyName: company_name,
    companyEmail: company_email,
    companyPhone: company_phone,
    comoanyAddress: company_address,
  } = req.body;

  const updatedCompany = {
    company_name,
    company_email,
    company_phone,
    company_address,
  };
  const companyId = req.query.company_id;

  usersCompany
    .update(
      updatedCompany, // Values to update
      { where: { id: companyId } } // Criteria for the update
    )

    .then((numRowsAffected) => {
      if (numRowsAffected) {
        // User exists, do something with the user object
        res.status(200).send({
          status: 200,
          message: `${numRowsAffected} rows were updated`,
          data: numRowsAffected,
        });
      } else {
        // User does not exist
        res.status(404).send({
          status: 404,
          message: "Company not found",
          data: companyId,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        status: 404,
        message: "Company not found",
        data: companyId,
      });
    });
};

exports.deleteCompanyData = async (req, res) => {
  // Create a userJson

  const companyEmail = req.body.companyEmail;

  usersCompany
    .destroy({ where: { company_email: companyEmail } })
    .then((numRowsAffected) => {
      res.status(200).send({
        status: 200,
        message: `${numRowsAffected} rows were deleted`,
        data: "Users Company Deleted",
      });
    })
    .catch((err) => {
      res.status(404).send({
        status: 404,
        message: "Company not found",
        data: err,
      });
    });
};
