import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";


import * as endPoints from '../config/endPoints'
import { editUser } from "../../redux/actions/user.ac";

const UserEdit = () => {
  const [userEdit, setUserEdit] = useState({})


  const user = useSelector(state => state.user)
  let history = useHistory();
  const dispatch = useDispatch()

  useEffect(() => {

    fetch(endPoints.getUser(user._id), {credentials: 'include'})
      .then(response => response.json())
      .then(user => setUserEdit(prev => ({
        ...prev, 
        email: user.email,
        nickName: user.nickName,
        password: user.password
       })))
      
  }, [])

  const changeHandler = (e) => {
    setUserEdit(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    let payload = Object.entries(userEdit).filter((el) => el[1] ? el[1].trim() : el[1])
    if (payload.length) {
      payload = Object.fromEntries(payload)
      dispatch(editUser(payload, history))
    }
  } 



  return (
    <>
  
      <div className="d-flex justify-content-center">
        <form onSubmit={submitHandler} className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3">
          <legend className="text-center mb-4">User Edit</legend>
          <div className="mb-3">
            <input onChange={changeHandler} className="form-control" value={userEdit.email} type="email" name="email" placeholder='Email' />
          </div>

          <div className="mb-3">
            <input onChange={changeHandler} className="form-control" value={userEdit.nickName} type="text" name="nickName" placeholder='Name' />
          </div>

          <div className="mb-3">
            <input onChange={changeHandler} className="form-control" value={userEdit.password} type="password" name="password" placeholder='Pass' />
          </div>
          
          <button type="submit" className="btn btn-primary">Edit</button>
        </form>
      </div>
    
    </>
    
  )
}

export default UserEdit
