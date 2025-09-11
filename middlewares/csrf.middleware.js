const csrf = require('csurf')
const envConfig = require('../config/env.config')
let csrfProtection;

if(envConfig.nodeEnv === "production"){
    csrfProtection = csrf({ cookie: true });
}else{
    csrfProtection = (req , res , next) => next()
}

module.exports = csrfProtection