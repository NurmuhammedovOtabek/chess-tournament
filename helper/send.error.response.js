import logger from "../service/logger.service.js";


export default (error, res, status)=>{
    console.log(error);
    logger.error(error)
    res.status(status).send({
        message: "Xatolik",
        error: error.message,
        statusCode: status
    })
}
