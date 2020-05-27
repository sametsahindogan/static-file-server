const express = require('express');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();
const TokenController = require('../controllers/TokenController');

router.get('/', [authenticate], async (req, res) => await (new TokenController()).getToken(req, res));

module.exports = router;