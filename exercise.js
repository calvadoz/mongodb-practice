const mongoose = require("mongoose");
require("dotenv").config();

const mongoAtlasUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.atbza.mongodb.net/mongo-exercises?retryWrites=true&w=majority`;
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
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

const getCourses1 = async () => {
  const result = await Course.find({ isPublished: true, tags: "backend" })
    .sort("name")
    .select("name author");
  console.log(result);
};

const getCourses2 = async () => {
  const result = await Course.find({
    isPublished: true,
    // tags: { $in: ["backend", "frontend"] },
  })
    .or([{ tags: "frontend" }, { tags: "backend" }])
    .sort("-price")
    .select("name author price");
  console.log(result);
};

const getCourses3 = async () => {
  const result = await Course.find({
    isPublished: true,
  }).or([{ price: { $gte: 15 } }, { name: /.*by.*/i }]);
  console.log(result);
};

getCourses3();
