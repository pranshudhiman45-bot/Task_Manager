const app = require('./src/app.js')
const connectDB = require('./src/db/db.js')
require('dotenv').config()
connectDB()


app.listen(process.env.PORT, ()=>{
    console.log("Server is running");
    
}) 