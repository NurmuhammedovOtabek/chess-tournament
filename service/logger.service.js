import winston ,{format, transports} from "winston"
const {combine, timestamp, label, printf} = format

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
})

const logger = winston.createLogger({
    format: combine(
        label({label: `chess_tournament`}),
        timestamp(),
        myFormat
    ),
    transports:[
        new transports.Console(),
        new transports.File({filename: "./log/error/log", level: "error"}),
        new transports.File({filename: "./log/combie.log", level: "info"})
    ]
})

logger.exitOnError = false

logger.exceptions.handle(
    new transports.File({filename: "./log/exceptions.log"})
)

logger.rejections.handle(
    new transports.File({filename: "./log/rejections.log"})
)

export default logger