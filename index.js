var express=require('express')
var path=require('path')
app=express()
alfa=express.Router()
var port=process.env.PORT || 8080

app.use(express.static(__dirname+'/'))

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
 next();
});

app.get('*',function(req,res) {

	res.sendFile(path.join(__dirname+'/pages/sample.html'));
})

app.use('*',alfa);
app.listen(port);
console.log('Go to port: '+ port)
