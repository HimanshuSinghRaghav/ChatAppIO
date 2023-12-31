import MessageModel from "../../Modals/MessageModels.js";

export const addMessage = async(req, res)=>{
    const {senderId , chatId , text} = req.body;
    const message = new MessageModel({
        chatId,
        senderId,
        text
    })
    try {
        const result = await message.save()
        res.status(200).json(result) 
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getMessages = async(req , res)=>{
    const {chatId} = req.params
    try {
        const result = await MessageModel.find({chatId});
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}