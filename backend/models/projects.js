import { Schema, model } from require("mongoose");

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, "Project name must be provided"],
  },
  descrption: {
    type: String,
    required: [true, "Project description must be provided"],
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Project", projectSchema);
