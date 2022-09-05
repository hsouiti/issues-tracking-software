import Project from '../models/projects.js'

import APIError from '../errors/APIError.js'
import HttpStatusCodes from '../errors/statusCodes.js'

// get all the projects
// TODO: Limit && sort projects
/*
  Sorting by created date
*/

export const getAllProjects = async (req, res, next) => {
  const projects = await Project.find({}).sort({ createdAt: 'desc' })

  res.status(HttpStatusCodes.OK).json({
    status: 'success',
    data: {
      total: projects.length,
      projects,
    },
  })
}

// get a single project
export const getProject = async (req, res, next) => {
  const { id: projectID } = req.params

  const project = await Project.findOne({ _id: projectID })

  if (!project) {
    return next(APIError.HTTP400Error(`No Project with id: ${projectID}`))
  }

  res.status(HttpStatusCodes.OK).json({ status: 'success', data: project })
}


// create project
export const createProject = async (req, res) => {
  const project = await Project.create(req.body)
  res.status(HttpStatusCodes.CREATED).json({ status: 'success', data: project })
}

// update project
export const updateProject = async (req, res) => {
  const { id: projectID } = req.params

  const project = await Project.findOneAndUpdate({ _id: projectID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!project) {
    return next(APIError.HTTP400Error(`No Project with id: ${projectID}`))
  }

  res.status(202).json({ status: 'success', data: project })
}

// delete project
export const deleteProject = async (req, res, next) => {
  const { id: projectID } = req.params

  const project = await Project.findOneAndDelete({ _id: projectID })

  if (!project) {
    return next(APIError.HTTP400Error(`No Project with id: ${projectID}`))
  }

  res
    .status(202)
    .json({
      status: 'success',
      data: { message: 'Project deleted succefully' },
    })
}
