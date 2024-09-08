import mongoose from "mongoose";

const postModel = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPhoto: String,
  textValue: String,
  timeStamp: String,
  imageUrls: [String],
});  

export const Post =  mongoose.models.posts || mongoose.model("posts", postModel)