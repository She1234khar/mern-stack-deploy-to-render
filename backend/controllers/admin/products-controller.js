const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product=require('../../models/Product')



 async function handleImageUpload(req,res){
  try{
const b64 = Buffer.from(req.file.buffer).toString('base64');
const url = "data:" + req.file.mimetype + ";base64," + b64;
const result = await imageUploadUtil(url);
res.send({
  succes:true,
  result
})
  } catch(error){
    console.log(error)
    res.json({
      succes:false,
      message: "Error uploading image"
    })
  }

}

// Add new producr

const addproduct=async (req,res)=>
  {
    try{
      const {image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock}=req.body;
      const product=new Product({
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock
        });
        await product.save();
        res.json({  
          succes:true,
          message: "Product added successfully",
          product
          });
          } catch(error){
            console.log(error)
            res.json({
              succes:false,
              message: "Error adding product"
              })
              }
            }

//fetch all product
const featchProducts=async (req,res) => {
  try{

const listofproduct = await Product.find({});
res.json({
  succes:true,
  message: "Products fetched successfully",
  listofproduct
  });


  } catch(error){
    console.log(error)
    res.json({
      succes:false,
      message: "Error featching product"
      })
      }
  
}
// edit all product

const editProduct=async (req,res) =>
  {
    try{
  const id = req.params.id;
  const {image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock}=req.body;
  
  const product = await Product.findById(id);
  if(!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  
  product.title = title ||product.title ;
  product.description = description || product.description;
  product.category = category || product.category ;
  product.brand = brand || product.brand ;
  product.price = price || product.price ;
  product.salePrice = salePrice || product.salePrice ;
  product.totalStock = totalStock || product.totalStock ;
  product.image = image || product.image ;
  await product.save();
  res.json({
    succes:true,
    message: "Product updated successfully",
    product
    });

// const deleteProduct=async (req,res) => 
//   {
//     try{}

  
// }



    }
    catch(error){
      console.log(error)
      res.json({
        succes:false,
        message: "Error in editing  product"
        })
        }

      }


      const deleteProduct=async (req,res) => 
        {
          try{
            const id = req.params.id;
            const product = await Product.findByIdAndDelete(id);
            if(!product) {
              return res.status(404).json({ message: "Product not found" });
              }
              res.json({
                succes:true,
                message: "Product deleted successfully",
                product
                });
          }
          catch(error){
            console.log(error)
            res.json({
              succes:false,
              message: "Error in editing  product"
              })
              }
      
        
      }
      










module.exports={handleImageUpload,addproduct,featchProducts,editProduct,deleteProduct};