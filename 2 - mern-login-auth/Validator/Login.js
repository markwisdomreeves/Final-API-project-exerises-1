

const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateRegisterInput(data) {

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password1 = !isEmpty(data.password1) ? data.password1 : "";


    // Check Email Input
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email field is required";
    }

    // Check Password1 Input
    if (Validator.isEmpty(data.password1)) {
        errors.password1 = "Password field is required";
    }

    
    return {
        errors,
        isValid: isEmpty(errors)
    };


}