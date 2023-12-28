const express = require('express');
const router = express.Router();
const Blog = require('../model/blog');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;



cloudinary.config({
    cloud_name: 'dvknbkzy8',
     api_key:'176434491939275',
     api_secret:'emNgfS4ATJLnxswWSFK-SSGTQjQ'
})
//post new blog
router.post('',(req,res)=>{
    console.log(req.body);
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
        console.log(result);
        const blog = new Blog({
            _id: new mongoose.Types.ObjectId,
            title: req.body.title,
            description:req.body.description,
            author:req.body.author,
            photo:result.url
        });
        blog.save()
        .then(result=>{
            res.status(200).json({
                new_blod:result
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })

    })

   
     
})

//get all blog
router.get('',(req,res)=>{
    Blog.find()
    .then(result=>{
        res.status(200).json({
            blogs:result
        })
    })
      .catch(err=>{
          console.log(err);
          res.status(500).json({
              error:err
          })
      }) 
})
//get blog by id
router.get('/:id',(req,res)=>{
    Blog.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            blog:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})
        
   //update blog     
   router.put('/:id',(req,res)=>{
       const file = req.files.photo;
       cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
           Blog.findByIdAndUpdate(req.params.id,{
               $set:{
                   title:req.body.title,
                   description:req.body.description,
                   author:req.body.author,
                   photo:result.url
               }
            },{new:true})
            .then(result=>{
                res.status(200).json({
                    updated_blog:result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        })
    })
//delete
router.delete('',(req,res)=>{
    const imageUrl = req.query.imageUrl;
    const urlArray = imageUrl.split('/');
    const image = urlArray[urlArray.length-1];
    const imageName = image.split('.')[0];
    console.log(imageName);

        Blog.findByIdAndDelete(req.query.id)
        .then(result=>{
            cloudinary.uploader.destroy(imageName,(err,data)=>{
                 console.log(data)
                res.status(200).json({
                    msg:result
                })
            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })

    })

module.exports = router;
