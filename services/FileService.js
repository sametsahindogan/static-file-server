const helper = require('../helpers/helper');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

class FileService {

    constructor() {
        this.bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName: 'api'});
    }

    async upload(files, isPrivate, owner) {

        let uploaded = [];

        for (let key in files.upload) {

            let file = files.upload[key];

            let name_on_db = helper.hash(file.name + 10 + Date.now());

            uploaded.push({
                'file': file.name,
                'url': process.env.APP_URL + '/files' + (isPrivate ? '/p/' : '/') + name_on_db,
                'path': name_on_db
            });

            fs.createReadStream(file.tempFilePath).pipe(
                this.bucket.openUploadStream(name_on_db, {
                    'metadata': {
                        'user': mongoose.Types.ObjectId(owner._id),
                        'api_key': owner.api_key,
                        'private': isPrivate,
                        'mime_type': file.mimetype,
                        'extension': path.extname(file.name).substr(1),
                        'original_name': file.name,
                    },
                })).on('error', function (error) {
                return {'error': error};
            });
        }

        return uploaded;
    }

    async getPublic(path) {

        let files = await this.bucket.find({
            'metadata.private': false,
            'filename': path
        }, {'limit': 1}).toArray();

        if (!files[0]) {
            return {'error': 'File not found.'};
        }

        let file = files[0];

        return {
            'filename': file.filename,
            'extension': file.metadata.extension,
            'mimetype': file.metadata.mime_type,
            'stream': this.bucket.openDownloadStream(file._id)
        };

    }

    async getPrivate(path, owner) {

        let files = await this.bucket.find({
            'metadata.user': mongoose.Types.ObjectId(owner._id),
            'filename': path
        }, {'limit': 1}).toArray();

        if (!files[0]) {
            return {'error': 'File not found.'};
        }

        let file = files[0];

        return {
            'filename': file.filename,
            'extension': file.metadata.extension,
            'mimetype': file.metadata.mime_type,
            'stream': this.bucket.openDownloadStream(file._id)
        };

    }

    async delete(path, owner) {

        let files = await this.bucket.find({
            'metadata.user': mongoose.Types.ObjectId(owner._id),
            'filename': path
        }, {'limit': 1}).toArray();

        if (!files[0]) {
            return {'error': 'File not found.'};
        }

        let file = files[0];

        this.bucket.delete(file._id);

        return path;
    }

}

module.exports = FileService;