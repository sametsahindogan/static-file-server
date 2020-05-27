const helper = require('../helpers/helper');
const tokenRequest = require('../validations/tokenRequest');
const TokenService = require('../services/TokenService');

class TokenController {

    constructor() {

        this.tokenService = new TokenService();

    }

    async getToken(request, response) {

        let authed = request.auth;
        let expiresAt = request.query.expire;

        let validated = tokenRequest(expiresAt);

        if (validated.error) {
            return response.send(helper.errorResponse('Error', validated.error, 1));
        }

        let token = await this.tokenService.generateToken(authed, expiresAt);

        return response.send(helper.successResponse({'token': token}));
    }

}

module.exports = TokenController;