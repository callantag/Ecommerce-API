const express = require("express");
const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 4000;

mongoose.connect("mongodb+srv://callantag:callantag@cluster0.uiyt6.mongodb.net/ecommerce-api", {
// mongoose.connect("mongodb+srv://callantag:callantag@cluster0.uiyt6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex : true
}).then(() => {
	console.log("Connected to database.");
}).catch( err => {
	console.log(err.message);
}); 

app.use(express.json());

app.use("/users", require("./routes/userRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/orders", require("./routes/orderRoutes"));

app.listen( port , () => {
	console.log(`Listening on port ${port}.`);
});