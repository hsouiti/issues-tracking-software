import mongoose from 'mongoose'

const { Schema, model } = mongoose

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name must be provided'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Project description must be provided'],
    },
  },
  { timestamps: true }
)

export default model('Project', projectSchema)
