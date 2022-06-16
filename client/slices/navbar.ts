import { createSlice } from '@reduxjs/toolkit'

export interface Key {
  key: string
}

const initialState: Key = {
  key: ''
}

export const keySlice = createSlice({
  name: 'key',
  initialState,
  reducers: {
    setKey: (state, action) => {
      state.key = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setKey } = keySlice.actions

export default keySlice.reducer
