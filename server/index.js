import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import 'dotenv/config'
import config from 'config'
import bodyParser from 'body-parser';
import ChatRouter from './Routes/ChatRoute.js'
import MessageRouter from './Routes/MessageRoute.js'
import userRouter from './Routes/UserRoute.js'
import AuthRouter from './Routes/AuthRoute.js'
if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR : jwt private key is not defined')
    process.exit(1)
  }

const app = express();
app.use(cors())
dotenv.config()
app.use(bodyParser.json());

mongoose.connect(process.env.DB_CONNECTION , {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB CONNECT")
}).catch((error)=>{
    console.log(error)
})

app.use('/user', AuthRouter);
app.use('/chat' , ChatRouter)
app.use('/message' , MessageRouter)
app.use('/' , userRouter)

app.listen(process.env.PORT , ()=>{
    console.log(`Listing at port ${process.env.PORT}`)
})
