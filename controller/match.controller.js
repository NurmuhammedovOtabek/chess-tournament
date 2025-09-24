import sendErrorResponse from "../helper/send.error.response.js";
import Match from "../models/match.model.js";


export const CreateMatch = async (req, res) => {
  try {
    const {round_id,
        white_player_id,
        black_player_id,
        result,
        board_number,
        start_date,
        end_date,
        pgn } =
      req.body;
    const filtr1 = await Match.findOne({
      where: { round_id },
    });
    if (
      filtr1.white_player_id == white_player_id &&
      filtr1.black_player_id == black_player_id
    ) {
      return sendErrorResponse({ message: "Bunday Match mavjud" }, res, 400);
    }

    const newMatch = await Match.create({
      round_id,
      white_player_id,
      black_player_id,
      result,
      board_number,
      start_date,
      end_date,
      pgn,
    });
    res.status(201).json({
      message: "Create successfully",
      data: newMatch,
      statusCode: 201,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const getAllMatch = async (req, res) => {
  try {
    const allMatchs = await Match.findAll();
    if (allMatchs.length == 0) {
      return sendErrorResponse(
        { message: "Hali Matchlar mavjud emas" },
        res,
        204
      );
    }
    res.status(200).json({
      message: "Success",
      data: allMatchs,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const findByIdMatchs = async (req, res) => {
  try {
    const id = req.params.id;
    const match = await Match.findByPk(id);
    if (!match) {
      return sendErrorResponse(
        { message: "Bunday Match mavjud emas" },
        res,
        404
      );
    }
    res.status(200).send({
      message: "Success",
      data: match,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const updateMatchs = async (req, res) => {
  try {
    const {
      round_id,
      white_player_id,
      black_player_id,
      result,
      board_number,
      start_date,
      end_date,
      pgn,
    } = req.body;
    const id = req.params.id;

    const match = await Match.findByPk(id);
    if (!match) {
      return sendErrorResponse(
        { message: "Bunday Match mavjud emas" },
        res,
        404
      );
    }

    const updateMatch = await Match.update(
      {
        round_id,
        white_player_id,
        black_player_id,
        result,
        board_number,
        start_date,
        end_date,
        pgn,
      },
      {
        where: { id },
        returning: true,
      }
    );
    res.status(200).send({
      message: "Success",
      data: updateMatch,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const delMatch = async (req, res) => {
  try {
    const id = req.params.id;
    const filtr = await Match.findByPk(id);
    if (!filtr) {
      return sendErrorResponse(
        { message: "Bunday Match mavjud emas" },
        res,
        400
      );
    }
    await Match.destroy({ where: { id } });
    res.status(200).send({
      message: "Deleted seccessfully",
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
