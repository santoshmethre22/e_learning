import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000, // Increase connection timeout (default is 10 seconds)
      serverSelectionTimeoutMS: 30000, // Increase server selection timeout (default is 30 seconds)
      socketTimeoutMS: 45000, // Increase socket timeout (default is 30 seconds)
    });
    console.log("Database Connected");
  } catch (error) {
    console.log("Error connecting to the database:", error.message);
  }
};


export default connectDb;