const express = require('express');
const app = express();
const mongoose = require('mongoose');
const categoryRoutes = require('./api/routes/category');
const bodyParser = require('body-parser');
const blogRoute = require('./api/routes/blog');
const fileUpload = require('express-fileupload');
const userRoute = require('./api/routes/user');
mongoose.connect("mongodb+srv://hj123:hj123@cluster0.nje5l7g.mongodb.net/?retryWrites=true&w=majority")
.then(res=>{
    console.log("conected successfully...");
})
.catch(err=>{
    console.log (err);
});
app.use(fileUpload({
    useTempFiles:true
}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/category', categoryRoutes);
app.use('/blog', blogRoute);
app.use('/user', userRoute);

app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'bad request'
    })
});





module.exports = app;