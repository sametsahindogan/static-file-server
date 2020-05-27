const helper = require('../helpers/helper');

class BasicAuthService {

    async isValid(headers) {

        let buffer = Buffer.from(headers.replace('Basic ', ''), 'base64');

        let credantials = buffer.toString();

        let arr = credantials.split(':');

        if (arr.length === 2) {
            return {
                'api_key': arr[0],
                'api_secret': helper.hash(arr[1]),
            };
        }

        return {'error': 'Please send valid credentials.'};
    }

}

module.exports = BasicAuthService;