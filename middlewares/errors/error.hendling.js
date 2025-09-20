import ApiError from "../../helper/api.errors.js";
import logger from "../../service/logger.service.js";

export default function(err, req, res, next){
    console.log(err);
    logger.error(err)

    if(err instanceof ApiError){
        return res.status(err.status).json({message: err.message})
    }
    if(err instanceof SyntaxError){
        return res.status(err.status).json({message: err.message})
    }
    if(err instanceof TypeError){
        return res.status(err.status).json({message: err.message})
    }

    return res.status(500).json({message: "Nazarda tutilmagan xatolik"})
}