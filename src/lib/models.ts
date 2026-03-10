import mongoose, { Schema, Document } from 'mongoose'

export interface IComment extends Document {
  name: string
  message: string
  pinned: boolean
  createdAt: Date
}

export interface IQuestion extends Document {
  name: string
  question: string
  answer?: string
  isPublic: boolean
  createdAt: Date
}

const CommentSchema = new Schema<IComment>(
  {
    name: { type: String, required: true, maxlength: 50 },
    message: { type: String, required: true, maxlength: 500 },
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const QuestionSchema = new Schema<IQuestion>(
  {
    name: { type: String, required: true, maxlength: 50 },
    question: { type: String, required: true, maxlength: 1000 },
    answer: { type: String, maxlength: 2000 },
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Comment =
  mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema)

export const Question =
  mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema)
