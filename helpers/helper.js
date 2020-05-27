const crypto = require('crypto');

let hash = (value) => {

    return crypto.createHash('sha256').update(value).digest('hex');

};

let successResponse = (data) => {
    return {
        'success': true,
        'data': data
    };
};

let errorResponse = (title, message, code) => {
    return {
        'success': false,
        'data': {
            'title': title,
            'message': message,
            'code': code
        }
    };
}

module.exports = {
    hash,
    successResponse,
    errorResponse,
};
