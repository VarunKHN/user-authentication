var successRegistration = {
    status : "success",
    message : "user registration successfull"
}

var userExists = {
    status : "error",
    message : "user already exists"
}

var servorError = {
    status : "error",
    message : "could not proccess data"
}

var loginSuccess = {
    status : "success",
    message : "login successfull"
}

var loginError = {
    status : "error",
    message : "could not find user"
}

var loginFail = {
    status : "error",
    message : "incorrect user credentials"
}

var loginMultipleFail = {
    status : "error",
    message : "incorrect password 3 times in a row"
}

var profileSuccess = {
    status : "success",
    message : "profile updation successfull"
}

var profileFailure = {
    status : "success",
    message : "profile updation failed"
}

module.exports = {
    successRegistration,
    userExists,
    servorError,
    loginSuccess,
    loginFail,
    loginMultipleFail,
    profileSuccess,
    profileFailure
};