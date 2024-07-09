const User = require('../models/user.model')
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    registerUser: async (req, res) => {
        try{
            const potentialUser = await User.findOne({ email:req.body.email })
            if(potentialUser){
                res.status(400).json({message: 'that Email already exists please logIn'})
            }else{
                const newUser = await User.create(req.body);
                const userToken = jwt.sign({_id: newUser._id, email:newUser}, secret, {expiresIn: '2h'})
                console.log(userToken);
                res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:2 * 60 * 60 * 1000}).json(newUser);
            }
        }
        catch(err){
            res.status(400).json({ error: err })
        }
    },

    loginUser: async (req, res) => {
        try{
            const user = await User.findOne({ email:req.body.email })
            if(user){
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                    if(passwordsMatch){
                        const userToken = jwt.sign({_id: user._id, email:user}, secret, {expiresIn: '1h'})
                        
                        res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:60 * 60 * 1000}).json({message:"succes!", user, userToken});
                        console.log(userToken)
                    }else{
                        res.status(400).json({ message: 'Invalid Email/Password'});
                    }

            }else{
                res.status(400).json({ message: 'Invalid Email/Password'});          
            }
        }
        catch(err){
            res.status(400).json({ error: err })
        }
    },

    logoutUser: (req, res) => {
        res.clearCookie('userToken').json({ message: 'You ve logged Out'})
    },

    getOneUser: (req, res) => {
        User.findOne({_id: req.params.id})
        .then((oneUser) => {
            res.json(oneUser)})
        .catch((err) => console.log(err))
    },

    findAllUsers: (req, res) => {
        User.find()
            .then((allUsers) => {
                res.json(allUsers)})
            .catch((err) => console.log(err))
    },

    
}

module.exports.deleteUser = (req, res) => {
    User.deleteOne({_id: req.params.id})
    .then(result => {
        res.json(result)})
    .catch((err) => console.log(err))
};

