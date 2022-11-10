import User from "models/User";
import Product from "models/Product";
import { dbConnect } from "utils/mongoose";
import jwt from "jsonwebtoken";

dbConnect();

export default async function handler(req, res) {
  const { method, headers, query, body } = req;

  //VERIFY USER IS ADMIN
  try {
    const token = headers["x-access-token"];
    if (!token)
      return res.status(403).json({ msg: "You need to provide a token" });
    const tokenVerified = jwt.verify(token, process.env.APP_SECRET);
    const foundUserById = await User.findById(tokenVerified.id);
    if (!foundUserById)
      return res.status(404).json({ msg: "This email doesn't exist" });
    if (!foundUserById.admin)
      return res
        .status(403)
        .json({ msg: "You haven't authorization to do this action" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }

  switch (method) {
    case "GET":
      try {
        const foundProduct = await Product.findById(query.id);
        if (!foundProduct)
          return res.status(404).json({ msg: "This product doesn't exist" });
        return res.status(200).json({ product: foundProduct });
      } catch (error) {
        return res.status(200).json({ msg: error.message });
      }

    case "PUT":
      try {
        const foundProduct = await Product.findById(query.id);
        if (!foundProduct)
          return res.status(404).json({ msg: "This product doesn't exist" });
        const updatedProduct = await Product.findByIdAndUpdate(query.id, body, {
          new: true,
        });
        return res.status(200).json({
          msg: "Product updated successfully",
          product: updatedProduct,
        });
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    case "DELETE":
      try {
        const foundProduct = await Product.findById(query.id);
        if (!foundProduct)
          return res.status(404).json({ msg: "This product doesn't exist" });
        const deletedProduct = await Product.findByIdAndDelete(query.id);
        return res
          .status(200)
          .json({ msg: "Product deleted successfully", deletedProduct });
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    default:
      return res.status(500).json({ msg: "This method is not supported" });
  }
}
