
module.exports.validateFullName = (fullName)=>{
    if (!fullName){
        return 'Please enter your full name.'
    }

    return false;
}

module.exports.validateCompanyName = (companyName) => {
    if(!companyName){
        return 'Please enter a valid company name.'
    }
    return false;
}

module.exports.validateEmail = (email) => {
    if(!email || !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
        return 'Please enter a valid email address.'
    }
    return false;
}

module.exports.validateUsername = (username) => {
    if(!username){
        return 'Please enter a username';
    }else if(username.length > 30 || username.length < 3){
        return 'Please enter a username between 3 and 30 characters.'
    }else if(!username.match(
        /^[a-zA-Z0-9\_.]+$/
    )){
    return 'A username can only contain the following: letters A-Z, numbers 0-9 and the symbols _ . ';
    }
    return false;
}


module.exports.validatePassword = (password)=>{
    if(!password){
        return 'Please enter a password.'
    }else if(password.length < 6 ) {
        return 'Please enter a password with 6 characters or more.'
    }else if(!password.match(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/)){
        return "Enter a password that includes at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$).";
    }
    return false;
}