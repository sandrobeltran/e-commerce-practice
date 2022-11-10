import User from "models/User";
import jwt from "jsonwebtoken";
import { dbConnect } from "utils/mongoose";

dbConnect();

export default async function handler(req, res) {
  const { method, body, headers } = req;

  switch (method) {
    //GET USER DATA
    case "GET":
      try {
        const token = headers["x-access-token"];
        if (!token)
          return res
            .status(403)
            .json({ auth: false, msg: "You need to provide a token" });
        const tokenVerified = jwt.verify(token, process.env.APP_SECRET);

        const foundUserData = await User.findById(tokenVerified.id, {
          password: false,
          _id: false,
          updatedAt: false,
        });
        if (!foundUserData)
          return res
            .status(404)
            .json({ auth: false, msg: "This email isn't registered" });

        return res.status(200).json({ auth: true, user: foundUserData });
      } catch (error) {
        return res.status(500).json({ auth: false, msg: error.message });
      }

    case "POST":
      //LOGIN AN USER
      try {
        const userFoundByEmail = await User.findOne({ email: body.email });
        if (!userFoundByEmail)
          return res
            .status(404)
            .json({ auth: false, msg: "This email isn't registered" });

        const passwordsMatches = await userFoundByEmail.verifyPassword(
          body.password
        );
        if (!passwordsMatches)
          return res
            .status(403)
            .json({ auth: false, msg: "Wrong email or password" });

        const token = jwt.sign(
          { id: userFoundByEmail._id },
          process.env.APP_SECRET,
          { expiresIn: 60 * 60 * 24 }
        );

        return res.status(200).json({ auth: true, token });
      } catch (error) {
        return res.status(500).json({ auth: false, msg: error.message });
      }
    default:
      return res.status(500).json({ msg: "This method is not supported" });
  }
}
