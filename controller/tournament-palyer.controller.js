import sendErrorResponse from "../helper/send.error.response.js";
import Match from "../models/match.model.js";
import Tournament_player from "../models/tournament_player.model.js";


export const CreateTournament_player = async (req, res) => {
  try {
    const {
        tournament_id,
        player_id,
        current_score,
        rank,
        is_active
    } = req.body;
    // const filtr1 = await Tournament_player.findOne({ where: { tournament_id } });
    // if (filtr1.player_id == player_id) {
    //   return sendErrorResponse(
    //     { message: "Bunday namelik Tournament_player mavjud" },
    //     res,
    //     400
    //   );
    // }

    const newTournament_player = await Tournament_player.create({
      tournament_id,
      player_id,
      current_score,
      rank,
      is_active,
    });
    res.status(201).json({
      message: "Create successfully",
      data: newTournament_player,
      statusCode: 201,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const getAllTournament_player = async (req, res) => {
  try {
    const allTournament_players = await Tournament_player.findAll();
    if (allTournament_players.length == 0) {
      return sendErrorResponse(
        { message: "Hali Tournament_playerlar mavjud emas" },
        res,
        204
      );
    }
    res.status(200).json({
      message: "Success",
      data: allTournament_players,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const findByIdTournament_players = async (req, res) => {
  try {
    const id = req.params.id;
    const Tournament_player = await Tournament_player.findByPk(id);
    if (!Tournament_player) {
      return sendErrorResponse(
        { message: "Bunday Tournament_player mavjud emas" },
        res,
        404
      );
    }
    res.status(200).send({
      message: "Success",
      data: Tournament_player,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const updateTournament_players = async (req, res) => {
  try {
    const { tournament_id, player_id, current_score, rank, is_active } =
      req.body;
    const id = req.params.id;

    const tournament_player = await Tournament_player.findByPk(id);
    if (!tournament_player) {
      return sendErrorResponse(
        { message: "Bunday Tournament_player mavjud emas" },
        res,
        404
      );
    }
    const filtr1 = await Tournament_player.findOne({
      where: { tournament_id },
    });
    if (filtr1.player_id != player_id) {
        const filtr = await Tournament_player.findOne({where: {player_id}})
        if(filtr){
            return sendErrorResponse(
                { message: "Bunday namelik Tournament_player mavjud" },
                res,
                400
            );
        }
    }

    const updateTournament_player = await Tournament_player.update(
      {
        tournament_id,
        player_id,
        current_score,
        rank,
        is_active,
      },
      {
        where: { id },
        returning: true,
      }
    );
    res.status(200).send({
      message: "Success",
      data: updateTournament_player,
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

export const delTournament_player = async (req, res) => {
  try {
    const id = req.params.id;
    const filtr = await Tournament_player.findByPk(id);
    if (!filtr) {
      return sendErrorResponse(
        { message: "Bunday Tournament_player mavjud emas" },
        res,
        400
      );
    }
    await Tournament_player.destroy({ where: { id } });
    res.status(200).send({
      message: "Deleted seccessfully",
      statusCode: 200,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};


export const sorov = async (req, res) => {
  try {
    
    let game = []
    const players = await Tournament_player.findAll({order:[["rank", "ASC"]]});
    if (players.length === 0) {
      return sendErrorResponse(
        { message: "Hali Tournament_playerlar mavjud emas" },
        res,
        204
      );
    }
    // console.log(players);
    
    while (players.length>0) {
      let gamer = [];
      let i = 1;
      while (true) {
        if(i === players.length){
          console.log(i);
          break
        }
          
        let p1 = players[0].id
        let p2 = players[i].id
        const match = await Match.findAll({
          where: { white_player_id: p1, black_player_id: p2},
        });
        if (match.length !== 0) {
          const match2 = await Match.findAll({
            where: { white_player_id: p2, black_player_id: p1 },
          });
          if (match2.length !== 0) {
            i++;
          } else {
            gamer.push(players[0]);
            gamer.push(players[i]);
            players.splice(i, 1);
            players.splice(0, 1);
            game.push(gamer);

            break
          }
        } else {
          gamer.push(players[0]);
          gamer.push(players[i]);
          players.splice(i, 1);
          players.splice(0, 1);
          game.push(gamer)
          console.log(i);

          break
        }
        if(i=== players.length){
          console.log(i);
          
          break
        }
        
      }
    }

    res.send(game)
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};