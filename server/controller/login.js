const User = require('../model/USER')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jtw_scret_key = "helloDude"
exports.register = async(req,res,next) => {
   try{
    const {name,password, email} = req.body
    const  existingUser = await User.findOne({email});
    if(!existingUser){
     const hsahPassword = bycrypt.hashSync(password)
        const user =  new User ({name,password:hsahPassword, email})
        await user.save();
        return res.status(200).json({user:user})
    } else {
     return res.status(200).json({message:"User Alredy Exist"})
    }
   } catch (err){
    return res.status(200).json({message:err.message})

   }

}

exports.login = async(req,res,next) => {
try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message:"User Not Found"})
    } else {
     const hsahPassword = await bycrypt.compareSync(password,user.password)
     if(!hsahPassword){
        return res.status(400).json({message:"Invalid Email and password"})
     } else {
        const token = jwt.sign({id:user._id},jtw_scret_key,{
            expiresIn:"35s"
        });
        console.log("Genrate Token",token);
        if(res.clearCookie[`${user._id}`]){
            req.cookies[`${user.id}`] = "";
        }
        res.cookie(String(user._id), token,{
            path:'/',
            expires:new Date(Date.now() + 1000 * 35),
            httpOnly:true,
            sameSite:"lax"
        })
        return res.status(200).json({user:user,token})
     }

    }

}catch (err){
    return res.status(500).json({message:err.message})

}    
}

exports.verifyUser = async(req,res,next) => {
   const cookies = req.headers.cookie;
  if(!cookies){
    return res.status(400).json({message:"No Cookie Found"})
  } else{
    const decrypt_token = cookies.split("=")[1];
     if(!decrypt_token){
        return res.status(400).json({message:"No Token Found"})
    } else {
        jwt.verify(String(decrypt_token),jtw_scret_key,(err,user) => {
            if(err){
        return res.status(400).json({message:"InValid Token"})
            } else {
            req.id = user.id;
        }
    })
}
next()
    }
}

exports.getUser = async(req,res,next) => {
    const userId = req.id;
    const user = await User.findById(userId,"-password")
    if(!user){
        return res.status(400).json({message:"User Not found"})
    } else{
        return res.status(200).json({user:user})
    }
}
exports.refreshToken = async(res,req,next) => {
    const cookies = req.headers.cookie;
    if(!cookies){
      return res.status(400).json({message:"No Cookie Found"})
    } else{
      const decrypt_token = cookies.split("=")[1];
       if(!decrypt_token){
          return res.status(400).json({message:"Authorization Time Out"})
      } else {
          jwt.verify(String(decrypt_token),jtw_scret_key,(err,user) => {
              if(err){
          return res.status(400).json({message:"Login Failed"})
              } else {
             res.clearCookie(`${user.id}`)
             req.cookies[`${user.id}`] = "";

             const token = jwt.sign({id:user.id},jtw_scret_key,{
                expiresIn:"35s"
            });
        console.log("Refresh Token",token);

            res.cookie(String(user.id), token,{
                path:'/',
                expires:new Date(Date.now() + 1000 * 35),
                httpOnly:true,
                sameSite:"lax"
            })
            req.id = user.id;
            next()
              }
          })
        }
      }
}

exports.logOut = async(req,res,next) => {
    const cookies = req.headers.cookie;
    if(!cookies){
      return res.status(400).json({message:"No Cookie Found"})
    } else{
      const decrypt_token = cookies.split("=")[1];
       if(!decrypt_token){
          return res.status(400).json({message:"No Token Found"})
      } else {
          jwt.verify(String(decrypt_token),jtw_scret_key,(err,user) => {
              if(err){
          return res.status(400).json({message:"InValid Token"})
              } else {
            res.clearCookie(`${user.id}`)
            req.cookies[`${user.id}`] = "";
            return res.status(200).json({message:"User LogOut Successfully"})
                 
          }
      })
  }
  next()
      }
}