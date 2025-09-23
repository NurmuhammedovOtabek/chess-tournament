import sendErrorResponse from "../helper/send.error.response.js";
import Chess_type from "../models/chess_type.model.js";

export const CreateChess_type = async (req, res) => {
  try {
    const { category,
        bese_time_minutes,
        increment_seconds,
        description } = req.body;
    const newChess_type = await Chess_type.create({ category,
        bese_time_minutes,
        increment_seconds,
        description });
    res.status(201).json({
      message: "Create successfully",
      data: newChess_type,
      statusCode: 201,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const getAllChess_type = async (req, res) => {
  try {
    const allChess_types = await Chess_type.findAll();
    if (allChess_types.length == 0) {
      return sendErrorResponse(
        { message: "Hali Chess_typelar mavjud emas" },
        res,
        204
      );
    }
    res.status(200).json({
      message: "Success",
      data: allChess_types,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const findByIdChess_types = async (req, res) => {
  try {
    const id = req.params.id;
    const chess_type = await Chess_type.findByPk(id);
    if (!chess_type) {
      return sendErrorResponse(
        { message: "Bunday Chess_type mavjud emas" },
        res,
        404
      );
    }
    res.status(200).send({
      message: "Success",
      data: chess_type,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const filtrChess_type_category = async (req, res) => {
  try {
    const { category } = req.query;
    const findChess_type = await Chess_type.findAll({ where: { category } });
    if (!findChess_type) {
      return sendErrorResponse(
        { message: "Bunday Chess_type mavjud emas" },
        res,
        404
      );
    }
    res.status(200).send({
      message: "Success",
      data: findChess_type,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const updateChess_types = async (req, res) => {
  try {
    const { category,
        bese_time_minutes,
        increment_seconds,
        description } = req.body;
    const id = req.params.id;

    const chess_type = await Chess_type.findByPk(id);
    if (!chess_type) {
      return sendErrorResponse(
        { message: "Bunday Chess_type mavjud emas" },
        res,
        404
      );
    }
    
    const updateChess_type = await Chess_type.update(
        { category,
            bese_time_minutes,
            increment_seconds,
            description 
        },
      {
        where: { id },
        returning: true,
      }
    );
    res.status(200).send({
      message: "Success",
      data: updateChess_type,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const delChess_type = async(req,res)=>{
    try{
        const id = req.params.id
        const filtr = await Chess_type.findByPk(id)
        if(!filtr){
            return sendErrorResponse({message:"Bunday Chess_type mavjud emas"}, res, 400)
        }
        await Chess_type.destroy({where: {id}})
        res.status(200).send({
            message: "Deleted seccessfully",
            statusCode: 200
        })
    }catch(error){
        sendErrorResponse(error,res,500)
    }
}