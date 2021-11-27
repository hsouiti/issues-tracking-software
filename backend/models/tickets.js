import { Schema, model } from "mongoose";

const ticketSchema = new Schema({});

module.exports = model("Ticket", ticketSchema);
