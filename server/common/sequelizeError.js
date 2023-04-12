const sqError = (error) => {
  console.log("sqError===> " + error.name);

  let erMsg = "";
  let  errors={}
  if (error.name === "SequelizeValidationError") {
    //erMsg = error.errors[0].message;
    console.log("errors==>",errors)
    //for Multiple errors in single response
      errors = error.errors.map((err) => ({
      [err.path]: err.message,
    }));

    return errors;
  } else if (error.name === "SequelizeUniqueConstraintError") {
    //erMsg = error.message;
    errors = error.errors.map((err) => ({
      [err.path]: err.message,
    }));

    return errors;
  } else if (error.name === "SequelizeForeignKeyConstraintError") {
    if (error.parent.detail) {
      let keyValue = error.parent.detail.match(/\(([^)]+)\)/)[1];
      erMsg = keyValue + " not available in master data";
    } else {
      erMsg = erMsg.message;
      console.log("dbErrorName===> " + error.name);
    }
  } else if (error.name === "AggregateError") {
    erMsg = error.errors[0].errors.errors[0].message;
  } else if (error.name === "SequelizeDatabaseError") {
    erMsg = error.name;
  } else {
    erMsg = error;
  }
  return erMsg;
};

module.exports = sqError;
