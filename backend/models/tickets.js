import mongoose from 'mongoose'
const { Schema, model } = mongoose

const ticketSchema = new Schema(
  {
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
      default: 'normal',
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
      default: 'open',
    },
    closedAt: Date,

    // ????
    createdByUserID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User must be provided'],
      // TODO: Just users with role that can create & submit tickets
    },
    closedByUserID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User must be provided'],
      // TODO: Just users with role that can close and resolve tickets
    },
    relatedProjectID: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project must be provided'],
    },
  },
  { timestamps: true }
)

module.exports = model('Ticket', ticketSchema)
