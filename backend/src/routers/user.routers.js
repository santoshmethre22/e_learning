import { Router } from "express";
import {registerUser,verifyUser,loginUser} from "../controllers/user.controllers.js";

const routers=Router();

routers.post("/user/register",registerUser);
routers.post("/user/verify", verifyUser);
routers.post("/user/login",loginUser);

export default routers;