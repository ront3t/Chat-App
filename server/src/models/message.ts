import mongoose,{Schema, model, InferSchemaType} from "mongoose";

const MessageSchema = new Schema(
  {
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
  },
  { timestamps: true }
);
type Message = InferSchemaType<typeof MessageSchema>

export default model<Message>("Message", MessageSchema);