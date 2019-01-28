const express = require("express");

const mongoose = require("mongoose");
// const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path')
const Schema = mongoose.Schema;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/logininfo");
if (process.env.NODE_ENV === "production") {
    app.use(express.static("react-intro/build"));
}
// Add routes, both API and view
// app.use(routes);

// Connect to the Mongo DB

const chatSchema = new Schema({
    user: { type: String }
});

const Chat = mongoose.model("Chat", chatSchema);

app.post('/save', function (req, res) {
    console.log(req.body);
    // {"poornima Mathur":  ""}


    Chat
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));

})
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, "./react-intro/build/index.html"));
});

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});