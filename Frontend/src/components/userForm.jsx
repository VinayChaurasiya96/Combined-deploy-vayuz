import React from "react";
// import {useState} from "react";
// import { useContext } from "react";
// import userContext from "../context/userContext";
import {useFormik} from 'formik'
import { signupSchema } from "../validationSchemas";
import { UserContext1 } from "../context/userContext";
import { useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";


const initialValues = {
  username: "",
  email: "",
  password:"",
  level:""
}

function UserForm() {
  const Navigate = useNavigate();
  const [singleUser, setSingleUser] = useState();
  const {createUser, getSingleUser, updateUser} = useContext(UserContext1);
 
  let {id} = useParams();

  const getAndSetSingleUser = async () => {
    const user = await getSingleUser(id);
    setSingleUser(user);
    initialValues.username = user.username
    initialValues.email = user.email
    initialValues.password = user.password
    initialValues.level = user.level
  }

  useEffect(()=>{
    if(id){
      getAndSetSingleUser();
    }
  },[])

  useEffect( () => () => {
    initialValues.username = ""
    initialValues.email = ""
    initialValues.password = ""
    initialValues.level = ""
  }, [] );

  const {values,errors,touched, handleBlur,handleChange,handleSubmit} = useFormik({
    initialValues: initialValues,
    validationSchema:signupSchema,
    onSubmit: (values)=>{
      if(id){
        updateUser(id, values);
      }else{
        createUser(values);
      }
      Navigate("/");
    }
  })
 


  return (
    <>
      <div className="form-main">
        <form id="form" onSubmit={handleSubmit} >
        <div>
              <label htmlFor="username">Name</label> <br />
              <input
                
                type="text"
                name="username"
                value={values.username}
                onChange = {handleChange}
                onBlur = {handleBlur}
                placeholder="enter name"
              />
              {
                errors.username && touched.username ? (
                  <p className="form-error">{errors.username}</p>
                ):null
                
              }
          </div>
          <div>
              <label htmlFor="email">Email</label> <br />
              <input
                
                type="email"
                name="email"
                value={values.email}
                onChange = {handleChange}
                onBlur = {handleBlur}
                placeholder="enter e-mail"
              />
              {
                errors.email && touched.email ? (
                  <p className="form-error">{errors.email}</p>
                ):null
                
              }
          </div>
         
          
          <div>
              <label htmlFor="password">Password</label> <br />
              <input
              
                type="password"
                name="password"
                value={values.password}
                onChange = {handleChange}
                onBlur = {handleBlur}
                placeholder="enter password"
              />
              {
                errors.password && touched.password ? (
                  <p className="form-error">{errors.password}</p>
                ):null
                
              }
          </div>

          <div>
              <select name="level"
                value={values.level}
                onChange = {handleChange}
                onBlur = {handleBlur}
                style={{marginTop:'15px'}}
              >
                <option value="">Select Level</option>
                <option value="User">User</option>
                <option value="Sub Admin">Sub Admin</option>
                <option value="Admin">Admin</option>
                <option value="Super Admin">Super Admin</option>
              </select>
              {
                errors.level && touched.level? (
                  <p className="form-error">{errors.level}</p>
                ):null
                
              }
          </div>
              <br/>
              {id? 
                <button className="btn" type="submit">Update</button>:
                <button className="btn" type="submit">Create</button>
              }
          <Link className="btn" to="/">All Users</Link>
        </form>
      </div>
    </>
  );
}

export default UserForm;
