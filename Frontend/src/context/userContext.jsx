import { createContext } from "react";

export const UserContext1 = createContext();


const createUser = async (values)=>{
  
  try {
    await fetch(`http://localhost:8001/admin/v1/user/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(values),
    });
  } catch (error) {
    alert('add user error');
    alert(error);
  }

  
}

const getUsers = async () => {
  var users = [];
  try{
    await fetch(`http://localhost:8001/admin/v1/user/allusers`)
          .then((res) => res.json())
          .then((json) => {
            users = json
          })
  }catch(err){
    console.log('all user err');
    console.log(err);
  }
  return users;
}

const getSingleUser = async (userId) => {
  var user = {};
  try{
    await fetch(`http://localhost:8001/admin/v1/user/${userId}`)
          .then((res) => res.json())
          .then((json) => {
            user = json
          })
  }catch(err){
    console.log('all user err');
    console.log(err);
  }
  return user;
}

const updateUser = async (userId,values)=>{
  try {
    await fetch(`http://localhost:8001/admin/v1/user/update/${userId}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
    .then(response => response.json())
    .then(json => console.log(json));
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async(id)=>{
  try{
     // Simple DELETE request with fetch
     await fetch(`http://localhost:8001/admin/v1/user/delete/${id}`, { method: 'DELETE' });
    }
  catch(err){

  }
}



function userContext({children}) {
  return (
    
        <UserContext1.Provider value={{createUser,updateUser, getUsers, getSingleUser,deleteUser }} >{children}</UserContext1.Provider>
   
  )



}



export default userContext