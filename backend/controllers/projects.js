import Project from '../models/projects.js'
import mongoose from 'mongoose'
import asyncWrapper from '../middlewares/async.js'

import APIError from '../errors/APIError.js'
import statusCodes from '../errors/statusCodes.js'

const { ObjectId } = mongoose.Types

// get all the projects
// TODO: Limit && sort projects
/*
  Sorting by created date
*/

export const getAllProjects = async (req, res, next) => {
  const projects = await Project.find({}).sort({ createdAt: 'desc' })
  res
    .status(statusCodes.OK)
    .json({ status: 'success', total: projects.length, data: projects })
}

// get a single project
export const getProject = async (req, res, next) => {
  const { id: projectID } = req.params

  if (!ObjectId.isValid(projectID)) {
    return next(APIError.BadRequest(`${projectID}: Invalid ID format`))
  }

  const project = await Project.findOne({ _id: projectID })

  if (!project) {
    return next(APIError.HTTP400Error(`No Project with id: ${projectID}`))
  }

  res.status(statusCodes.OK).json({ status: 'success', data: project })
}

// create project
export const createProject = async (req, res) => {
  const project = await Project.create(req.body)
  res.status(statusCodes.CREATED).json({ status: 'success', data: project })
}

// update project
export const updateProject = async (req, res) => {
  const { id: projectID } = req.params

  if (!ObjectId.isValid(projectID)) {
    return next(APIError.BadRequest(`${projectID}: Invalid ID format`))
  }

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
export const deleteProject = async (req, res) => {
  const { id: projectID } = req.params

  if (!ObjectId.isValid(projectID)) {
    return next(APIError.BadRequest(`${projectID}: Invalid ID format`))
  }

  const project = await Project.findOneAndDelete({ _id: projectID })

  if (!project) {
    return next(APIError.HTTP400Error(`${projectID}: Invalid ID format`))
  }

  res.status(202).json({ status: 'success', data: project })
}
