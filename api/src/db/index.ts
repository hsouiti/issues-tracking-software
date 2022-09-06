import mongoose from 'mongoose'

const connectDB = async (url: string): Promise<any> => await mongoose.connect(url)

export default connectDB
