import React, { useEffect, useState } from 'react'; 
import { withRouter } from "react-router";
import axios from 'axios';
import './addCategory.css';
const EditCategory = ({setIsEditActive, getCategories, setLoading, setPage, category}) =>{
    const [name, setName] = useState(category.name);
    const [type, setType] = useState(category.type);
    const [types, setTypes] = useState([]);
    const getTypes = async () =>{
      const res = await axios.get('http://localhost:5000/v1/api/type/');
      if(res.data){
        setTypes(res.data);           
      }
    }
    useEffect(() =>{
      let mounted = true;
      if(mounted) {getTypes();}
      return () => mounted = false;
    }, []);
    const create = async (e)=>{
      e.preventDefault();
      const params = {
        name: name,
        type: type
      }
      if(name.length < 1){
        alert( "Name không được để trống");
      }
      else if(type.length < 1){
        alert( "Type không được để trống");
      }
      else{
        await axios.put('http://localhost:5000/v1/api/category/' + category._id, params)
        .then(response => {
          alert( "Sửa loại sản phẩm thành công!!!" );
          setIsEditActive(false);
          setLoading(false);
          setPage(1);
          getCategories(1);
        })
        .catch(error => {
          console.log(error)
          alert("Sửa loại sản phẩm thất bại!!!");
        })
      }
      
    }
    return(
      <div className="image-container">
        <div className="after2">
          <div className="boxed">
            <div className='boxed-close'><i onClick={()=> setIsEditActive(false)} className="fa fa-times" aria-hidden="true"></i></div>
            <form className="form-product" encType="multipart/form-data">
              <h2>EDIT CATEGORY</h2>
              <div className="form-input">
                <label>Category Name:</label>
                <input type="text" value={name || ""} onChange={(e)=> setName(e.target.value)}/>
              </div>
              <div className="form-input">
                <label>Type</label>
                <select onChange={(e)=> setType(e.target.value)} value={type._id}>
                  <option value="">[Select Type]</option>
                  {types && types.map((item) =>(
                    <option key={item._id} value={item._id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-btn-add">
                <button onClick={(e)=> create(e)}>Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )

}

export default withRouter(EditCategory);