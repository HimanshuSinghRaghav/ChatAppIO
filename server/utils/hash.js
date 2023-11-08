import bcrypt from 'bcrypt'

const run = async ()=>{
    const salt = await bcrypt.genSalt(10);
}