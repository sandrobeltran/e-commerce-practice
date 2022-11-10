import User from "models/User";
import Product from "models/Product";
import { dbConnect } from "utils/mongoose"
import jwt from "jsonwebtoken";

dbConnect()

export default async function handler(req, res) {
  const { method, headers, body, query } = req;

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
    //GET ALL PRODUCTS
    case "GET":
      const products = query.category ? await Product.find({ category: query.category }) : await Product.find();
      return res.status(200).json({ products });
    //ADD A PRODUCT
    case "POST":
      try {
        const newProduct = new Product(body);
        await newProduct.save();
        return res.status(200).json({ msg: "Product added successfully", product: newProduct });
      } catch (error) {
        return res.status(200).json({ msg: error.message });
      }
    default:
      return res.status(500).json({ msg: "This method is not supported" });
  }
}
