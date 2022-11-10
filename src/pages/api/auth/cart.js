import User from 'models/User'
import { dbConnect } from 'utils/mongoose'
import jwt from 'jsonwebtoken'

dbConnect()

export default async function handler(req, res) {
	const { method, body, headers } = req

	switch (method) {
		case 'PUT':
			try {
				const token = headers['x-access-token']
				if (!token)
					return res
						.status(403)
						.json({
							success: false,
							msg: 'You need to provide a token',
						})
				const tokenVerified = jwt.verify(token, process.env.APP_SECRET)
				const updatedUser = await User.findByIdAndUpdate(
					tokenVerified.id,
					{ cart: JSON.parse(body) },
					{ new: true }
				)
				if (!updatedUser)
					return res
						.status(404)
						.json({ success: false, msg: 'User not found' })

				return res.status(200).json({ success: true, updatedUser })
			} catch (error) {
				return res
					.status(500)
					.json({ success: false, msg: error.message })
			}
		case 'POST':
			try {
				const token = headers['x-access-token']
				if (!token)
					return res
						.status(403)
						.json({
							success: false,
							msg: 'You need to provide a token',
						})
				const tokenVerified = jwt.verify(token, process.env.APP_SECRET)
				const user = await User.findById(tokenVerified.id)
				if (!user)
					return res
						.status(404)
						.json({ success: false, msg: 'User not found' })

				const cart = user.cart
				const { cantity, product } = JSON.parse(body)
				if (cart.products.find(item => item.title === product.title)) {
					const newCart = cart
					const index = newCart.products.findIdex(
						item => item.title === product.title
					)
					newCart.products[index].cantity =
						newCart.products[index].cantity + cantity
					newCart.amount = newCart.amount + cantity

					const updatedUser = await User.findByIdAndUpdate(
						tokenVerified.id,
						{
							cart: newCart,
						}
					)
					return res.status(200).json({ success: true, updatedUser })
				} else {
					const newCart = {
						amount: cart.amount + cantity,
						products: [
							...cart.products,
							{
								_id: product._id,
								title: product.title,
								price: product.price,
								image: product.image,
								cantity: cantity,
							},
						],
					}
					console.log(newCart)
					const updatedUser = await User.findByIdAndUpdate(
						tokenVerified.id,
						{
							cart: newCart,
						}
					)
					return res.status(200).json({ success: true, updatedUser })
				}
			} catch (error) {
				return res
					.status(500)
					.json({ success: false, msg: error.message })
			}

		default:
			return res.status(500).json({ msg: 'This method is not supported' })
	}
}
