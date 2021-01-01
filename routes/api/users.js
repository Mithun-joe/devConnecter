const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route POST api/user
//@desc REGISTER user
//@access Public

router.post('/',
    [
    check("name","Name is required").not().isEmpty(),
    check("email","please include valid Email").isEmail(),
    check("password","enter password 6 or more character").isLength({
        min:6
    })],
    async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    //see if the user exits
    const {name,email,password} = req.body;

    try{
        let user = await User.findOne({email});
        if (user){
           return res.status(400).json({errors:[{msg:'User Already exists'}]});
        }
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });

        user = new User({
            name,
            email,
            password,
            avatar
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

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