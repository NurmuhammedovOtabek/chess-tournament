import sendErrorResponse from "../helper/send.error.response.js";
import Player from "../models/player.model.js";


export const CreatePlayer = async (req, res) => {
  try {
    const {
        full_name,
        email,
        rating,
        country,
        age 
    }= req.body;

    const filtr1 = await Player.findOne({ where: { email } });
    if (filtr1) {
      return sendErrorResponse(
        { message: "Bunday emaillik Player mavjud" },
        res,
        400
      );
    }
    const filtr2 = await Player.findOne({ where: { full_name } });
    if (filtr2) {
      return sendErrorResponse(
        { message: "Bunday ismli Player mavjud" },
        res,
        400
      );
    }
    const newPlayer = await Player.create({ full_name,
        email,
        rating,
        country,
        age });
    res.status(201).json({
      message: "Create successfully",
      data: newPlayer,
      statusCode: 201,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const getAllPlayer = async (req, res) => {
  try {
    const allPlayers = await Player.findAll();
    if (allPlayers.length == 0) {
      return sendErrorResponse(
        { message: "Hali Playerlar mavjud emas" },
        res,
        204
      );
    }
    res.status(200).json({
      message: "Success",
      data: allPlayers,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const findByIdPlayers = async (req, res) => {
  try {
    const id = req.params.id;
    const player = await Player.findByPk(id);
    if (!player) {
      return sendErrorResponse(
        { message: "Bunday Player mavjud emas" },
        res,
        404
      );
    }
    res.status(200).send({
      message: "Success",
      data: player,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const filtrPlayer = async (req, res) => {
  try {
    const { full_name } = req.query;
    const findPlayer = await Player.findAll({ where: { full_name } });
    if (!findPlayer) {
      return sendErrorResponse(
        { message: "Bunday Player mavjud emas" },
        res,
        404
      );
    }
    res.status(200).send({
      message: "Success",
      data: findPlayer,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const updatePlayers = async (req, res) => {
  try {
    const { full_name,
        email,
        rating,
        country,
        age } = req.body;
    const id = req.params.id;

    const player = await Player.findByPk(id);
    if (!player) {
      return sendErrorResponse(
        { message: "Bunday Player mavjud emas" },
        res,
        404
      );
    }
    if(player.email != email){
        const filtr1 = await Player.findOne({ where: { email } });
        if (filtr1) {
        return sendErrorResponse(
            { message: "Bunday emaillik Player mavjud" },
            res,
            400
        );
        }
    }
    if(player.full_name != full_name){
        const filtr2 = await Player.findOne({ where: { full_name } });
        if (filtr2) {
        return sendErrorResponse(
            { message: "Bunday ismli Player mavjud" },
            res,
            400
        );
        }
    }
    const updatePlayer = await Player.update(
        { full_name,
            email,
            rating,
            country,
            age 
        },
      {
        where: { id },
        returning: true,
      }
    );
    res.status(200).send({
      message: "Success",
      data: updatePlayer,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const delPlayer = async(req,res)=>{
    try{
        const id = req.params.id
        const filtr = await Player.findByPk(id)
        if(!filtr){
            return sendErrorResponse({message:"Bunday Player mavjud emas"}, res, 400)
        }
        await Player.destroy({where: {id}})
        res.status(200).send({
            message: "Deleted seccessfully",
            statusCode: 200
        })
    }catch(error){
        sendErrorResponse(error,res,500)
    }
}