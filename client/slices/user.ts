import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
  user: {
    id: string
  name: string
  email: string
  picture: string
  role: [string]
  password: string 
  }
}

const initialState: UserState = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserData: (state, action) => {
      state.user = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { getUserData } = userSlice.actions

export default userSlice.reducer
