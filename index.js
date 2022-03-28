const express= require("express")
const mongoose= require("mongoose")

const app= express()

app.use(express.json())

const connectDB =()=>{
    return mongoose.connect("mongodb+srv://deepak123:13549Aa@cluster0.aqkfd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

    )
}


// creating user model

// styep 1---> user schema
const userSchema= new mongoose.Schema(
    {
        firstName:{type:String, required:true},
        lastName:{type:String, required:false},
        email: {type:String, required:true},
        password: {type:String, required:true}
    },
    {
        versionKey: false,
        timestamps:true
    }

)

// styep 2---> user model

const User= mongoose.model("user", userSchema)


// Todo Model

// styep 1---> todo schema
const todoSchema= new mongoose.Schema(
    {
        title:{type:String, required:true},

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
       
           },
    },

   
    {
        versionKey: false,
        timestamps:true
    }
)


app.post("/register", async(req, res) =>{
    try{
        const user = await User.create(req.body);
        return res.status(201).send(user)
    } catch(err){
        return res.status(500).send({ message: err.message});
    }
});

app.post("/login", async(req, res) =>{
    try{
        const user = await User.login(req.body);
        return res.status(201).send(user)
    } catch(err){
        return res.status(500).send({ message: err.message});
    }
});

app.get("/todos", async(req, res) =>{
    try{
        const user = await User.find().lean().exec();

        return res.status(200).send({users: users})
    } catch(err){
        return res.status(500).send({ message: err.message});
    }
});

app.post("/todos", async(req, res) =>{
    try{
        const user = await User.create(req.body);
        return res.status(201).send(user)
    } catch(err){
        return res.status(500).send({ message: err.message});
    }
});

app.get("/todos/:id", async(req, res) =>{
    try{
        const user = await User.findById(req.params.id).lean().exec();
        return res.status(200).send(user)
    } catch(err){
        return res.status(500).send({ message: err.message});
    }
});

app.patch("/todos/:id", async(req, res) =>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
        }).lean().exec();
        return res.status(200).send(user)
    } catch(err){
        return res.status(500).send({ message: err.message});
    }
});

app.delete("/todos/:id", async(req, res) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(user)
    } catch(err){
        return res.status(500).send({ message: err.message});
    }
});