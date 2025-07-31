const express = require('express')
const app=express()
const cors = require('cors')
const port = 8000
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const cloudinary = require('cloudinary').v2
const fs = require('fs')


app.use(express.json())
app.use(cors())

cloudinary.config({ 
        cloud_name: 'dlptuisf0', 
        api_key: '892345585254425', 
        api_secret: 'jzhvFNAs0gGnZSCmArgSygtADG8' 
    });



app.post('/img', upload.single('avatar'), async (req,res)=>{
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           req.file.path, {
               public_id: Date.now()
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);

     fs.unlink(req.file.path, (err) => {
    if (err) {
        console.log(err);
    }
    res.status(200).send(uploadResult);
});

})




app.listen(port, (err)=>{
    if (err) {
        console.log(err);
        
    }else{
        console.log(`this server is runing at ${port}`);
        
    }
})


