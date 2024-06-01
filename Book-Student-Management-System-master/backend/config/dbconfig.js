import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connection established", connect.connection.host, connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

export default connectDB;
