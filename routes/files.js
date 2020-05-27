const authenticate = require('../middlewares/authenticate');
const express = require('express');
const router = express.Router();
const FileController = require('../controllers/FileController');

router.get('/:path', [], async (req, res) => await (new FileController).getPublicFile(req, res));

router.get('/p/:path', [authenticate], async (req, res) => await (new FileController).getPrivateFile(req, res));

router.post('/', [authenticate], async (req, res) => await (new FileController).uploadFile(req, res));

router.delete('/:path', [authenticate], async (req, res) => await (new FileController).deleteFile(req, res));

module.exports = router;