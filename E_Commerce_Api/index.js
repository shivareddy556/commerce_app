const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require('./routes/user')
const authRoute = require("./routes/auth")
const productsRoute = require("./routes/product")
const cartRouter = require("./routes/cart")
const orderRouter = require("./routes/order")
const strapeRouter= require("./routes/stripe")
const cors =require("cors")

dotenv.config()
mongoose.set('strictQuery', true);
mongoose.connect(process.env.Mongo_Url, { useNewUrlParser: true }).then(() => {
    console.log("connected deatabase")
}).catch((err) => {
    console.log(err)
})
app.use(cors)
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute) 
app.use("/api/products", productsRoute) 
app.use("/api/carts", cartRouter) 
app.use("/api/orders", orderRouter) 
app.use("/api/strape", strapeRouter) 
// mongoose.set('strictQuery', true);
app.listen(process.env.PORT || 5000, () => {
    console.log("backend server is running")
})