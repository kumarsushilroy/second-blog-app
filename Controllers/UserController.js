const userModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

//REGISTER USER
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).send({
        success: false,
        msg: "please provide all these fields",
      });
    }

    //  const existingUser = userModel.findById({email})
    //  if(existingUser){
    //     return res.status(501).send({
    //         success:false,
    //         msg:'user already exists !'
    //     })
    //  }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({ username, email, password: hashedPassword });

    await user.save();
    res.status(201).send({
      succss: true,
      msg: "user register succesfull",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      msg: "something went wrong !",
    });
  }
};

//LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).send({
        success: false,
        msg: "please provide all fields",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        msg: "user does not exist !",
      });
    }

    const passwordValidation = await bcrypt.compare(password, user.password);
    if(!passwordValidation){
        return res.status(401).send({
            success:false, 
            msg:'wrong password !' 
        })
    }
//GETTING TOKEN
    const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn:'1d'}, (err, token)=>{
      if(err){
        return res.status(401).send({
          success:false,
          msg:'token not generated'
        })
      }else{
       return res.status(201).send({
        success:true,
        msg:'token generated',
        user,
        token:token
       })
      }
    })

    // res.status(201).send({
    //     success:true,
    //     msg:'login success',
    //     user
    // })

  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      msg: "something went wrong !",
    });
  }
};

const getAllUsers = async(req,res)=>{
  const getUser = await userModel.find({});
  res.status(201).send({
    success:true,
    msg:'users found',
    getUser
  })
}




module.exports = { createUser, loginUser, getAllUsers };
