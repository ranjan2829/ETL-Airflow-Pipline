const Book=require("../models/Book");
const getAllBooks=async(req,res)=>{
    try{
        const allbook=await Book.find({});
        if(allbook?.length>0){
            res.status(200).json({
                success:true,
                message:"List of books fetch successfully",
                data:allbook,
            });
        }
        else{
            res.status(404).json({
                success:false,
                message:"No book found in collection",
            });
        }

    }
    catch(e){
        console.log(e);
        
        res.status(500).json({
            success:false,
            message:"Something went wrong! Please try again",
        });

    }

};
const getSingleBookById=async(req,res)=>{
    try{
        const findID=req.params.id;
        const BookID=await Book.findById(findID);
        if(!BookID){
            return res.status(404).json({
                success:false,
                message:"Book with the current ID is not Found ",
            });
        }
        res.status(200).json({
            success:true,
            message:"Book with found",
            data:BookID,
        });



    }
    catch{
        console.log(e);
        
        res.status(500).json({
            success:false,
            message:"Something went wrong! Please try again",
        });

    }

};
const addNewBook=async(req,res)=>{
    try{
        const newBook=req.body;
        const creatBook=await Book.create(newBook);



    
        if (newBook) {
            res.status(201).json({
            success: true,
            message: "Book added successfully",
            data: newBook,
            });
        }
    }

  
    catch{
        console.log(e);
        
        res.status(500).json({
            success:false,
            message:"NO Books found in collection"
        });

    }

};
const updateBook=async(req,res)=>{
    try{
        const updateBook=req.body;
        const updateBookID=req.params.id;
        const update=await Book.findByIdAndUpdate(
            updateBookID,updateBook,{
                new:true,
            }
        );
        if(!update){
            res.status(404).json({
                success:false,
                message:"Book is not found with this ID",
            });
        }
        res.status(200).json({
            success:true,
            message:"Book updated",
            data:update,
        });

    }

    catch{
        console.log(e);
        
        res.status(500).json({
            success:false,
            message:"Something went wrong! Please try again",
        });

    }

};
const deleteBook=async(req,res)=>{
    try{
        const getCurrentBookID = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(getCurrentBookID);
    
        if (!deletedBook) {
          res.status(404).json({
            success: false,
            message: "Book is not found with this ID",
          });
        }
    
        res.status(200).json({
          success: true,
          data: deletedBook,
        });

    }
    catch{
        console.log(e);
        
        res.status(500).json({
            success:false,
            message:"Something went wrong! Please try again",
        });

    }

};
module.exports={
    getAllBooks,
    getSingleBookById,
    addNewBook,
    updateBook,
    deleteBook
};
