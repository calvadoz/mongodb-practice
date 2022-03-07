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
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

// createCourse();
