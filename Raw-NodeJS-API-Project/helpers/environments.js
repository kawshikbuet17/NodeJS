//dependencies

//module scaffolding
const environments = {};

//set staging environment
environments.staging = {
    port: 3000,
    envName: 'staging',
};

//set production environment
environments.production = {
    port: 5000,
    envName: 'production',
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