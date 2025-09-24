import sendErrorResponse from "../helper/send.error.response.js";
import Tournament from "../models/tournament.model.js";

export const CreateTournament = async (req, res) => {
  try {
    const {name,
        type_id,
        address,
        location,
        status,
        rounds,
        start_date,
        end_date} = req.body;
    const filtr1 = await Tournament.findOne({ where: { name } });
    if (filtr1) {
      return sendErrorResponse(
        { message: "Bunday namelik Tournament mavjud" },
        res,
        400
      );
    }
    
    const newTournament = await Tournament.create({
      name,
      type_id,
      address,
      location,
      status,
      rounds,
      start_date,
      end_date,
    });
    res.status(201).json({
      message: "Create successfully",
      data: newTournament,
      statusCode: 201,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const getAllTournament = async (req, res) => {
  try {
    const allTournaments = await Tournament.findAll();
    if (allTournaments.length == 0) {
      return sendErrorResponse(
        { message: "Hali Tournamentlar mavjud emas" },
        res,
        204
      );
    }
    res.status(200).json({
      message: "Success",
      data: allTournaments,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const findByIdTournaments = async (req, res) => {
  try {
    const id = req.params.id;
    const Tournament = await Tournament.findByPk(id);
    if (!Tournament) {
      return sendErrorResponse(
        { message: "Bunday Tournament mavjud emas" },
        res,
        404
      );
    }
    res.status(200).send({
      message: "Success",
      data: Tournament,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const filtrTournament = async (req, res) => {
  try {
    const { name } = req.query;
    const findTournament = await Tournament.findAll({ where: { name } });
    if (!findTournament) {
      return sendErrorResponse(
        { message: "Bunday Tournament mavjud emas" },
        res,
        404
      );
    }
    res.status(200).send({
      message: "Success",
      data: findTournament,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const updateTournaments = async (req, res) => {
  try {
    const {
      name,
      type_id,
      address,
      location,
      status,
      rounds,
      start_date,
      end_date,
    } = req.body;
    const id = req.params.id;

    const tournament = await Tournament.findByPk(id);
    if (!tournament) {
      return sendErrorResponse(
        { message: "Bunday Tournament mavjud emas" },
        res,
        404
      );
    }
    if (tournament.name != name) {
      const filtr = await Tournament.findOne({ where: { name } });
      if (filtr) {
        return sendErrorResponse(
          { message: "Bunday ismli Tournament mavjud" },
          res,
          400
        );
      }
    }
    
    const updateTournament = await Tournament.update(
      {
        name,
        type_id,
        address,
        location,
        status,
        rounds,
        start_date,
        end_date,
      },
      {
        where: { id },
        returning: true,
      }
    );
    res.status(200).send({
      message: "Success",
      data: updateTournament,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const delTournament = async(req,res)=>{
    try{
        const id = req.params.id
        const filtr = await Tournament.findByPk(id)
        if(!filtr){
            return sendErrorResponse({message:"Bunday Tournament mavjud emas"}, res, 400)
        }
        await Tournament.destroy({where: {id}})
        res.status(200).send({
            message: "Deleted seccessfully",
            statusCode: 200
        })
    }catch(error){
        sendErrorResponse(error,res,500)
    }
}