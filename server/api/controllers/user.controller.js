const db = require("../model");
const { users: User, usersCompany: usersCompany } = db;
const passwordValidator = require("password-validator");

const jwt = require("jsonwebtoken");
const secret = "jhjkhjkhiouionmjkoio";

const sequelizeError = require("../../common/sequelizeError");
const bcrypt = require("bcrypt");

// Create a password schema
const schema = new passwordValidator();
schema
  .is()
  .min(8, "Password Minimum length 8") // Minimum length 8
  .is()
  .max(16, "Password Maximum length 16") // Maximum length 16
  .has()
  .uppercase(1, "Password should have a minimum of 1 uppercase letter") // Must have uppercase letters
  .has()
  .lowercase(1, "Password should have a minimum of 1 lowercase letter") // Must have lowercase letters
  .has()
  .digits(1, "Password should have a minimum of 1 digit") // Must have digits
  .has()
  .not()
  .spaces("", "The Password should not have spaces");

exports.createUser = async (req, res) => {
  if (!schema.validate(req.body.userPassword)) {
    // Password does not meet the schema requirements
    res.status(404).send({
      status: 404,
      message:
        schema.validate(req.body.userPassword, { details: true }) ||
        "Password is Invalid!",
    });
    console.log(schema.validate(req.body.userPassword, { details: true }));
    return;
  } else {
    // Password meets the schema requirements
    console.log("Password is valid!");
  }

  let userPasswordHash = "";
  await bcrypt
    .hash(req.body.userPassword, 10)
    .then((hash) => {
      userPasswordHash = hash;
    })
    .catch((err) => console.error(err.message));

  // Create a userJson
  const userDetails = {
    userName: req.body.userName,
    password: userPasswordHash,
  };
  console.log(userDetails);
  try {
    // Save user in the database
    await User.create(userDetails)
      .then((data) => {
        const userDetails = {
          userId: data.id,
          userName: data.name,
          userPhone: data.phone,
          userAddress: data.address,
        };
        res.status(200).send({
          status: 200,
          message: "Success",
          result: userDetails,
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


exports.userLogin = async (req, res) => {
  // Create a userJson

  const { userName: userName, userPassword: password } = req.body;

  // Find the user by email
  const user = await User.findOne({ where: { userName } });

  if (!user) {
    return res.status(401).json({ status:401,message: "Not authorized" });
  }

  // Check if the password matches the hashed password
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ status:401,message: "Not authorized" });
  }
  // If the email and password are correct, return the user object
  const userId = user.id;
  const token = jwt.sign({ userId }, secret, { expiresIn: "1h" });
  return res.status(200).send({
    status: 200,
    message: "Success",
    result: user,
    accessToke: token,
  });
};
