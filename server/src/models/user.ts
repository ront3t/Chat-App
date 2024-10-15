import {Schema, model, InferSchemaType} from "mongoose";

const UserSchema = new Schema(
  {
    username:{
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    fullname: {
      type: String,
      required: true,
      min: 7,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      select: false
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    gender:{
      type:String,
      required:true,
      enum:['male','female'],
    },
    profilePic:{
      type:String,
      default:'',
    }
  },
  { timestamps: true }
);
type User = InferSchemaType<typeof UserSchema>

export default model<User>("User", UserSchema);