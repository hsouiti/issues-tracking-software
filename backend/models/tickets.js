import mongoose from 'mongoose'
const { Schema, model } = mongoose

const ticketSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title must be provided'],
  },
  description: {
    type: String,
    required: [true, 'Description must be provided'],
  },
  priority: {
    type: String,
    enum: ['normal', 'urgent', 'high', 'low'],
  },
  status: {
    type: String,
    enum: [
      'open',
      'in progress',
      'cannot reproduce',
      'duplicate issue',
      'on hold',
      'closed',
      'fixed',
    ],
  },
  createdByUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  closedByUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  closedAt: Date,
  relatedProject: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
})

module.exports = model('Ticket', ticketSchema)
