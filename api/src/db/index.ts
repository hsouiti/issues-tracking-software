/* eslint-disable prettier/prettier */
import mongoose from 'mongoose'
import config from '../../config'
mongoose.set('runValidators', true)
type asyncFunc = () => Promise<unknown>
const connectDB: asyncFunc = async () =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await mongoose.connect(config.MONGODB_URI!, {retryWrites: true, w: 'majority'})

export default connectDB
