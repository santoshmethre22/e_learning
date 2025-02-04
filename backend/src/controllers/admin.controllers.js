import { Courses } from "../models/course.models.js";
import TryCatch from "../middleware/Trycatch.js";
import { Lecture } from "../models/lecture.models.js";
 import { User } from "../models/user.models.js";
import {rm} from "fs"
import { promisify } from "util";
import fs from "fs"

export const createrCourses=TryCatch(async(req ,res)=>{

  const { title, description, category, createdBy, duration, price } = req.body;
    
  const image = req.file?req.file:null;

  // Validate inputs (example with simple validation)
  if (!title || !description || !category || !createdBy || !duration || !price) {
      return res.status(400).json({
          message: "All fields are required",
      });
  }

    await Courses.create({
        title,
        description,
        category,
        createdBy,
        image: image?.path||null  ,
        duration,
        price,
    })

    res.status( 201).json({
        message:"course created successfully"
    })

})


export const addLectures = TryCatch(async (req, res) => {
    const course = await Courses.findById(req.params.id);
  
    if (!course)
      return res.status(404).json({
        message: "No Course with this id",
      });
  
    const { title, description } = req.body;
  
    const file = req.file;
  
    const lecture = await Lecture.create({
      title,
      description,
      video: file?.path,
      course: course._id,
    });
  
    res.status(201).json({
      message: "Lecture Added",
      lecture,
    });
  });


  export const deleteLecture = TryCatch(async (req, res) => {
    const lecture = await Lecture.findById(req.params.id);
  
    rm(lecture.video, () => {
      console.log("Video deleted");
    });
  
    await lecture.deleteOne();
  
    res.json({ message: "Lecture Deleted" });
  });

  const unlinkAsync = promisify(fs.unlink);

  export const deleteCourse = TryCatch(async (req, res) => {
    const course = await Courses.findById(req.params.id);
  
    const lectures = await Lecture.find({ course: course._id });
  
    await Promise.all(
      lectures.map(async (lecture) => {
        await unlinkAsync(lecture.video);
        console.log("video deleted");
      })
    );
  
    rm(course.image, () => {
      console.log("image deleted");
    });
  
    await Lecture.find({ course: req.params.id }).deleteMany();
  
    await course.deleteOne();
  
    await User.updateMany({}, { $pull: { subscription: req.params.id } });
  
    res.json({
      message: "Course Deleted",
    });
  });


  export const getAllStats = TryCatch(async (req, res) => {
    const totalCoures = (await Courses.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUsers = (await User.find()).length;
  
    const stats = {
      totalCoures,
      totalLectures,
      totalUsers,
    };
  
    res.json({
      stats,
    });
  });


  export const getAllUser = TryCatch(async (req, res) => {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password"
    );
  
    res.json({ users });
  });


  

  