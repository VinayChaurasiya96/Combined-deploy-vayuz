import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import 'reactjs-popup/dist/index.css';
import { UserContext1 } from "../context/userContext";
import {Link} from 'react-router-dom';

export default function Users() {
  
  //@ desc Storing all users data  
  const [user, setUser] = React.useState([]);
  const {getUsers, updateUser,deleteUser} = useContext(UserContext1)

  // desc Get user data from context and set to users state
  const getAndSetUser = async () => {
    const contextUser = await getUsers();
    setUser(contextUser);
  }
 

  React.useEffect(()=>{
    getAndSetUser();
  },[]);

// @desc Update user-status onclicking Active and In-Active Buttons
// @Handler Update User-Status
  const handleUpdateStatus = async (singleUser) =>{
    await updateUser(singleUser._id, {'status' : !singleUser.status}).then(()=>{
      getAndSetUser();
    })
  };

// @desc Delete user onclicking Delete button 
// @Handler Delete-User
  const handleDeleteUser = async (singleUser) =>{
    await deleteUser(singleUser._id).then(()=>{
      getAndSetUser();
    })
    
  };
   
  return (
    <div className='user_wrapper'>
      <div className='add_user'>
        <Link className='btn' to="/create-user" >Add User</Link>
      </div>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className='head-row'>
              <TableCell align="left">No.</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="left">Password</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="center">Level</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((singleUser,index) => (
              <TableRow
                key={index+1}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{index+1}</TableCell>
                <TableCell align="left">{singleUser.username}</TableCell>
                <TableCell align="left">{singleUser.email}</TableCell>
                <TableCell align="left">{singleUser.password}</TableCell>
                <TableCell align="left">
                  <span 
                  className={singleUser.status ? 'active' : 'inactive'}
                  onClick={()=>handleUpdateStatus(singleUser)}
                  >
                    {singleUser.status ? 'Active' : 'InActive'}
                  </span>
                </TableCell>
                <TableCell align="center">{singleUser.level}</TableCell>
                <TableCell align="center">
                <Link className='btn edit-btn' to={`/update-user/${singleUser._id}`} >Edit</Link>
                <button className="btn del-btn" onClick = {()=>handleDeleteUser(singleUser)} >Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}