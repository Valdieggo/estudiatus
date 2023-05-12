import { connectToDatabase } from "../../../utils/db";
import User from "../../../models/User";

export default async function handler(req, res) {

  const {username,birthday,email,password} = req.body;
  


  if (!email || !password) {
    return res.status(422).json({ message: "Invalid input" });
  }
  await connectToDatabase();
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json(console.log("User already exists"));
  }

  
  
  if (req.method == "POST") {
    
    const newUser = new User({ username,birthday,email,password });
    await newUser.save();
    if (newUser) {
      return res.status(201).json({ message: "User created" });
    }
    else {
      return res.status(500).json({ message: "User not created" });
    }

  }

}