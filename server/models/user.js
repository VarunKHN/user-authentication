const fs = require('fs');
var bcrypt = require('bcryptjs');

var fetchUsers = () => {
    try{
        var getUsers = fs.readFileSync('server/data/user-data.json');
        return JSON.parse(getUsers);
    }catch(e){
        return [];
    }
};

var saveUser = (users) => {
    fs.writeFileSync('server/data/user-data.json',JSON.stringify(users));
};

var addUser = (userObj,callback) => {
    var allUsers = fetchUsers();
    var duplicateUser = allUsers.filter((user) => user.email === userObj.email);
    if(duplicateUser.length === 0){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(userObj.password, salt, function(err, hash) {
                userObj.password = hash;
                userObj.id = Math.floor((Math.random() * 10000000) + 1);
                allUsers.push(userObj);
                saveUser(allUsers);
                callback(undefined,userObj);
            });
        });
    }else{
        callback(undefined,undefined);
    }
};

var findByUsername = (email,callback) => {
    var allUsers = fetchUsers();
    var filteredUser = allUsers.filter((user) => user.email === email);
    if(filteredUser.length === 0){
        callback(undefined,undefined);
    }else{
        callback(undefined,filteredUser[0]);
    }
}

var updateSession = (sessionId,userId,callback) => {
    var allUsers = fetchUsers();
    var filteredUser = allUsers.filter((user) => user.id === userId);
    if(filteredUser.length === 0){
        callback(undefined,undefined);
    }else{
        filteredUser[0].session = sessionId;
        var removeOldRecord = allUsers.filter((user) => user.id != userId);
        removeOldRecord.push(filteredUser[0]);
        saveUser(allUsers);
        callback(undefined,filteredUser[0]);
    }
}


var updateProfile = (profileData,callback) => {
    var allUsers = fetchUsers();
    var filteredUser = allUsers.filter((user) => user.id === profileData.id);
    console.log(filteredUser);
    if(filteredUser.length === 0){
        callback(undefined,undefined);
    }else{
        var oldEmail = filteredUser[0].email;
        var oldPassword = filteredUser[0].password;
        var oldName = filteredUser[0].name;
        filteredUser[0] = profileData;
        filteredUser[0].email = oldEmail;
        filteredUser[0].password = oldPassword;
        filteredUser[0].name = oldName;
        var removeOldRecord = allUsers.filter((user) => user.id != profileData.id);
        removeOldRecord.push(filteredUser[0]);
        console.log(removeOldRecord);
        saveUser(removeOldRecord);
        callback(undefined,filteredUser[0]);
    }
}

module.exports = {
    addUser,
    findByUsername,
    updateSession,
    updateProfile
};
