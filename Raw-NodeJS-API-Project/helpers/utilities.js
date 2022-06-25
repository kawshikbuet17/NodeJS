//dependencies
const crypto = require('crypto');
const environments = require('./environments')

//module scaffolding
const utilities = {};

//parse JSON string to Object
utilities.parseJSON = (jsonString) => {
    let output;
    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }
    return output;
};


//hash string (for hashing password)
utilities.hash = (str) => {
    if (typeof (str) == 'string' && str.length > 0) {
        
        //hasing using crypto
        //got this from documentation HMAC Hashing
        //https://nodejs.org/en/knowledge/cryptography/how-to-use-crypto-module/
        //keeping secretKey as environment variable
        const hash = crypto
            .createHmac('sha256', environments.secretKey)
            .update(str)
            .digest('hex');
        return hash;
    }
    return false;
};

//create random string for token generation
utilities.createRandomString = (strlength) => {
    let length = strlength;
    length = typeof(strlength) === 'number' && strlength > 0 ? strlength : false;

    if(length){
        let possibleCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let output = '';
        for(let i=1; i<=length; i+=1){
            let randomNumber = Math.random()*possibleCharacters.length;
            randomNumber = Math.floor(randomNumber);
            let randomCharacter = possibleCharacters.charAt(randomNumber);

            output += randomCharacter;
        }
        return output;
    }
    return false;
};

module.exports = utilities;