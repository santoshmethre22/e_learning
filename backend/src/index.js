import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./database/db.js"
dotenv.config();

const app = express();

// using middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is working");
});


//all the routers are added here 

import userRouter from "./routers/user.routers.js"


app.use("/api",userRouter)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
  });