const { verifyToken, verifyTokenAndAuthrization, verifyTokenAndAdmin } = require("./verifyToken")
const router = require("express").Router();
const Cart = require("../modals/Cart");

// CREATE
router.post('/', verifyToken, async (req, res) => {
    const createCart = new Cart(req.body)
    try {
        const savedcart = await createCart.save()
        res.status(200).json(savedcart)
    } catch (err) {
        res.status(500).json(err)
    }
})

//  UPDATED
router.put("/:id", verifyTokenAndAuthrization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})
// DELETE
router.delete("/:id", verifyTokenAndAuthrization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been Deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})
// GET USER CART

router.get("/find/:userId", verifyTokenAndAuthrization, async (req, res) => {
    try {
        const getUserCart = await Cart.findOne({ userId: req.params.userId })
        res.status(200).json(getUserCart)
    } catch (err) {
        res.status(200).json(err)
    }
})
// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const cart = await Cart.find()
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router