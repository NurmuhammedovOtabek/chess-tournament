import {DataTypes} from "sequelize"
import sequelize from "../config/db.js"
import Chess_type from "./chess_type.model.js"

const Tournament = sequelize.define("tournament",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
            len: [2,50]
        }
    },
    type_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING,
        allowNull:false
    },
    location:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rounds:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    start_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date:{
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    timestamps:true,
    freezeTableName:true
})

Chess_type.hasMany(Tournament, {as: "tournament", foreignKey: "type_id"})
Tournament.belongsTo(Chess_type, {as: "chess_type", foreignKey: "type_id"})

export default Tournament 