import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Tournament from "./tournament.model.js";
import Player from "./player.model.js";

const Tournament_player = sequelize.define("tournament_player", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tournament_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  player_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  current_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_active:{
    type: DataTypes.BOOLEAN,
    allowNull:false
  }
},{
    freezeTableName: true,
    timestamps: true
});

Tournament.hasMany(Tournament_player, {
  as: "tournament_player",
  foreignKey: "tournament_id",
});
Tournament_player.belongsTo(Tournament, {
  as: "tournament",
  foreignKey: "tournament_id",
});

Player.hasMany(Tournament_player, { as: "tournament_player", foreignKey:"player_id" });
Tournament_player.belongsTo(Player,{as:"player", foreignKey:"player_id"})

export default Tournament_player