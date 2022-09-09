import './App.css';
import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addUser, updateUser, deleteUser } from './Components/Slice'

function App() {

  let usersList = useSelector((state) => state.users.value)
  const [btnName, setBtnName] = useState("Add User")
  let [indexUpdate, setIndexUpdate] = useState(0)
  let arrCopy=[];
  const dispatch = useDispatch();
  const firstName = useRef();
  const lastName = useRef();
  const btnSubmit = useRef();
  const age = useRef();


  function userData() {
    return {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      age: age.current.value,
    }
  }

  function update(index) {
    firstName.current.value = usersList[index].firstName
    lastName.current.value = usersList[index].lastName
    age.current.value = usersList[index].age
    setBtnName("Update User")
    setIndexUpdate(index)
  }
  function addUpdatedUser()
  {
    userData()
      arrCopy = [...usersList];
      arrCopy[indexUpdate]=userData()
      dispatch(updateUser(arrCopy))
      setBtnName("Add User")
  }

  return (
    <>
      <div className='w-50 m-auto'>
        <h1 className='text-center text-danger'>NationTech Company</h1>
        <label className='mt-2 mb-1 fw-bold' > Please insert first name :</label>
        <input className='form-control' placeholder='first Name .....' ref={firstName} />

        <label className='mt-2 mb-1 fw-bold'> Please insert last name :</label>
        <input className='form-control' placeholder='Last Name .....' ref={lastName} />

        <label className='mt-2 mb-1 fw-bold'> Please insert Age :</label>
        <input className='form-control' type={"number"} placeholder='Age .....' ref={age} />

        {/* <button onClick={() => dispatch(addUser(userData()))} className='btn btn-danger mt-3'  > {`${btnName}`}</button> */}
        <button onClick={() => btnName == "Add User" ?
          dispatch(addUser(userData())) :
          addUpdatedUser()}
          className='btn btn-danger mt-3'  > {`${btnName}`}</button>
      </div>

      <h2 className='mt-5 '>Users Data :</h2>

      <table className=" table ">
        <thead >
          <tr>
            <th scope="col">id</th>
            <th scope="col">userName</th>
            <th scope="col">LastName</th>
            <th scope="col">age</th>
            <th scope="col">Update</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody >

          {

            usersList.map((user, i) => {
              return <>

                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.age}</td>
                  <td>
                    <button className='btn btn-outline-primary' onClick={() =>
                      update(i)}> Update</button>
                  </td>
                  <td>
                    <button className='btn btn-outline-danger' onClick={() => dispatch(deleteUser(i))}> Delete</button>
                  </td>

                </tr>
              </>

            })



          }

        </tbody>
      </table>
    </>
  );
}

export default App;
