import { apiService } from "../services/apiServices";
import { createContext } from "react";
export const UserContext1 = createContext();

const createUser = async (values)=>{
  
  try {

    //@ API Services | add User | using  path(../services/apiServices) 
    await fetch(`${apiService.addUser}`, {
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
    //@ API Services | get AllUser | using  path(../services/apiServices) 
    await fetch(`${apiService.getAllUser}`)
          .then((res) => res.json())
          .then((json) => {
            users = json
          })
  }catch(err){
   
    console.log(err);
  }
  return users;
}

const getSingleUser = async (userId) => {
  var user = {};
  try{
    //@ API Services | get Single User | using  path(../services/apiServices) 
    await fetch(`${apiService.getAllUser}/${userId}`)
          .then((res) => res.json())
          .then((json) => {
            user = json
          })
  }catch(err){
    
    console.log(err);
  }
  return user;
}

const updateUser = async (userId,values)=>{
  try {
    //@ API Services | update User | using from path(../services/apiServices) 
    await fetch(`${apiService.editUser}/${userId}`, {
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
     //@ API Services | remove User | using from path(../services/apiServices) 
     await fetch(`${apiService.removeUser}/${id}`, { method: 'DELETE' });
    }
  catch(err){
     console.log(err)
  }
}



function userContext({children}) {
  return (
    
        <UserContext1.Provider value={{createUser,updateUser, getUsers, getSingleUser,deleteUser }} >{children}</UserContext1.Provider>
  )
}

export default userContext