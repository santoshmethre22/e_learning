import { Courses } from "../models/course.models.js"
import TryCatch from "../middleware/Trycatch.js"
import { Lecture } from "../models/lecture.models.js"
import { User } from "../models/user.models.js";

export const getAllcourses=TryCatch(async(req ,res)=>{

    const course= await Courses.find();

    res.status(200).json({
        course,
    })


})


export const getSingleCourses=TryCatch(async(req,res )=>{


        const course=await Courses.findById(req.params.id);

        res.status(200).json({
            course
        })



})

export const fetchLectures=TryCatch(async(req, res)=>{


    const lectures=await Lecture.find({course:req.params.id})
    const user=await User.findById(req.user._id);

    if(user.role=== "admin"){

        return res.json({lectures})
    }


    if(!user.subscription.includes(req.params.id)){
        return res.status(400).json({
            message:"you have not subscribed to this course"
        })
    }

    res.json({lectures});



})

export const fetchLecture=TryCatch(async(req,res)=>{
    const lecture =await Lecture.findById(req.params.id);
    const user=await User.findById(req.user.id)
    if(!user){
        res.status(404).json({
            message:"the user has not found"
        })
    }
    if(user.role!=="admin"){
        res.status(400).json({
            message:"you are not  the the admin "
        })
    }
    if(!user.subscription.includes(lecture.course)){
        return res.status(404).json({
            message:"the has not subscription",
        })
    }
    res.json({
        lecture
    })
})



export const checkout = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    const course = await Courses.findById(req.params.id);
  
    if (user.subscription.includes(course._id)) {
      return res.status(400).json({
        message: "You already have this course",
      });
    }
  
    const options = {
      amount: Number(course.price * 100),
      currency: "INR",
    };
  
    const order = await instance.orders.create(options);
  
    res.status(201).json({
      order,
      course,
    });
  });


// TODO : lot of work left in this--- 10th lecture --> watch it

  
export const paymentVerification = TryCatch(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.Razorpay_Secret)
      .update(body)
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
  
      const user = await User.findById(req.user._id);
  
      const course = await Courses.findById(req.params.id);
  
      user.subscription.push(course._id);
  
      await Progress.create({
        course: course._id,
        completedLectures: [],
        user: req.user._id,
      });
  
      await user.save();
  
      res.status(200).json({
        message: "Course Purchased Successfully",
      });
    } else {
      return res.status(400).json({
        message: "Payment Failed",
      });
    }
  });