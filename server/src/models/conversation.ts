import mongoose,{Schema, model, InferSchemaType} from "mongoose";

const coversationSchema = new Schema(
  {
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message',
        default:[],
    }]
  },
  { timestamps: true }
);
type Conversation = InferSchemaType<typeof coversationSchema>

export default model<Conversation>("Conversation", coversationSchema);