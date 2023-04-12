const db = require("../model");
const { Op } = require("sequelize");
const {contactDetails: ContactDetails } = db;

const sequelizeError = require("../../common/sequelizeError");

exports.createContact = async (req, res) => {
  const contactDetails = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zipCode: req.body.zipCode,

  };
  try {
    await ContactDetails
      .create(contactDetails)
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "Contact Details added successfully",
          data: data,
        });
      })
      .catch(async (err) => {
        const errorMessage = await sequelizeError(err);
        res.status(400).send({
          status: 400,
          message:
            errorMessage || "Some error occurred while adding the contacts.",
        });
      });
  } catch (e) {
    const errorMessage = await sequelizeError(e);

    res.status(400).send({
      status: 400,
      message: errorMessage || "Some error occurred while adding the contacts.",
    });
  }
};


exports.getContatctList = async (req, res) => {
 
  ContactDetails.findAll()
    .then((contactdetails) => {
      if (contactdetails) {
        res.status(200).send({
          status: 200,
          message: "Success",
          result: contactdetails,
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "Contact details not found",
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        status: 404,
        message: "Contact details not found",
        result: err,
      });
    });
};

exports.getContatctByid = async (req, res) => {

  const conatctID= req.params.id
 
  ContactDetails.findByPk(conatctID)
    .then((contactdetails) => {
      if (contactdetails) {  
        res.status(200).send({
          status: 200,
          message: "Success",
          result: contactdetails,
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "Contact details not found",
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        status: 404,
        message: "Contact details not found",
        result: err,
      });
    });
};

exports.deleteContatctByid = async (req, res) => {

  try {
    const contactID = req.params.id; // the ID of the contact to delete
  
    const deletedCount = await ContactDetails.destroy({
      where: { id: contactID }
    }).then((contactdetails) => {
      if (contactdetails) {  
        res.status(200).send({
          status: 200,
          message: `${contactdetails} contatc detaile record(s) deleted`,
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "Contact details not found",
        });
      }
    })
  } catch (error) {
    const errorMessage = await sequelizeError(e);
    res.status(400).send({
      status: 400,
      message: errorMessage || "Error deleting record:'",
    });
  }
  
};

exports.updateContatctByid = async (req, res) => {

  const conatctID= req.params.id
  try {
  ContactDetails.update(req.body,{
    where:{id:conatctID},
    validate: true
  })
    .then((contactdetails) => {
      if (contactdetails) {  
        res.status(200).send({
          status: 200,
          message: "Contact details updated succesfully",
          result: contactdetails,
        });
      }
    })
    .catch(async (err) => {
      const errorMessage = await sequelizeError(err);
      res.status(400).send({
        status: 400,
        message:
          errorMessage || "Some error occurred while updating the contacts.",
      });
    });

  } catch (e) {
    const errorMessage = await sequelizeError(e);

    res.status(400).send({
      status: 400,
      message: errorMessage || "Some error occurred while updating the contacts.",
    });
  }
};


