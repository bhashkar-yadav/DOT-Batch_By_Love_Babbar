const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
//localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try {
        //fetch file
        const file = req.files.file;
        console.log("FILE AA GYI JEE-->", file);
        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;  //server's path where we will upload
        console.log("PATH-> ", path)

        //add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:'Local File uploaded successfully',
        })
    }
    catch(error){
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};

    if(quality){
        options.quality = quality;
    }
    
    options.resource_type = "auto";  //apne aap detect karo kis type ki file h
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload ka handler
exports.imageUpload = async (req, res) => {
    try{
        //fetch the data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "png", "jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Tpye ",fileType);
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to Codehelp")
        const response = await uploadFileToCloudinary(file, "Codehelp")
        console.log(response);

        //db me entry save karni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}


//video upload ka hander 
exports.videoUpload = async (req,res) => {
    try{
        //data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file =req.files.videoFile;

        // Validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("File Type:", fileType);

        // 5MB in bytes
        const maxSize = 5 * 1024 * 1024; 

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        // Size validation
        if (file.size > maxSize) {
            return res.status(400).json({
                success: false,
                message: "File size exceeds 5MB limit",
            });
        }

        //file format and size support krta h
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //db me entry save karni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });
        res.json({
            success:true,
            videoUrl:response.secure_url,
            message:'Video Successfully Uploaded',
        })

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
    }
}


//image size reducer ka handler
exports.imageSizeReducer = async (req, res) => {
    try{
        //fetch the data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "png", "jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Tpye ",fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to Codehelp")
        const response = await uploadFileToCloudinary(file, "Codehelp", 30)
        console.log(response);

        //db me entry save karni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}