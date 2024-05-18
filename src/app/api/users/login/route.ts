import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const {  email, password } = reqBody;
    //Validation
    console.log(reqBody);
    const user = await User.findOne({ email: email });
    if(!user){
      return NextResponse.json({error:"User not found"}, { status: 404 })
    }
    console.log(user);
    const validPassword=await bcryptjs.compare(password,user.password)
    if(!validPassword){
      return NextResponse.json({error:"Check Your Credentials"}, { status: 400 })
    }
    const tokenData={
        id:user._id,
        username:user.username,
        email:user.email,
    }
    const token=jwt.sign(tokenData,process.env.SECRET!,{expiresIn:'1d'})
    const response=NextResponse.json({
        message:'Login Successful',
        sucess:true
    })
    response.cookies.set('token',token,{
        httpOnly:true,
        
    })
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
