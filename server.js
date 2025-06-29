import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "https://adv-ashok-kumar.netlify.app",
        "https://adv-ashok-kumar.netlify.app/",
        "https://adv-ashok-kumar-admin.netlify.app",
        "https://adv-ashok-kumar-admin.netlify.app/",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200 || 201,
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(cookieParser())

const mongodb_url = process.env.MONGODB_URL
const port = process.env.PORT


//routes
app.get('/',(req,res)=>{
    res.json({message:`Server is Running on ${port}`})
})

//user route
import UserRoutes from './routes/user.routes.js'
app.use('/admin',UserRoutes)

//gallery route
import GalleryRoutes from './routes/gallery.routes.js'
app.use('/gallery',GalleryRoutes)

//blog route
import BlogRoutes from './routes/blog.routes.js'
app.use('/blog',BlogRoutes)

//inquiry route
import InquiryRoutes from './routes/inquiry.routes.js'
app.use('/inquiry',InquiryRoutes)

//inquiry route
import ProjectRoutes from './routes/project.routes.js'
app.use('/project',ProjectRoutes)

//application route
import ApplicationRoutes from './routes/application.routes.js'
app.use('/application',ApplicationRoutes)



const startServer = async () => {
    try {
        await mongoose.connect(mongodb_url);
console.log('DB connected')
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
};

startServer();
app.listen(port, console.log(`Server is running on ${port}`))
