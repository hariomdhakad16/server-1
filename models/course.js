

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  duration: String,
  image: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
});

const CourseModel = mongoose.model('Course', courseSchema);
module.exports = CourseModel
