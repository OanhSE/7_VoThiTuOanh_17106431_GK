const  express = require('express');
const  app = express();
const  aws = require('aws-sdk');
const body = require('body-parser');
const  PORT=2911;
const table = 'PhuKien';
app.use(express.static("public"));
app.use(body.urlencoded({extended : true}));
app.use(body.json());
app.set("view engine", "ejs");
app.set("views","./views");
const axios = require('axios');



app.get('/index', async(req,res)=>{
    var item = await axios.get('http://localhost:2911/');
    res.render('index', {Datatbl: item.data});
});
var awsconfig={
    'region': 'us-east-1' ,
    'accessKeyId': 'AKIAIBSJBQDKUQDIK2QA',
    'secretAccessKey': '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'
}
aws.config.update(awsconfig);
const DynamoDB = new aws.DynamoDB.DocumentClient();
  
app.get('/',function (req,res) {   
     DynamoDB.scan({TableName:table}).promise().then(data=>res.send(data.Items)).catch(console.error("Lỗi")); 
 });


app.listen(PORT,()=>{
    console.log(`Web Server running on port ${PORT}`);
});
