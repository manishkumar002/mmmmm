const InstructorRegisterSchema=require('../../models/admin/InstructorModel') 
const ContentSchema=require('../../models/admin/content') 
 const jwt=require('jsonwebtoken')
const loginInstrucor=async(req,resp,next)=>{
  try { 
    const email = req.body.email;
    const password = req.body.password;
    const usermail = await InstructorRegisterSchema.findOne({
      email: email,
      password: password,
    });
    if (usermail) {
      let token=await jwt.sign({username:usermail.email},process.env.JWT_SECRET,{expiresIn:'1h'})
      resp.status(200).json({
        code: 200,
        message: "user Login successfully",
        data: {
          _id: usermail._id,
          name: usermail.name,
          email: usermail.email,
          token: token,
        },
        error: false,
        status: true,
      });
      console.log(usermail._id);
    } else {
      resp.status(404).json({
        code: 404,
        message: "Invalid User details, Try Again.  ",
        data: [],
        error: false,
        status: false,
      });
    }
    } catch (err) {
      console.log(err);
    }
} 
 
const createInstructor=async(req,resp)=>{
  try { 
          const { name,email,contact,password}=req.body
     const usermail = await InstructorRegisterSchema.findOne({ email: email });
     console.log(usermail);
     if (usermail) {
       resp.status(404).json({
         code: 404,
         message: "user aleready exist....  ",
         data: [],
         error: false,
         status: false,
       });
     } else {
       let data = new InstructorRegisterSchema({ name,email,contact,password}); 
       await data.save(); 
       resp.status(200).json({
         code: 200,
         message: "user  Register successfully",
 
         error: false,
         status: true,
       });
     }
   } catch (err) {
     console.log(err);
   }
}


const putInstructor=async(req,res)=>{
try {

  const { name,email,contact,password}=req.body
    

   let data = await InstructorRegisterSchema.updateOne(
   {_id: req.params._id},
    { $set:  { name,email,contact,password}}

);
     res.send(data);

 } catch (err) {
     console.log(err)
 }

}

const getInstructor=async(req,res)=>{

  let data = await InstructorRegisterSchema.find( );

  res.send(data);
}
const getSingleInstructor=async(req,res)=>{

  let data = await InstructorRegisterSchema.find({_id:req.params._id} );

  res.send(data);
}
const deleteInstructor= async (req, resp) => {
try {
  //console.log(req.params.contact);
  let data = await InstructorRegisterSchema.deleteOne({_id:req.params._id});
  resp.send(data);
} catch (err) {
  console.log(err);
}
} 
 

const createCategory= async(req,resp)=>{
  try { 
  
  let {title,pname,pslug,price,disprice,description}=req.body   
  const img=req?.file?.filename  
       let data = new ContentSchema( {title,pname,pslug,price,disprice,description,img}); 
         await data.save(); 
       resp.status(200).json({
         code: 200,
         message: "Content added successfully", 
         error: false,
         status: true,
       });
    
   } catch (err) {
     console.log(err);
   }
}

const putCategory=async(req,res)=>{
  try {
    
    let {title,pname,pslug,price,disprice,description}=req.body   
    const img=req.file.filename

     let data = await ContentSchema.updateOne(
     {_id: req.params._id},
      { $set:  {title,pname,pslug,price,disprice,description,img}} 
  );
       res.send(data); 
   } catch (err) {
       console.log(err)
   }
 
}
const getCategory=async(req,res)=>{

  let data = await ContentSchema.find( );

  res.send(data);
}
 
const getSingleCategory=async(req,res)=>{

  let data = await ContentSchema.find({_id:req.params._id});

  res.send(data);
}

 const deleteCategory= async (req, resp) => {
  try {
    console.log(req.params);
    let data = await ContentSchema.deleteOne({_id:req.params._id});
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
}

 

module.exports={  
   createCategory,
   putCategory,
   getCategory,
    deleteCategory,
    getSingleCategory,
    loginInstrucor,
  createInstructor,
  putInstructor,
   getInstructor, 
  deleteInstructor, 
  getSingleInstructor , 
}