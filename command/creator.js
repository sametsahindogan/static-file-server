require('../bootstrap/db')();
const UserModel = require('../models/user');
const helper = require('../helpers/helper')
const chalk = require('chalk');

async function createUser() {

    let username = process.argv[2];
    let apiKey = process.argv[3];
    let apiSecret = process.argv[4];

    if ((username === undefined ||
        apiKey === undefined ||
        apiSecret === undefined)) {
        console.log(`\n${chalk.red.bold('Please send valid parameters. E.g; ')}${chalk.green.bold('npm run create-user USERNAME API_KEY API_SECRET')}\n`);
        process.exit();
    }

    try {

        const newUser = new UserModel({
            username: username,
            api_key: apiKey,
            api_secret: helper.hash(apiSecret)
        });

        await newUser.save();

        console.log(`
        \n${chalk.green.underline.bold('Successfully created new user. Here is credentials;')}
        \n${chalk.red.bold('api_key: ')}${chalk.blue.bold(apiKey)} 
        \n${chalk.red.bold('api_secret: ')}${chalk.blue.bold(apiSecret)}`);

    } catch (error) {
        console.error(chalk.red.bold(error.message));
    }

    process.exit();
}

createUser();