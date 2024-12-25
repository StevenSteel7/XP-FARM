import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://steven:lordoflords7@cluster0.roxlw3y.mongodb.net/ecomerce",);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;
