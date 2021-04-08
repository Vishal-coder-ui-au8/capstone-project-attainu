const cloudinary = require("cloudinary").v2;
const createDirectory = require('../utils/directory.js');
const Form = require('../models/FormSchema'); 
const fs = require('fs') 


const admission = {};
var uploaded = false;
var newUploadedUrl = '';
var sentToDatabase = false;

cloudinary.config({
    cloud_name: "sangdev",
    api_key: "424869595565838",
    api_secret: "tu6EzGuzTKOwWr6OhoQh6LvYCiI"
});

//upload a file that comes via request
//POST /admission/upload
admission.upload = async(req,res) => {
    //console.log("req.files", req.files);

    if(!req.files ){
        console.log("Upload bad request")
        return res.status(400).send({success:false, message:"Bad Request"}); 
    }
    
    const uploadFile = req.files.file;   
    console.log("uploadfile properties---", uploadFile);

    //1. Create a directory on server called uploads
    const directoryPath = `${__dirname}/uploads`;  
    await createDirectory(directoryPath).then((path) => {
        console.log(` 1 Successfully created directory: '${path}'`);
    }).catch((error) => {
        console.log(`Problem creating directory: ${error.message}`)
    });


    //2. upload file received in request to uploads folder   
    try{
    await uploadFile.mv(`${__dirname}/uploads/${uploadFile.name}`,function(err, data){
        if(err) {
            return res.status(500).send(err)
        }
        console.log(" 2 File moved",`${__dirname}/uploads/${uploadFile.name}`);        
    })
    }
    catch(e){
        return res.status(500).json({
            error: `Error in moving file from request to uploads: ${e}`
        });
    }    

    
    //3. upload the file to cloudinary
    console.log("3", `${__dirname}/uploads/${uploadFile.name}`)
    await cloudinary.uploader.upload(`${__dirname}/uploads/${uploadFile.name}`)
    .then((result) => {
       
        console.log(result.url)
        const length = result.url.length;
        let newUrl = result.url.slice(0, (length-4)) + ".jpg"
        console.log(newUrl);
        newUploadedUrl = newUrl; 
        uploaded = true              

        
    }).catch(err => {
        
        console.log("Error in uploading file to cloudinary", err)
    })

    //4 Create/update a record in dadatabase storing the form's URL
    if (uploaded)
    {
        console.log("Trying to update database")
        try{
            const filter = { name: uploadFile.name};
            const update = { url: newUploadedUrl };

            let form = await Form.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true // Make this update into an upsert
            });
            console.log("4", form);

            //delete file from uploads folder
            fs.unlink(`${__dirname}/uploads/${uploadFile.name}`, (err) => {
                if (err) {
                      console.error(err)
                      return
                }
                console.log("file deleted successfully");
            })
            
            return res.status(201).json({success:true, message:"Updated form document successfully",data:form})
        }
        catch(e){
            console.log(e)
            return res.status(400).json({error:true, message:e})
        } 
        

    }   
   
}

//DELETE /admission/delete
admission.delete =  async(req,res) => {   

    if(!req.body.name ){
        console.log("Delete bad request")
        return res.status(400).send({message:'Bad Request'}); 
    }

    const filter = { name: req.body.name};
    console.log("filter",filter)
   


    try{
        await Form.deleteOne(filter,(err,result) => {
            if (err) {
                return res.status(400).json({error:true, message: "Form could not be deleted"});
              } else {
                return res.status(200).json({success:true, result: result});
              }
        });   

    }
    catch(e){
        return res.status(500).json({
            error: `Error: ${e}`
        });
    }
}


//GET /admission/list
admission.list =  async(req,res) => {   

    try{
        let forms = await Form.find();
        if (forms){
            return res.status(200).json({success:true, forms: forms})
        }

    }
    catch(e){
        return res.status(500).json({
            error: `Error: ${e}`
        });
    }



}

module.exports = admission;