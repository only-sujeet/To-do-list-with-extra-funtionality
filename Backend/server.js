const app = require("./app")

app.listen(process.env.PORT, (req,res) => { 
    console.log(`server is runing on port ${process.env.PORT}`)
 })