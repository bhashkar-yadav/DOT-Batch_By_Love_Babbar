const Todo = require("../models/Todo");

exports.getTodo = async(req,res) => {
    try {
        //fetch all todo items from database (mongoos provide various functions like find, create findbyid...)
        const todos = await Todo.find({});

        //response 
        res.status(200)
        .json({
            success:true,
            data:todos,
            message:"Entire Todo Data is fetched",
        });

    }
    catch(err){
        console.error(err);
        res.status(500)
        .json({
            success:false,
            error:err,
            message:err.message
        })
    }
}


//get single todo on the basis of id

exports.getTodoById = async(req,res) => {
    try {
        //extract todo item basis on id
        const id = req.params.id;
        const todo = await Todo.findById({_id: id})

        //dat for given id is not found

        if(!todo){
            return res.status(404).json({
                success:false,
                message:"No Data Found with given Id",
            })
        }
        //data for given id is FOUND
        res.status(200).json({
            success:true,
            data:todo,
            message: `Todo ${id} data successfully fetched`,
        })

    }
    catch(err){
        console.error(err);
        res.status(500)
        .json({
            success:false,
            error:err,
            message:err.message
        })
    }
}