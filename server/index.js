const express=require("express");
const app=express();
const cookieparser=require('cookie-parser');
const cors = require("cors");

require('dotenv').config();
const PORT=process.env.PORT || 4000;

app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
}));

app.use(express.json());
app.use(cookieparser());

require("./config/database").connect();

const user=require("./routes/user");
const setupSwaggerDocs = require("./swagger");

app.use("/api/v1",user);
setupSwaggerDocs(app);

app.listen(PORT,()=>{
    console.log("app is running on PORT:4000");
})