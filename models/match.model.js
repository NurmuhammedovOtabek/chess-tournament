import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Round from "./round.model.js";
import Tournament_player from "./tournament_player.model.js";

const Match = sequelize.define("match", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  round_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  white_player_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  black_player_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  result: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  board_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pgn:{
    type: DataTypes.TEXT,
    allowNull:false
  }
},{
    freezeTableName:true,
    timestamps: true
});

Round.hasMany(Match,{as:"match", foreignKey:"round_id"})
Match.belongsTo(Round,{as:"round", foreignKey:"round_id"})

Tournament_player.hasMany(Match, {
  as: "match",
  foreignKey: "white_player_id",
});
Match.belongsTo(Tournament_player, {
  as: "tournament_player",
  foreignKey: "white_player_id",
});

Tournament_player.hasMany(Match, {
  foreignKey: "black_player_id",
});
Match.belongsTo(Tournament_player, {
  foreignKey: "black_player_id",
});

export default Match