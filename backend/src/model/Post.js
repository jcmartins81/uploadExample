import mongoose from 'mongoose'
import aws from 'aws-sdk'

import fs from 'fs'
import path from "path";
import {promisify} from 'util'

const __dirname = path.resolve()

const s3 = new aws.S3()

const PostSchema = new mongoose.Schema({
  name: String,
  size:Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

PostSchema.pre('save', function () {
  if(!this.url) this.url = `${process.env.APP_URL}/files/${this.key}`
});

PostSchema.pre('remove', function () {
  if(process.env.STORAGE_TYPE==='s3') {
    return s3.deleteObject({
      Bucket: 'uploadExample2',
      key: this.key,
    }).promise()
  } else {
  return promisify(fs.unlink)(path.resolve(__dirname, "temp", "uploads"))
  }
})
export default mongoose.model("Post", PostSchema)