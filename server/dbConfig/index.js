import mongoose from "mongoose"
const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
        })
        console.log("DB Connected Succesfully")

    } catch (e) {
        console.log("DB Error" + e)
    }
}
export default dbConnection