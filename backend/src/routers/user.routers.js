import { Router } from "express";
import {registerUser,verifyUser} from "../controllers/user.controllers.js";

const routers=Router();

routers.post("/user/register",registerUser)
routers.post("/user/verify", verifyUser);

export default routers;