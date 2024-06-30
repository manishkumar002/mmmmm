import "../styles/ViewProduct.css"
import React, { useState,useEffect } from 'react' 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';  
function  VeiwProduct(){ 
  let token=JSON.parse(window.localStorage.getItem("token"))
  const [title,setTitle]=useState('')
  const [pname,setPname]=useState('')
  const [pslug,setPslug]=useState('')
  const [img,setImg]=useState('')
  const [price,setPrice]=useState('')
  const [disprice,setDisprice]=useState('')
  const [description,setDescription]=useState('')
const[data,setData]=useState([]);
  function demo(){
    
    fetch(' http://localhost:8000/api/content',{
      method: 'GET', // or any other HTTP method
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((result)=>{
      result.json().then((res)=>{
        setData(res)
      })
    })
  }
 useEffect(()=>{
  demo()
 },[])

 function del(id) {
   
  if (window.confirm('are you sure want to delete?')) {
    fetch(`http://localhost:8000/api/content/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => {
        toast.success('Delete Record SuccessFully', {
          position: "top-center"
      })
        demo();
      });
  } 
 
  else {
      toast.error('Record Not Delete', {
          position: 'top-center'
      })
  }
}

function edit(id){ 
  window.localStorage.setItem('stt',JSON.stringify(id._id))
  setTitle(id.title)
  setPname(id.pname)
  setPslug(id.pslug)
    setImg(id.img)
    setPrice(id.price)
    setDisprice(id.disprice) 
    setDescription(id.description) 
    }

  function handleupdate(e){
    e.preventDefault();
   
    const formData = new FormData();
    formData.append("title", title);
    formData.append("pname", pname);
    formData.append("pslug", pslug);
    formData.append("img", img);
    formData.append("price", price);
    formData.append("disprice", disprice);
    formData.append("description", description);
    let id=JSON.parse(window.localStorage.getItem("stt")) 
      fetch(`http://localhost:8000/api/content/${id}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then(() => {
          alert("Content Updated Successfully");
        demo()
        })
        .catch((err) => {
          console.log(err);
        });

  }  
 
 return (
  <div className="container ">
  <div className='row'>
  {
                    data.map((item, index) => (
              <div className="col-sm-3 viewCard">
                <div className="image mt-2">
                <img src={`http://localhost:8000/api/img/${item.img}`} width="100%" height={"300"} alt="sq-sample4"/>
                </div>
                 <div>{item.title}</div>
                 <div>{item.pname}</div>
                 <div>{item.pslug}</div>
            </div>             
                    ))
                }
  </div>










                   <table className="table">
                    <thead className="thead-dark">
                    <tr style={{background:'#302b63'}}>
      
      <th>Title</th>
      <th>ProductName</th>
     <th>ProductSlug</th>
    <th>Image</th>
    <th>Price</th> 
    <th>DiscountPrice</th>
    <th>Description</th> 
     <th>Edit</th>
     <th>Delete</th>
    </tr>
                    </thead>
                    <tbody>
                   
                         {data.map((item,index)=>
                            <tr>
        <td>{item.title}</td>
        <td>{item.pname}</td>
        <td>{item.pslug}</td>
        <td><img src={`http://localhost:8000/api/img/${item.img}`} height='30px' width="40px" alt='path not found'/></td>
        <td>{item.price}</td>
        <td>{item.disprice}</td> 
        <td>{item.description}</td> 
        
         <td>
         
<button type="button" onClick={()=>edit(item)}  className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
 Edit
</button>

 
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form onSubmit={handleupdate}>


      <input type="text" value={title}  onChange={(e)=>setTitle(e.target.value)}  className='form-control w-100 '  placeholder='Enter Your Title' /><br/>
      <input type="text" value={pname}  onChange={(e)=>setPname(e.target.value)}   className='form-control w-100 '  placeholder='Enter Your ProductName' /><br/>
      <input type="text"  value={pslug}  onChange={(e)=>setPslug(e.target.value)}   className='form-control w-100 '  placeholder='Enter Your Slug' /><br/>
      <input type="file" onChange={(e)=>setImg(e.target.files[0])}      className='form-control w-100 '  placeholder='Enter Your profile' /><br/>
      <input type="number" value={price}  onChange={(e)=>setPrice(e.target.value)}    className='form-control w-100 '  placeholder='Enter Your Price' /><br/>
      <input type="number"  value={disprice}  onChange={(e)=>setDisprice(e.target.value)}   className='form-control w-100 '  placeholder='Enter Your DiscountPrice' /><br/>
      <input type="text"  value={description}  onChange={(e)=>setDescription(e.target.value)}   className='form-control w-100 '  placeholder='Enter Your Description' /><br/>


      <input type="submit"   className='form-control' value="UPDATE"  style={{background:'#fdc700'}} /><br />
  
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
         
      </div>
    </div>
  </div>
</div>
          
          </td>        
          <td><button onClick={()=>del(item._id)} className='btn btn-info'>Delete</button></td>    
           
                            </tr>
                          )}   
                       
                    </tbody>   
                </table>
                <ToastContainer/> 
            </div>
        );
    }
  
export default VeiwProduct;

