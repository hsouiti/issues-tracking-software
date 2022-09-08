import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title must be provided'],
    },
    description: {
      type: String,
      required: [true, 'Ticket description must be provided'],
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

    createdByUserID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator of ticket must be provided'],
    },
    relatedProjectID: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project related must be provided'],
    },
    closedByUserID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    assignedToUserID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {timestamps: true}
);

export default model('Ticket', ticketSchema);
