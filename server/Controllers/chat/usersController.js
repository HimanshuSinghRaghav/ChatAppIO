import UserModel from "../../Modals/usersModal.js";

export const addUser = async(req , res)=>{
    try{
        const data = {
            name:`${req.body.first_name} ${req.body.last_name}`,
            email:req.body.email,
            phone:req.body.phone,
            gender:req.body.gender, 
            date_of_birth:req.body.date_of_birth,
            address:{
                street:req.body.street,
                city:req.body.city,
                state:req.body.state,
                country:req.body.country,
                zipcode:req.body.zipcode
            },
            profile_picture:req.body.profile_picture
        }
        const user = new UserModel(data)
        await user.save()
        res.status(200).send("User Added Successfully!")
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

export const getUsers = async(req , res)=>{
    try{console.log(req.user._id)
        const users = await UserModel.find({"_id":{$ne:req.user._id}})
        res.send(users)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}