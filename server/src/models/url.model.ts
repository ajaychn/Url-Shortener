import mongoose, { Document, Schema } from "mongoose";

export interface IURL extends Document {
  originalUrl: string;
  shortCode: string;
  clicks: number;
  user: mongoose.Types.ObjectId;
}


const urlSchema = new Schema<IURL>({
  originalUrl: {
    type: String,
    required: true,
    trim: true,
  },

  shortCode: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  clicks: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

}, { timestamps: true, })

const Url = mongoose.model<IURL>("Url", urlSchema);
export default Url