import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Tournament from "./tournament.model.js";

const Round = sequelize.define("round", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tournament_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  round_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status:{
    type: DataTypes.STRING,
    allowNull:false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},{
    timestamps: true,
    freezeTableName:true
});

Tournament.hasMany(Round, { as: "round", foreignKey: "tournament_id" });
Round.belongsTo(Tournament, { as: "tournament", foreignKey: "tournament_id" });

export default Round