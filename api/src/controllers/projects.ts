import APIError from '../errors/APIError';
import HttpStatusCodes from '../errors/statusCodes';
import { Response, Request, NextFunction } from 'express';
import Project from '../models/Project';
// get all the projects
// TODO: Limit && sort projects
/*
  Sorting by created date
*/

export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  const projects = await Project.find({}).sort({ createdAt: 'desc' });

  res.status(HttpStatusCodes.OK).json({
    status: 'success',
    data: {
      total: projects.length,
      projects,
    },
  });
};

// get a single project
export const getProject = async (req: Request, res: Response, next: NextFunction) => {
  const { id: projectID } = req.params;

  const project = await Project.findOne({ _id: projectID });

  if (project == null) {
    return next(APIError.HTTP400Error(`No Project with id: ${projectID}`));
  }

  res.status(HttpStatusCodes.OK).json({ status: 'success', data: project });
};

// create project
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  const project = await Project.create(req.body);
  res.status(HttpStatusCodes.CREATED).json({ status: 'success', data: project });
};

// update project
export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  const { id: projectID } = req.params;

  const project = await Project.findOneAndUpdate({ _id: projectID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (project == null) {
    return next(APIError.HTTP400Error(`No Project with id: ${projectID}`));
  }

  res.status(202).json({ status: 'success', data: project });
};

// delete project
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  const { id: projectID } = req.params;

  const project = await Project.findOneAndDelete({ _id: projectID });

  if (project == null) {
    return next(APIError.HTTP400Error(`No Project with id: ${projectID}`));
  }

  res.status(202).json({
    status: 'success',
    data: { message: 'Project deleted succefully' },
  });
};
