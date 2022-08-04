import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  token: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, {payload} ) => {
      console.log(payload);
      state.username = payload.username;
      state.token = payload.token;
    },
  },
})

export const { setCredentials } = userSlice.actions
export default userSlice.reducer