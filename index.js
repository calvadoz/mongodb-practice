const mongoose = require("mongoose");
require("dotenv").config();

const mongoAtlasUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.atbza.mongodb.net/playground?retryWrites=true&w=majority`;
try {
  // Connect to the MongoDB cluster
  mongoose
    .connect(mongoAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongoose is connected"));
} catch (e) {
  console.log("could not connect");
}

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  test: { type: String, default: "test" },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "React Course",
    author: "Maximillian",
    tags: ["react", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (grenter than equal)
  // lt (less than)
  // lte (less than equal)
  // in
  // nin (not in)
  const pageNumber = 2;
  const pageSize = 10;

  // const courses = await Courses.find({ price: { $gt: 10, $lte: 20 } });
  // const courses = await Courses.find({ price: { $in: [10,15,20] } });
  // const courses = await Course.find({ author: "Mosh", isPublished: true }) //basic
  // const courses = await Course.find().or([{ author: "Mosh" }, { isPublished: true }]) //basic
  // const courses = await Course.find({ author: /^Mos/ }) // starts with
  // const courses = await Course.find({ author: /sh$/i }) // ends with, case insensitive
  const courses = await Course.find({ author: /.*Mosh.*/i }) // contains
    .skin((pageNumber - 1) * pageSize)
    .limit(pageSize) // limit
    .sort({ name: 1 }) // 1 asc, -1 desc
    // .select({ name: 1, tags: 1 }); // return properties
    .count();
  console.log(courses);
}

getCourses();
