import express from "express"
import consfig from "config"
import sequelize from "./config/db.js"
import errorHendling from "./middlewares/errors/error.hendling.js"
import cookieParser from "cookie-parser"
console.log("a");

import mainApi from "./router/index.js"


const PORT = consfig.get("port")
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api", mainApi)

app.use(errorHendling)


const start = async()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        app.listen(PORT, ()=>{
            console.log(`Server started at: http://localhost:${PORT}`);
        })
    }catch(error){
        console.log(error);
        
    }
}

start()