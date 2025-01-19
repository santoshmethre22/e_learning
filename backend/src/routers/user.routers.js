import { Router } from "express";
import {registerUser,
    verifyUser,
    loginUser,
    profile


} from "../controllers/user.controllers.js";
import { isAuth } from "../middleware/isAuth.js";

const routers=Router();

routers.post("/user/register",registerUser);
routers.post("/user/verify", verifyUser);
routers.post("/user/login",loginUser);

routers.get("/user/profile",isAuth,profile);

export default routers;