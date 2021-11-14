const { Router } = require('express');
const createError = require('http-errors');
const error = require('../middlewares/errorCatcher');
const v1 = require('./v1');
const openApi = require('./openApi');

const router = Router();

router.use('/v1', v1);

router.get('/openapi.json', openApi);

/* GET homepage health check */
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  res.json({
    success: true,
    msg: "Welcome to use Chunlin's nodeJs docker boilerplate.",
  });
});

// catch 404 and forward to error handler
router.use((req, res, next) => {
  next(createError(404, 'This page is not found.'));
});

router.use(error);

module.exports = router;
