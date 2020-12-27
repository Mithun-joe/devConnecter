const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const auth = require('../../middleware/auth');
const bcrpyt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require('../../models/User');
//@route GET api/auth
//@desc Test Route
//@access Public

router.get('/',auth, async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)

    }catch (err) {
        console.log(err.message);
        res.status(500).send("server error")
    }
});


//@route POST api/auth
//@desc AUTHENTICATE USER AND GET TOKEN
//@access Public

router.post('/',
    [
        check("email","please include valid Email").isEmail(),
        check("password","password is required").exists()],
    async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }
        //see if the user exits
        const {email,password} = req.body;

        try{
            let user = await User.findOne({email});
            if (!user){
                return res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
            }

            const isMatch = await bcrpyt.compare(password,user.password);

            if(!isMatch){
                return res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
            }

            const payload = {
                user: {
                    id:user.id
                }
            };

            jwt.sign(payload,config.get('jwtSecret'),
                {expiresIn: 36000},
                (err,token) =>{
                    if (err) throw err;
                    res.json({token})
                });
        }catch(err){
            console.log(err.message);
            res.status(500).send("server error")
        }
    });

module.exports = router;