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
    name: req.body.userName,
    email: req.body.userEmail,
    phone: req.body.userPhone,
    address: req.body.userAddress,
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
          message: "user created successfully",
          data: userDetails,
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

exports.getUser = async (req, res) => {
  // Create a userJson

  const userId = req.userId;

  User.findOne({
    where: { id: userId },
    attributes: ["id", "name", "email", "phone", "address"],
  })
    .then((user) => {
      if (user) {
        // User exists, do something with the user object
        res.status(200).send({
          status: 200,
          message: "user details",
          data: user,
        });
      } else {
        // User does not exist
        res.status(404).send({
          status: 404,
          message: "User not found",
          data: userId,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        status: 404,
        message: "User not found",
        data: userId,
      });
    });
};

exports.updateUserData = async (req, res) => {
  // Create a userJson

  const {
    userName: name,
    userEmail: email,
    userPhone: phone,
    userAddress: address,
  } = req.body;

  const updatedUser = { name, email, phone, address };
  const userId = req.userId;

  User.update(
    updatedUser, // Values to update
    { where: { id: userId } } // Criteria for the update
  )

    .then((numRowsAffected) => {
      if (numRowsAffected) {
        // User exists, do something with the user object
        res.status(200).send({
          status: 200,
          message: `${numRowsAffected} rows were updated`,
        });
      } else {
        // User does not exist
        res.status(404).send({
          status: 404,
          message: "User not found",
          data: userId,
        });
      }
    })
    .catch(async (err) => {
      const errorMessage = await sequelizeError(err);
      res.status(404).send({
        status: 404,
        message: errorMessage,
      });
    });
};

exports.userLogin = async (req, res) => {
  // Create a userJson

  const { userEmail: email, userPassword: password } = req.body;

  // Find the user by email
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Check if the password matches the hashed password
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // If the email and password are correct, return the user object
  const userId = user.id;
  const token = jwt.sign({ userId }, secret, { expiresIn: "1h" });
  return res.status(200).send({
    status: 200,
    message: "user details",
    data: user,
    accessToke: token,
  });
};
