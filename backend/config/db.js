import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("db_connected");
    } catch (error) {
        console.error("db_connection_error", error);
    }
};
