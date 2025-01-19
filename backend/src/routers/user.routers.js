import { Router } from "express";
import registerUser from "../controllers/user.controllers.js";

const routers=Router();

routers.post("/user/register",registerUser)

export default routers;