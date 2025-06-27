const express=require("express");
const app=express();
const path=require("path");
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
const port=8080;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'))
let posts=[
    {
        id:uuidv4(),
        username:"Tushar yadav",
        content:"He is Hero",
    },
    {
        id:uuidv4(),
        username:"Divyanshu",
        content:"Noob 1",
    },
    {
        id:uuidv4(),
        username:"Piyush",
        content:"Noob 2",
    },
]
app.get("/posts",(req,res)=>{
    res.render("index",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new");
})
app.get("/posts/:id",(req,res)=>{
    console.log(req.params);
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    console.log(post);
    // res.render("show",{posts,id});
    res.render("show",{post});
})
app.post("/posts",(req,res)=>{
    console.log(req.body);
    // posts[posts.length]=req.body;
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts")
})
// app.patch("/posts/:id",(req,res)=>{
//     let {id}=req.params;
//     let newContent=req.body.content;
//     let post=posts.find((p)=>id===p.id);
//     post.content=newContent;
//     console.log(post);
//     res.send("working")
// })
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    if(post){
        res.render("edit.ejs",{post})
    }else{
        res.send("cannot find the given id");
    }
})
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let newContent=req.body.content;
    console.log(newContent);
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id !== p.id);
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log(`server started at ${port}`);
})