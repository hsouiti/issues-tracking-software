import mongoose from 'mongoose'
import config from '../../config'

type asyncFunc = () => Promise<unknown>
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const connectDB: asyncFunc = async () => await mongoose.connect(config.MONGODB_URI!)

export default connectDB
