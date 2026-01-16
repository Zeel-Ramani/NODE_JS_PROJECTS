const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()


    mongoose.connect("mongodb://localhost:27017/blog")
        .then(() => console.log("Database connected successfully..."))
        .catch(err => console.error("Database Connection Error:", err));

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const Blog = require("./models/Blog")

app.get("/dashboard", (req, res) => {
  res.render("dashboard")
})

app.get("/charts", (req, res) => {
  res.render("charts")
})

app.get("/tables", (req, res) => {
  res.render("tables")
})

app.get("/widgets", (req, res) => {
  res.render("widgets")
})

app.get("/form-basic", (req, res) => {
  res.render("form-basic")
})

app.get("/login", (req, res) => {
  res.render("login")
})

app.get("/register", (req, res) => {
  res.render("register")
})

app.get("/grid", (req, res) => {
  res.render("grid")
})

app.get("/pages-buttons", (req, res) => {
  res.render("pages-buttons")
})

app.get("/pages-elements", (req, res) => {
  res.render("pages-elements")
})

app.get("/blogs", async (req, res) => {
  try {
    const searchQuery = req.query.search || ""
    const query = searchQuery ? { title: { $regex: searchQuery, $options: "i" } } : {}
    const blogs = await Blog.find(query).sort({ createdAt: -1 })
    res.render("blogs", { blogs, searchQuery })
  } catch (error) {
    res.status(500).send("Error fetching blogs")
  }
})

app.get("/blogs/add", (req, res) => {
  res.render("add-blog")
})

app.post("/blogs/add", async (req, res) => {
  try {
    const newBlog = new Blog({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    })
    await newBlog.save()
    res.redirect("/blogs")
  } catch (error) {
    res.status(500).send("Error adding blog")
  }
})

app.get("/blogs/edit/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    res.render("edit-blog", { blog })
  } catch (error) {
    res.status(500).send("Error fetching blog")
  }
})

app.post("/blogs/edit/:id", async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    })
    res.redirect("/blogs")
  } catch (error) {
    res.status(500).send("Error updating blog")
  }
})

app.get("/blogs/delete/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.redirect("/blogs")
  } catch (error) {
    res.status(500).send("Error deleting blog")
  }
})

app.get("/", (req, res) => {
  res.redirect("/dashboard")
})

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000")
})
