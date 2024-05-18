import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;
    console.log(token);
    const user: any = await User.findOne({ verifyToken: token });
    console.log(user);
    
    if (!user || user.verifyTokenExpire < Date.now()) {
        return NextResponse.json(
            { error: "Invalid or expired token" },
            { status: 400 }
        );
    }
    user.isVerfied= true;
    user.verifyToken = undefined;
    user.verifyTokenExpire=undefined;
    
    const finalUser=await user.save();
    console.log(finalUser);
    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message + " this is " },
      { status: 500 }
    );
  }
}
