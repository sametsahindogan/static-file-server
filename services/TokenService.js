const moment = require('moment');
const jwt = require('jsonwebtoken');

class TokenService {

    async generateToken(authed, expiresAt) {

        let token = {
            'api_key': authed.api_key,
            'api_secret': authed.api_secret,
            'exp': moment().add(expiresAt, 'm').unix()
        };

        return jwt.sign(token, process.env.JWT_PRIVATE_KEY);
    }

    async parseToken(token) {

        try {

            return jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        } catch (error) {

            return {'error': error.message};

        }

    }

}

module.exports = TokenService;