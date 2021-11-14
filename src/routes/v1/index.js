const { Router } = require('express');
const cats = require('./cats');

const router = Router();

router.use('/cats', cats);

module.exports = router;
