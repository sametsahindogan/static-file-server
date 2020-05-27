const Joi = require('@hapi/joi');

module.exports = function (file) {

    /** Check upload object. */
    const schema = Joi.object({
        upload: Joi.required()
    });

    const {error} = schema.validate({'upload': file});

    if (error) {
        return {'error': error.details[0].message};
    }

    /** Convert array. */
    if (!Array.isArray(file.upload)) {
        file.upload = [file.upload];
    }

    let uploadLength = file.upload.length;

    if (uploadLength > process.env.MAX_UPLOAD_LIMIT) {
        return {'error': `You can only upload ${process.env.MAX_UPLOAD_SIZE} files at a time.`};
    }

    /** Check file size. */
    let size = file.upload.reduce(function (total, item) {
        return total + (item.size / Math.pow(1024, 2));
    }, 0);

    if (size > process.env.MAX_UPLOAD_SIZE) {
        return {'error': `You can only upload a ${process.env.MAX_UPLOAD_SIZE}MB`};
    }

    return file;
};