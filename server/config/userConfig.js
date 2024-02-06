import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL);

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("Database successfully Connect");
});

connection.on("error", (error) => {
    console.log("Database not connect", error);
});



export default mongoose;