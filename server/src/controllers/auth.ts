import bcrypt from "bcrypt";
import UserModel from "../models/user";
import { RequestHandler } from "express";
import { generateTokenAndSetCookie } from "../utils/genrateToken";
import { IUser, signUpBody } from "../types/user";

/* REGISTER USER */
export const signUp:RequestHandler<unknown, unknown, signUpBody, unknown>  = async (req, res, next) => {
  const {
    username,
    fullname,
    password,
    confirmPassword,
    email,
    gender,
  } = req.body;

  try {
    if(password !== confirmPassword){
        res.status(400).json({error:"passwords don't match"});
        return;
    }
    const exitingUser = await UserModel.findOne({username})
    if(exitingUser){
        res.status(400).json({error:"username already exists"})
        return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)){
        res.status(400).json({error:"invalid Email format"})
        return;
    }
    if (password.length<5){
        res.status(400).json({error:"password is too short"})
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      username,
      fullname,
      password: passwordHash,
      email,
      prifilePic:'',
      gender
    });

    if (newUser)
    {
      generateTokenAndSetCookie(newUser._id,res);
      await newUser.save();
      res.status(201).json(newUser);
    }
    
  }catch (err) {
    next(err)
  }
}

export const login:RequestHandler = async (req, res, next) => {
  try {
      const {username,password} = req.body;
      const user = await UserModel.findOne({username});
      if(!user)
      {
        res.status(400).json({error:"invalid username"})
        return;
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password)

      if(!isPasswordCorrect){
        res.status(400).json({error:"invalid password"})
        return;
      }
      generateTokenAndSetCookie(user._id,res)
      res.status(200).json(user);
  } catch (err) {
    next(err)
  }
};

export const logout:RequestHandler = (req,res, next) => {
  try {
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({message:"Logout successfully"})
  } catch (err) {
    next(err)
  }
}


