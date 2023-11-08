import ChatModel from "../../Modals/chatModel.js";

export const createChat = async(req , res)=>{
    try {
        const chat = await ChatModel.findOne({members: {$all:[req.body.senderId , req.body.receiverId]}}) 
        if(chat){
            res.status(200).send(chat)
        }else{
            const newChat = new ChatModel({
                members: [req.body.senderId , req.body.receiverId]
            })
            const result = await newChat.save();
            res.status(200).json(result)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const userChats = async(req ,res)=>{
    try {
        const chat = await ChatModel.find({
            members:{$in: [req.params.userId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const findChat = async(req , res)=>{
    try {
       const chat = await ChatModel.findOne({members: {$all:[req.params.firstId , req.params.secondId]}}) 
       console.log(chat , 'f' , req.params.firstId , req.params.secondId)
       res.status(200).send(chat)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}