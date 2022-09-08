import Ticket from '../models/Ticket';

import APIError from '../errors/APIError';
import HttpStatusCodes from '../errors/statusCodes';

// get all the tickets
// TODO: Limit && sort tickets
/*
  Sorting by created date
*/

/*
  get tickets based on the roles: 
  - admins & mangers => get all tcikets
  - developer => get only the tickets assigned to the this developer
  - submitter => get only the tickets sumitted by this user
*/
export const getAllTickets = async (req, res, next) => {
  const tickets = await Ticket.find({}).sort({createdAt: 'desc'});

  res.status(HttpStatusCodes.OK).json({
    status: 'success',
    data: {
      total: tickets.length,
      tickets,
    },
  });
};

// get single projects tickets
export const getSingleProjectTickets = async (req, res, next) => {
  const {id: projectId} = req.params;

  const tickets = await Ticket.find({
    relatedProjectID: projectId,
  }).sort({createdAt: 'desc'});

  res.status(HttpStatusCodes.OK).json({
    status: 'success',
    data: {
      total: tickets.length,
      tickets,
    },
  });
};

// get current user tickets
export const getCurrentUserTickets = async (req, res, next) => {
  const {userId, role} = req.user;
  let tickets;

  role === 'submitter'
    ? (tickets = await Ticket.find({
        createdByUserID: userId,
      }).sort({createdAt: 'desc'}))
    : (tickets = await Ticket.find({
        assignedToUserID: userId,
      }).sort({createdAt: 'desc'}));

  res.status(HttpStatusCodes.OK).json({
    status: 'success',
    data: {
      total: tickets.length,
      tickets,
    },
  });
};

// get a single Ticket
export const getTicket = async (req, res, next) => {
  const {id: ticketID} = req.params;

  const ticket = await Ticket.findOne({_id: ticketID});

  if (ticket == null) {
    return next(APIError.HTTP400Error(`No Ticket with id: ${ticketID}`));
  }

  res.status(HttpStatusCodes.OK).json({status: 'success', data: ticket});
};

// create Ticket
export const createTicket = async (req, res) => {
  const ticket = await Ticket.create(req.body);
  res.status(HttpStatusCodes.CREATED).json({status: 'success', data: ticket});
};

// update Ticket
export const updateTicket = async (req, res, next) => {
  const {id: ticketID} = req.params;

  const ticket = await Ticket.findOneAndUpdate({_id: ticketID}, req.body, {
    new: true,
    runValidators: true,
  });

  if (ticket == null) {
    return next(APIError.HTTP400Error(`No Ticket with id: ${ticketID}`));
  }

  res.status(202).json({status: 'success', data: ticket});
};

// delete Ticket
export const deleteTicket = async (req, res, next) => {
  const {id: ticketID} = req.params;

  const ticket = await Ticket.findOneAndDelete({_id: ticketID});

  if (ticket == null) {
    return next(APIError.HTTP400Error(`No Ticket with id: ${ticketID}`));
  }

  res.status(202).json({
    status: 'success',
    data: {message: 'Ticket deleted succefully'},
  });
};
