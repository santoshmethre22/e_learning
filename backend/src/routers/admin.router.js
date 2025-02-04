import { Router } from "express";
import {createrCourses,addLectures} from "../controllers/admin.controllers.js"
import { isAdmin, isAuth } from "../middleware/isAuth.js";
import { uploadFiles } from "../middleware/multer.js";


const router=Router();


router.post("/admin/createCourse",isAuth,isAdmin,uploadFiles,createrCourses)
router.post("/admin/:id",isAuth,isAdmin,uploadFiles,addLectures);
// todo import all the router


export default router;