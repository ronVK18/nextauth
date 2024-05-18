import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function POST(req: NextRequest) {
  try {
    const response=NextResponse.json({
        message:"Logout Successful",
        sucess:true
    })
    response.cookies.set('token','',{
        httpOnly:true,
        expires:new Date(0)
    })
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
    
}