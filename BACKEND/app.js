import express from "express"
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import connectDB from "./src/config/mongo.config.js";
dotenv.config("./.env")
import urlScehma from "./src/models/short_url.model.js"


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/api/create",(req,res)=>{
    const {url} = req.body;
    const shortUrl = nanoid(7);
    const newUrl = new urlScehma({
        full_url:url,
        short_url:shortUrl
    })
    newUrl.save();
    res.send(nanoid(7));
})


app.get("/:id",async(req,res)=>{
    const {id} = req.params;
    const url = await urlScehma.findOne({short_url:id})
    if(url)
    {
        res.redirect(url.full_url);
    }else{
        res.status(404).send("Not Found")
    }
})


app.listen(5000, ()=>{
    connectDB();
    console.log("Server is running on port http://localhost:5000");
})

