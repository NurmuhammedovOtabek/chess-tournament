import sendErrorResponse from "../helper/send.error.response.js";
import Round from "../models/round.model.js";


export const CreateRound = async (req, res) => {
  try {
    const { tournament_id,
        round_number,
        status,
        start_date,
        end_date } =
      req.body;
    const filtr1 = await Round.findOne({
      where: { tournament_id },
    });
    if (filtr1.round_number == round_number) {
      return sendErrorResponse(
        { message: "Bunday round mavjud" },
        res,
        400
      );
    }

    const newRound = await Round.create({
      tournament_id,
      round_number,
      status,
      start_date,
      end_date,
    });
    res.status(201).json({
      message: "Create successfully",
      data: newRound,
      statusCode: 201,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const getAllRound = async (req, res) => {
  try {
    const allRounds = await Round.findAll();
    if (allRounds.length == 0) {
      return sendErrorResponse(
        { message: "Hali Roundlar mavjud emas" },
        res,
        204
      );
    }
    res.status(200).json({
      message: "Success",
      data: allRounds,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const findByIdRounds = async (req, res) => {
  try {
    const id = req.params.id;
    const round = await Round.findByPk(id);
    if (!round) {
      return sendErrorResponse(
        { message: "Bunday Round mavjud emas" },
        res,
        404
      );
    }
    res.status(200).send({
      message: "Success",
      data: round,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const updateRounds = async (req, res) => {
  try {
    const { tournament_id, round_number, status, start_date, end_date } =
      req.body;
    const id = req.params.id;

    const round = await Round.findByPk(id);
    if (!round) {
      return sendErrorResponse(
        { message: "Bunday Round mavjud emas" },
        res,
        404
      );
    }
    const filtr1 = await Round.findOne({
      where: { tournament_id },
    });
    if (filtr1.round_number != round_number) {
      const filtr = await Round.findOne({ where: { round_number } });
      if (filtr) {
        return sendErrorResponse(
          { message: "Bunday round mavjud" },
          res,
          400
        );
      }
    }

    const updateRound = await Round.update(
      {
        tournament_id,
        round_number,
        status,
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
      data: updateRound,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const delRound = async (req, res) => {
  try {
    const id = req.params.id;
    const filtr = await Round.findByPk(id);
    if (!filtr) {
      return sendErrorResponse(
        { message: "Bunday Round mavjud emas" },
        res,
        400
      );
    }
    await Round.destroy({ where: { id } });
    res.status(200).send({
      message: "Deleted seccessfully",
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
