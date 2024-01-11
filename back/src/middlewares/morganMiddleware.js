const morgan = require('morgan');
const logger = require('../config/logger');
const dotenv = require('dotenv');

dotenv.config();

const format = () => {
    return process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
};

const stream = {
    write: (message) => {
        logger.info(message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "")
        );
        },
};

//배포 환경이면, 코드가 400이상이어야 로그 기록
const skip = (_, res) => {
    if (process.env.NODE_ENV === 'production') {
        return res.statusCode < 400;
    }
    return false;
};

const morganMiddleware = morgan(format(), {stream, skip});

module.exports = morganMiddleware;