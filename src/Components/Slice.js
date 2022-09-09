import { createSlice } from '@reduxjs/toolkit'
import { usersData } from './FakeData'
let usersReducer = createSlice({
   name: "users",
   initialState: { value: usersData },
   reducers: {
      addUser: (state, action) => {
         state.value.push(action.payload)

      },
      deleteUser: (state, action) => {
         state.value.splice(action.payload, 1)
      },
      updateUser: (state, action) => {
         state.value=action.payload
         
      }

   }
})

export const { addUser,updateUser, deleteUser } = usersReducer.actions

export default usersReducer.reducer;