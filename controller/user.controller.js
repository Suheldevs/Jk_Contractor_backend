import User from '../model/user.model.js'
import jwt from 'jsonwebtoken'
const userSignin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "User Allready exist!" })
        }
        const userInstant = new User({ email, password })
        const user = await userInstant.save()
        const { password: pass, _id: id, ...rest } = user._doc
        if (user) {
            return res.status(201).json({ message: 'User Sign in Successfull', user: rest })
        }
        res.status(500).json({ message: 'Internal server error' })
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
}


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const matchUser = await User.findOne({ email })
        if (!matchUser) {
            return res.status(404).json({ message: 'User not found, Please signin first' })
        }
        const matchPassword = matchUser.password == password
        if (!matchPassword) {
            return res.status(400).json({ message: 'Invalide creadentials' })
        }

        const token = jwt.sign({ email: matchUser.email }, process.env.JWT, { expiresIn: '1h' })
        const { password: pass, _id: id, ...rest } = matchUser._doc
        
        res.cookie('token', token, { 
            httpOnly: true,  
            maxAge: 3600000, 
            secure: true,  
            sameSite: 'None' 
        });
        
        res.status(200).json({ message: 'login successfull', user: rest });
    }
    catch (err) {
        res.status(500).json({ message: "Internal server Error" })
    }
}

export { userSignin, userLogin }