import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";




//we will send {name} to the category route

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }


    // we should not have two same category
    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits",
      });
    }

   // if not aleadry exist then create a category to db
      // Slugify converts 'cart items' to 'cart-items' becuse we also need a slug

    const category = await new categoryModel({name,slug: slugify(name),}).save();

    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try { 
    const { name } = req.body;
    const { id } = req.params; /*  takes info from url 
                              so id will have the id item http://localhost:8080/api/v1/category/update-category/(id of the item from db)
                              
    On http://localhost:8080/api/v1/category/update-category/(id of the item from db)

    we will send put req   {name: "kids collection"} 
    
    update from {name: "kids"}     to ----->        {name: "kids collection"} 
*/
    const category = await categoryModel.findByIdAndUpdate(id,{ name, slug: slugify(name) },{ new: true });

      res.status(200).send({success: true,messsage: "Category Updated Successfully",category,});
      
    } 
  
      catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// get all cat
export const categoryControlller = async (req, res) => {
  try {
    const category = await categoryModel.find({});  //  find all

    res.status(200).send({success: true,message: "All Categories List",category});
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// single category
//http://localhost:8080/api/v1/category/single-category/kids 
export const singleCategoryController = async (req, res) => {
  try {   
   /* can also do const category = await categoryModel.findOne({ slug: req.params.slug}); */
      //OR
  
    //just req.params.slug would give object  { slug: 'electronics' }

    const  slug = req.params.slug; // Extract slug from req.params   // 
    const category = await categoryModel.findOne({ slug }); // Use slug in the query */
      
    if(category){
    res.status(200).send({
      success: true,
      message: "Got Single Category SUccessfully",
      category
    });}
    
    else{
      res.status(404).send({
        success: false,
      message: "Category does not exist",
      category
      });
    }

  } 
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category 
export const deleteCategoryController = async (req, res) => {

  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });

  } 
      
 
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
      
    });
  }
};
