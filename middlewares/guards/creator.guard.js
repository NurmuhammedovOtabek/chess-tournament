import sendErrorResponse from "../../helper/send.error.response.js";

export default async(req, res, next)=>{
    try{
        if(!req.admin.is_creator){
            return sendErrorResponse({message: "siz creator emasiz"}, res, 403)
        }
        next()
    }catch(error){
        sendErrorResponse(error, res, 403)
    }
}