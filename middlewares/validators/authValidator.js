const validator = require("validator");

exports.signup = async (req, res, next) => {
  try {
    let errors = [];

    if (!validator.isEmail(req.body.email)) {
      errors.push("Gunakan email yang valid");
    }

    if (!validator.isStrongPassword(req.body.password)) {
      errors.push(
        "Password membutuhkan huruf besar, huruf kecil, angka dan simbol"
      );
    }

    if (req.body.confirm_password !== req.body.password) {
      errors.push("Password tidak sama");
    }
    
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", and "),
      });
    }
    next();
  } catch (e) {
    
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

exports.signin = async (req, res, next) => {
  try {
    let errors = [];

    if (!validator.isEmail(req.body.email)) {
      errors.push("Gunakan email yang valid");
    }

    if (!validator.isStrongPassword(req.body.password)) {
      errors.push(
        "Password membutuhkan huruf besar, huruf kecil, angka dan simbol"
      );
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};
