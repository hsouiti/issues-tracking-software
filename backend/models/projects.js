import mongoose from 'mongoose'

const { Schema, model } = mongoose

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Project name must be provided'],
  },
  description: {
    type: String,
    required: [true, 'Project description must be provided'],
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Ticket',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default model('Project', projectSchema)
