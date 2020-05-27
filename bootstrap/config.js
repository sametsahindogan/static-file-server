module.exports = function () {
    const must = ['APP_URL', 'MAX_UPLOAD_SIZE', 'JWT_PRIVATE_KEY'];

    let env = process.env;

    for (let key in must) {

        let value = must[key];

        if (env[value] === '') {
            throw new Error(`FATAL ERROR: ${value} is not defined.`);
        }
    }
}