const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const session = require("express-session")
const dbConnect = require("./config/dbConnect")

const app = express()

dbConnect()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({
  secret: "admin-secret-key",
  resave: false,
  saveUninitialized: false
}))


function isAdminLoggedIn(req, res, next) {
  if (req.session.admin) {
    next()
  } else {
    res.redirect("/login")
  }
}


const Blog = require("./models/Blog")

app.get("/login", (req, res) => {
  res.render("login")
})

app.post("/login", (req, res) => {
  const { email, password } = req.body

  if (email === "admin@gmail.com" && password === "12345") {
    req.session.admin = true
    res.redirect("/dashboard")
  } else {
    res.send("Invalid Login")
  }
})

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login")
  })
})


app.get("/dashboard", isAdminLoggedIn, (req, res) => {
  res.render("dashboard")
})

app.get("/charts", isAdminLoggedIn, (req, res) => {
  res.render("charts")
})

app.get("/tables", isAdminLoggedIn, (req, res) => {
  res.render("tables")
})

app.get("/widgets", isAdminLoggedIn, (req, res) => {
  res.render("widgets")
})

app.get("/form-basic", isAdminLoggedIn, (req, res) => {
  res.render("form-basic")
})

app.get("/grid", isAdminLoggedIn, (req, res) => {
  res.render("grid")
})

app.get("/pages-buttons", isAdminLoggedIn, (req, res) => {
  res.render("pages-buttons")
})

app.get("/pages-elements", isAdminLoggedIn, (req, res) => {
  res.render("pages-elements")
})



app.get("/blogs", isAdminLoggedIn, async (req, res) => {
  try {
    const searchQuery = req.query.search || ""
    const query = searchQuery
      ? { title: { $regex: searchQuery, $options: "i" } }
      : {}

    const blogs = await Blog.find(query).sort({ createdAt: -1 })
    res.render("blogs", { blogs, searchQuery })
  } catch (error) {
    res.status(500).send("Error fetching blogs")
  }
})

app.get("/blogs/add", isAdminLoggedIn, (req, res) => {
  res.render("add-blog")
})

app.post("/blogs/add", isAdminLoggedIn, async (req, res) => {
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

app.get("/blogs/edit/:id", isAdminLoggedIn, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    res.render("edit-blog", { blog })
  } catch (error) {
    res.status(500).send("Error fetching blog")
  }
})

app.post("/blogs/edit/:id", isAdminLoggedIn, async (req, res) => {
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

app.get("/blogs/delete/:id", isAdminLoggedIn, async (req, res) => {
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