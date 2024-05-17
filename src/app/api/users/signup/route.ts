import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody =await req.json();
    const { username, email, password } = reqBody;
    //Validation
    console.log(reqBody);
    const user = await User.findOne({ email: email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const saveUser = await newUser.save();
    console.log(saveUser);

    //Send Verification mail
    await sendEmail({ email, emailType: "VERIFY", userId: saveUser._id });
    return NextResponse.json({
      message: "User Register successfully",
      sucess: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}
