import {DataTypes} from "sequelize"
import sequelize from "../config/db.js"

const Player = sequelize.define("player",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    full_name:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
            len: [2,50]
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail: true
        }
    },
    rating:{
        type: DataTypes.INTEGER
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    freezeTableName: true,
    timestamps: true
})

export default Player