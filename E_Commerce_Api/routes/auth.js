const router = require("express").Router()
const User = require("../modals/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

// Register

router.post("/register", async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.DES.encrypt(req.body.password, process.env.PASS_SEC)
        // CryptoJS.AES.encrypt(JSON.stringify(
        //     req.body.password
        // ), process.env.PASS_SEC).toString(),
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }

})

// Login 

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        !user && res.status(401).json("wrong creditionals")
        const hashedPassword = CryptoJS.DES.decrypt(user.password, process.env.PASS_SEC);

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        console.log("user", hashedPassword)
        originalPassword !== req.body.password &&
            res.status(401).json("wrong creditionals!!")

        const accesstoken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
            process.env.JWT_SEC,
            { expiresIn: "3d" }

        );

        const { password, ...others } = user._doc


        res.status(200).json({ ...others, accesstoken })
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router