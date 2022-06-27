//dependencies

//module scaffolding
const environments = {};

//set staging environment
environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'hijibiji',
    maxChecks: 5,
    twilio: {
        fromPhone: '+19806552385',
        accountSid: 'ACbba5ba208f01aad166e59a82e529f54c',
        authToken: '3a2fec29c6aeb1ac43c489bd116cbc73',
    }
};

//set production environment
environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'arobeshihijibiji',
    maxChecks: 5,
    twilio: {
        fromPhone: '+19806552385',
        accountSid: 'ACbba5ba208f01aad166e59a82e529f54c',
        authToken: '3a2fec29c6aeb1ac43c489bd116cbc73',
    }
}

//determine whuch environment was passed
//if node_env is string type, then ok
//else set it as staging
const currentEnvironment = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

//export corresponding environment object
//environments[currentEnvironment] is the environment objects like environments.staging, environments.production
//if environment object present, then ok
//else set it to staging
const environmentToExport = typeof environments[currentEnvironment] === 'object' ? environments[currentEnvironment] : environments.staging; 

module.exports = environmentToExport;