# myapp_react3

Created on 2022-07-31 **WORK IN PROGRESS**

## 1 - Introduction 
This is a recap of first two apps (see [myapp_react1](https://github.com/andrealacamera/myapp_react1) and [myapp_react2](https://github.com/andrealacamera/myapp_react2)), with some differences... 

1. Here I used **Vite** for creating the project. From terminal, launch `npm create vite@latest myapp_react3`. 
Of course TailwindCss is always present (see [instructions](https://tailwindcss.com/docs/guides/vite) for details) 

2. I introduced `<Outlet>` in the Router definition, as explained in next section.

3. I used a local (fake) API for authentication / server-side. Launch with `node server.js` on separated terminal. The user is `andrea` with password `12354` (yes! **1-2-3-FIVE-4** !!! ). See section 3 for details. 

4. I used an apiSlice for the mutations (login, logout) and store the returned token on userSlice in the store. See section 4 for details. 

**Remark. Unlike the CRA project, Vite does not initialize any PWA. See [here](https://vite-plugin-pwa.netlify.app/)**

## 2 - Outlet and Router

- Install the router (`npm i react-router-dom@6`) and configure as previous projects. Define `pages` and `components`, add `Header` and `Footer` to components, and `Home`, `Login`, `Protected`, and `Welcome` to pages. The homepage and the protected pages cannot be accessed without authentication, while both the login and the Welcome page are public. 

- Thanks to [**Outlets**](https://reactrouter.com/docs/en/v6/components/outlet) we can protect a lot of pages in a single definition.  Define a new component `Guard.jsx` with auth hook (see section 4, meanwhile you can set to `false` or `true` and simulate the two ways). 
```js
import { Navigate, Outlet } from 'react-router-dom'
//define by hand the auth object
return auth.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  )
...
``` 

- Add Routes and Route to `App.jsx`
```js
  <Header />
  <div className="flex-grow">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path='/login' element={<Login />} />
      <Route path='/protected' element={<Protected />} />
    </Routes>
  </div>
  <Footer />
```

## 3 - server side API for authentication


## 4 - Redux store (RTK Query)








See the documentation, in particular [this example](https://redux-toolkit.js.org/rtk-query/usage/examples#authentication)

