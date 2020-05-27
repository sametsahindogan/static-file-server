const User = require('../models/user');
const helper = require('../helpers/helper');
const BasicAuthService = require('../services/BasicAuthService');
const TokenService = require('../services/TokenService');

module.exports = async function (request, response, next) {

    let credentials = {};
    let basic = request.headers.authorization;
    let token = request.token;

    if (!token && !basic) {

        return response.send(helper.errorResponse("Error", "Authentication required.", 2));

    }

    if (!token) {

        const basicAuthService = new BasicAuthService();

        credentials = await basicAuthService.isValid(basic);

    } else {

        const tokenService = new TokenService();

        credentials = await tokenService.parseToken(token);
    }

    if (credentials.error) {
        return response.send(helper.errorResponse("Error", credentials.error, 2));
    }

    const user = await User.find({
        api_key: credentials.api_key,
        api_secret: credentials.api_secret
    });

    if (user[0]) {
        request.auth = user[0];
        return next();
    }

    return response.send(helper.errorResponse("Error", "Credantials invalid.", 2));
}