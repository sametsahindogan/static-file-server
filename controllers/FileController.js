const helper = require('../helpers/helper');
const uploadRequest = require('../validations/uploadRequest');
const FileService = require('../services/FileService');

class FileController {

    constructor() {
        this.fileService = new FileService();
    }

    async uploadFile(request, response) {

        let authed = request.auth;
        let isPrivate = Boolean(parseInt(request.query.private));

        let files = request.files;

        let validated = uploadRequest(files);

        if (validated.error) {
            return response.send(helper.errorResponse('Error', validated.error, 1));
        }

        let uploaded = await this.fileService.upload(validated, isPrivate, authed);

        if (uploaded.error) {
            return response.send(helper.errorResponse('Error', uploaded.error, 1));
        }

        return response.send(helper.successResponse(uploaded));
    }

    async getPublicFile(request, response) {

        let download = Boolean(parseInt(request.query.download));

        let path = request.params.path;

        let file = await this.fileService.getPublic(path);

        if (file.error) {
            return response.send(helper.errorResponse('Error', file.error, 1));
        }

        response.set('Content-Type', file.mimetype);

        if (download) {
            response.set('Content-Disposition', 'attachment; filename="' + file.filename + '.' + file.extension + '"');
        }

        file.stream.pipe(response);
    }

    async getPrivateFile(request, response) {

        let authed = request.auth;

        let download = Boolean(parseInt(request.query.download));

        let path = request.params.path;

        let file = await this.fileService.getPrivate(path, authed);

        if (file.error) {
            return response.send(helper.errorResponse('Error', file.error, 1));
        }

        response.set('Content-Type', file.mimetype);

        if (download) {
            response.set('Content-Disposition', 'attachment; filename="' + file.filename + '.' + file.extension + '"');
        }

        file.stream.pipe(response);
    }

    async deleteFile(request, response) {

        let authed = request.auth;

        let path = request.params.path;

        let file = await this.fileService.delete(path, authed);

        if (file.error) {
            return response.send(helper.errorResponse('Error', file.error, 1));
        }

        response.send(helper.successResponse({'file': file}));
    }

}

module.exports = FileController;