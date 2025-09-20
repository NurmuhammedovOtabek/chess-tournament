import sendErrorResponse from "../../helper/send.error.response.js";

export default async(req, res, next)=>{
    try{
        if(req.admin.id == req.params.id || req.admin.is_creator){
            next()
        }else{
            return sendErrorResponse({message: "Faqat shaxsiy malumotlarni korish mumkun"}, res, 403)
        }
    }catch(error){
        return sendErrorResponse(error, res, 403)
    }
}