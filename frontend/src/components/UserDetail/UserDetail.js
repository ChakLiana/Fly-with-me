import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"



const UserDetail = () => {
  const {id} = useParams()
  const [currentUser, setCurrentUser] = useState(null)

  const dispatch = useDispatch()
  const loader = useSelector(state => state.loader)


  useEffect(() => {

    fetch(`http://localhost:8080/api/v1/users/${id}`, {credentials: 'include'})
      .then(response => response.json())
      .then(user => setCurrentUser(user))
      .catch((e) => console.error(e))
    
  }, [])


  return (
    <>
      {
        
        currentUser && 
        <div className="d-flex justify-content-center">
          <div className="card text-center" style={{width: '18rem'}}>
            <div className="card-body">
              <h5 className="card-title">{currentUser.nickName}</h5>
              <p className="card-text">{currentUser.email}</p>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default UserDetail
