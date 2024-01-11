const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const process = require('process');
const {exceptions} = require("winston");

const { combine, timestamp, label, printf } = winston.format;

//log 파일 저장 경로
const logDir = `${process.cwd()}/back/src/logs`;

const logFormat = printf(({ level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`; //날짜 [시스템 이름] 로그레벨 메시지
})

const logger = winston.createLogger({
    format: combine(
        timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
        label({label:'winston 연습'}),
        logFormat,
    ),

    transports: [
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            maxFiles: 30, //최근 30개 로그 파일
            zippedArchive: true,
        }),

        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: `%DATE%.error.log`,
            maxFiles: 30, //최근 30개 로그 파일
            zippedArchive: true,
        }),
    ],
    exceptionHandlers:[
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
            zippedArchive: true,
        })
    ]
});

//production 환경이 아닌 개발 환경일 경우, 로그 화면에 바로 보이도록
if (process.env.NODE_ENV !== 'production'){
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(), //log level별 색상 적용
                winston.format.simple(),
            ),
        }),
    );
}

module.exports = logger;
