const mongoose = require("mongoose");
const transporter = require("../config/mailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

// post middleware
fileSchema.post("save", async function(doc) {
    try{
        console.log("DOC", doc);

        let info = await transporter.sendMail({
            from:`CodeHelp by Babbar`,
            to: doc.email,
            subject: "New file uploaded on Cloudinary",
            html: `
                <h2>Hello ${doc.name}</h2>
                <p>Your file has been uploaded successfully.</p>
                <p>
                    <b>View File:</b> 
                    <a href="${doc.imageUrl}">${doc.imageUrl}</a>
                </p>
            `
        });

        console.log("INFO", info);
    }
    catch(error){
        console.error(error);
    }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;