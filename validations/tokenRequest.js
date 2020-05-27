const Joi = require('@hapi/joi');

module.exports = function (expire) {
    const schema = Joi.object({
        expire: Joi.number().required()
    });

    const {error, value} = schema.validate({expire});

    if (error) {
        return {'error': error.details[0].message};
    }

    return true;
};