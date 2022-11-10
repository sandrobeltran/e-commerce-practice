import User from "models/User";
import jwt from "jsonwebtoken";
import { dbConnect } from "utils/mongoose";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      //SIGNUP AN USER
      try {
        let color = "#";
        const chars = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
        ];
        for (let i = 0; i < 6; i++) {
          const randomNumber = Math.floor(Math.random() * 16);
          color += chars[randomNumber];
        }
        const newUser = new User({ ...body, admin: false, cart: { amount: 0, products: [] }, color });
        newUser.password = await newUser.encryptPassword(newUser.password);
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.APP_SECRET, {
          expiresIn: 60 * 60 * 24,
        });

        return res.status(200).json({ auth: true, token });
      } catch (error) {
        return res.status(500).json({ auth: false, msg: error.message });
      }
    default:
      return res.status(500).json({ msg: "This method is not supported" });
  }
}
