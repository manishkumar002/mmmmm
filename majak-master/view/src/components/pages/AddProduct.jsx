import "../styles/AddProduct.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  pname: yup.string().required("Product name is required"),
  pslug: yup.string().required("Slug is required"),
  img: yup.mixed().required("Image is required"),
  price: yup.number().required("Price is required").positive("Price must be positive"),
  disprice: yup.number().required("Discount price is required").positive("Discount price must be positive"),
  description: yup.string().required("Description is required"),
});

export default function AddProduct() {
  const navigate = useNavigate();
  const token = JSON.parse(window.localStorage.getItem("token"));
  
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("pname", data.pname);
    formData.append("pslug", data.pslug);
    formData.append("img", data.img[0]);
    formData.append("price", data.price);
    formData.append("disprice", data.disprice);
    formData.append("description", data.description);

    fetch(`http://localhost:8000/api/content`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
      .then(res => res.json())
      .then(() => {
        alert("Content Added Successfully");
        navigate("/viewblog");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='container-fluid py-4'>
      <div className='row'>
        <div className="col-sm-3"></div>
        <div className='col-sm-4 py-5'>
          <img src="https://img.freepik.com/free-vector/blogging-concept-illustration_114360-4480.jpg?w=1060&t=st=1687179733~exp=1687180333~hmac=1f4a16781ceae33fdb25c5d084b4b0f941e77ca41f5c19446a23c0250eb2f493" style={{height:'500px',width:'500px'}}/>
        </div>
        <div className='col-sm-4 blo'>
          <center className='py-3'><h3 style={{color:'black'}}>Add<u style={{color:'#fdc700'}}>Blog</u></h3></center>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("title")} className='form-control w-100' placeholder='Enter Your Title' />
            <p className="ErrorColor">{errors.title?.message}</p>
            
            <input {...register("pname")} className='form-control w-100' placeholder='Enter Your Product Name' />
            <p className="ErrorColor">{errors.pname?.message}</p>
            
            <input {...register("pslug")} className='form-control w-100' placeholder='Enter Your Slug' />
            <p className="ErrorColor">{errors.pslug?.message}</p>
            
            <input type="file" {...register("img")} className='form-control w-100' placeholder='Enter Your profile' />
            <p className="ErrorColor">{errors.img?.message}</p>
            
            <input type="number" {...register("price")} className='form-control w-100' placeholder='Enter Your Price' />
            <p className="ErrorColor">{errors.price?.message}</p>
            
            <input type="number" {...register("disprice")} className='form-control w-100' placeholder='Enter Your Discount Price' />
            <p className="ErrorColor">{errors.disprice?.message}</p>
            
            <input {...register("description")} className='form-control w-100' placeholder='Enter Your Description' />
            <p className="ErrorColor">{errors.description?.message}</p>
            <br/>
            <input type="submit" className='form-control' value="Submit" style={{background:'#fdc700'}} />
            <br />
          </form>
          <br />
        </div>
        <div className="col-sm-1"></div>
      </div>
    </div>
  );
}
