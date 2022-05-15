import * as express from 'express'

// 5.4.7 - same principle as admin.ts
const router = express.Router();

// 5.4.8 - in case no specific route was sent client browser, send back and error code with error page
router.use ('/',(req, res, next) => {
    res.status(404).send('<h1>Page Not Found</h1>');
});

module.exports = router ;