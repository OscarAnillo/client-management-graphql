const express = require("express");
const connectDB = require("./Config/db")
const app = express();
require('dotenv').config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schema/schema")
const PORT = process.env.PORT || 5000;

// Call to the function to connect to the data base
connectDB()

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


