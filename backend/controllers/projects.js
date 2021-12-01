import Project from '../models/projects.js'
import mongoose from 'mongoose'


const { ObjectId } = mongoose.Types

// get all the projects
// TODO: Limit && sort projects
/*
  Sorting by created date

*/
export const getAllProjects = async (req, res) => {
  const sotrtableFields = ['createdAt', 'name']
  console.log(req.query);

  const projects = await Project.find({}).sort({ createdAt: 'desc'})
  res.status(201).json({ projects })
}


// get a single project
export const getProject = async (req, res) => {
  const { id: projectID } = req.params

  if (!ObjectId.isValid(projectID)) {
    return res.status(404).json({ msg: `${projectID}: Invalid ID format` })
  }

  const project = await Project.findOne({ _id: projectID })

  if (!project) {
    return res.status(404).json({ msg: `No Project with id: ${projectID}` })
  }

  res.status(200).json({ project })
}



// create project
export const createProject = async (req, res) => {
  const project = await Project.create(req.body)
  res.status(200).json({ project })
}




// update project
export const updateProject = async (req, res) => {
  const { id: projectID } = req.params

  if (!ObjectId.isValid(projectID)) {
    return res.status(404).json({ msg: `${projectID}: Invalid ID format` })
  }

  const project = await Project.findOneAndUpdate(
    { _id: projectID },
    req.body, 
    { new: true, runValidators: true,}
  )

  if (!project) {
    return res.status(404).json({ msg: `No Project with id: ${projectID}` })
  }

  res.status(202).json({ project })
}



// delete project
export const deleteProject = async (req, res) => {
  const { id: projectID } = req.params

  if (!ObjectId.isValid(projectID)) {
    return res.status(404).json({ msg: `${projectID}: Invalid ID format` })
  }

  const project = await Project.findOneAndDelete({ _id: projectID })

  if (!project) {
    return res.status(404).json({ msg: `No Project with id: ${projectID}` })
  }

  res.status(202).json({ project })
}
