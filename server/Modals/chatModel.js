import mongoose from 'mongoose'

const ChatSehema = mongoose.Schema(
    {
        members: {
            type: Array,
        }
    },
    {
        timestamps:true
    }
);

const ChatModel = mongoose.model("Chat" , ChatSehema)
export default ChatModel