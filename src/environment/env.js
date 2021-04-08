const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'prd')
    dotenv.config({ path: '.env' })
else if (process.env.NODE_ENV === 'qa')
    dotenv.config({ path: '.env.qa'})
else
    dotenv.config({ path: '.env.dev'})