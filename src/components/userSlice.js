import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, {payload} ) => {
      state.user = payload.user;
      state.token = payload.token;
    },
  },
})

export const { setCredentials } = userSlice.actions
export default userSlice.reducer