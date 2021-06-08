import { Router } from "express";
import multer from 'multer'
import multerConfig from './config/multer.js'
import Post from "./model/Post.js";

const routes = Router()

routes.get("/", (req, res) => {
  return res.json({hello: 'World'})
})

routes.get("/posts", async (req, res) => {
  const posts = await Post.find()

  return res.json(posts)
})

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {

  console.log(req.file)
  const{ originalname: name, size, filename: key, location: url = ""} = req.file

  const  post = await Post.create({
    name,
    size,
    key,
    url
  });

  return res.json(post)
})

routes.delete('/posts/:id', async (req, res) => {

  const post = await Post.findByIdAndDelete(req.params.id)

  return res.send()
})

export default routes