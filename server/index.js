import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import session from 'express-session';

const app = express();
const port = 5000;
const db = new pg.Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'mypword',
    database: 'BlogDB',
});
db.connect();

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true
}));
var blogs = [];

app.get("/api/blogs", async (req, res) => {
    blogs = [];
    const result = await db.query("SELECT * FROM blogs");
    result.rows.forEach((blog) => {
        blogs.push({
        blogID: blog.blog_id,
        bloggerName: blog.creator_name,
        timeCreated: blog.date_created,
        blogTitle: blog.title,
        blogContent: blog.body,
        bloggerID: blog.creator_user_id
        });
    });
    res.json({ blogs: blogs});
});

app.get("/api/user", (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.json({ user: null });
    }
});
//--------------------------------------------get
// app.get("/", async (req, res) => {
//     // get blogs from db
//     blogs = [];
//     const result = await db.query("SELECT * FROM blogs");
//     result.rows.forEach((blog) => {
//         blogs.push({
//         blogID: blog.blog_id,
//         bloggerName: blog.creator_name,
//         timeCreated: blog.date_created,
//         blogTitle: blog.title,
//         blogContent: blog.body,
//         bloggerID: blog.creator_user_id
//         });
//     });
//     res.render("index.ejs", { blogs: blogs, user: req.session.user});
// });

// app.get("/signup", (req, res) => {
//     res.render("signup.ejs");
// });

// app.get("/login", (req, res) => {
//     res.render("login.ejs");
// });

// app.get("/edit/:id", async (req, res) => {
//     // find blog in database
//     const query = "SELECT * FROM blogs WHERE blog_id = $1";
//     const result = await db.query(query, [req.params.id]);
    
//     if (result.rowCount > 0)
//     {
//         // render edit page with blog
//         res.render("edit.ejs", { blog: result.rows[0] });
//     }
//     // otherwise, assume blog not found
//     else
//     {
//         return res.status(404).send("Blog not found");
//     }
// });

// //-------------------------------------------post
app.post("/api/createBlog", async (req, res) => {
    // create query
    const query = "INSERT INTO blogs (blog_id, creator_name, creator_user_id, title, body, date_created) VALUES ($1, $2, $3, $4, $5, $6)";

    // try to insert new blog
    try {
        const result = await db.query(query,
                        [Math.floor(Date.now()/1000), req.session.user.name, req.session.user.user_id, req.body["blogTitle"], req.body["blogContent"], new Date()]);
            
        // return with success
        res.json({ success: true } );
    }
    catch (err) {
        // return with error
        res.json({ success: false } );
    }
});

app.post("/api/editBlog", async (req, res) => {
    // create query
    const query = "UPDATE blogs SET title = $1, body = $2 WHERE blog_id = $3"; 

    // update blog
    const result = await db.query(query, [req.body["blogTitle"], req.body["blogContent"], req.body["blogID"]]);
        
    // return with success
    res.json({ success: true } );
});

app.post("/api/signin", async (req, res) => {
    // search for user in db
    const query = "SELECT * FROM users WHERE user_id = $1 AND password = $2";

    const result = await db.query(query,
                    [req.body.userID, req.body.password]);

    if (result.rowCount > 0)
    {
        // return to sign up success
        req.session.user = result.rows[0];
        res.json({ success: true, user: result.rows[0]} );
    }
    // otherwise, assume invalid login info
    else
    {
        // return to sign up with invalidid error
        res.json({ success: false } );
    }
});

app.post("/api/signup", async (req, res) => {
    // try to insert user into db
    const query = "INSERT INTO users (user_id, password, name) VALUES ($1, $2, $3)";

    try {
        const result = await db.query(query,
                        [req.body.userID, req.body.password, req.body.bloggerName]);

        // return success error
        res.json({ success: true } );
    }
    catch (err) {
        // return to sign up with invalidid error
        res.json({ success: false } );
    }
});

app.post("/api/logout", async (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

app.post("/api/deleteBlog", async (req, res) => {
    let {blogID} = req.body;

    // delete blog from database
    const query = "DELETE FROM blogs WHERE blog_id = $1"
    const result = await db.query(query, [Number(blogID)]);

    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
});