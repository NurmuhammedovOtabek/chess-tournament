import {DataTypes} from "sequelize"
import sequelize from "../config/db.js"

const Admin = sequelize.define("admin",{
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
    password:{
        type: DataTypes.STRING
    },
    is_active:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_creator:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    refresh_token: DataTypes.STRING
},{
    freezeTableName: true,
    timestamps: true
})

export default Admin