var express = require("express")
var app = express()  // => app is the whole app access and router is the next separation 
const path = require("path")
// public assets

app.use('/public', express.static('public'))

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"))
})

const port = process.env.PORT || '3001'
app.listen(port, function(){
    console.log("listening in port " + port)
})