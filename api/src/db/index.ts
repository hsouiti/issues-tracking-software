import mongoose from 'mongoose'

type asyncFunc = (url: string | undefined) => Promise<any>
const connectDB: asyncFunc = async url => await mongoose.connect(url)

export default connectDB
