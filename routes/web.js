const express=require('express')
const ContactController = require('../controllers/ContactController')
const TeacherController = require('../controllers/teacherController')
const CourseController = require('../controllers/CourseController')


const router =express.Router()
const checkAuth = require("../middleware/auth")
const BookingController = require('../controllers/BookingController')
const UserController = require('../controllers/UserController')



router.get('/contact',ContactController.display)
router.post('/create',ContactController.create)//create method
router.get("/view/:id",ContactController.view)
router.put("/update/:id",ContactController.update)
router.delete("/delete/:id",ContactController.delete)



router.get("/teacher",TeacherController.display)
router.post('/createTeacher',TeacherController.create)
router.get("/view/:id",TeacherController.view)
router.put("/update/:id",TeacherController.update)
router.delete("/delete/:id",TeacherController.delete)



router.get("/course",CourseController.display)
router.post('/course/create',CourseController.create)
router.get("/course/view/:id",CourseController.view)
router.put("/course/update/:id",CourseController.update)
router.delete("/course/delete/:id",CourseController.delete)



router.post("/register",UserController.register)
router.post("/login",UserController.login)
router.get("/profile",checkAuth,UserController.profile)
router.get("/logout",UserController.logout)

//booking
router.post('/booking/create/:courseId',checkAuth,BookingController.createBooking)
router.get('/booking/mybookings',checkAuth,BookingController.getUserBookings)
router.get('/admin/bookings',checkAuth,BookingController.getAllBookings)



module.exports = router