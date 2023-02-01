import './App.css';
import UserForm from './components/userForm';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Users from './components/users';
import UserContext from './context/userContext';



function App() {

  
  return (
    <>
       <UserContext >
        <Router>
          <Routes>
              <Route path='/' element = {<Users/>} />
              <Route path='/create-user' element = {<UserForm/>} />
              <Route path='/update-user/:id' element = {<UserForm/>} />
          </Routes>
        </Router>
       </UserContext>
      
       
    </>
     
   
  );
}

export default App;
