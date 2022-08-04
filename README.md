# myapp_react3

Created on 2022-07-31 
Updated on 2022-08-04



## 1 - Introduction 
This is a recap of first two apps (see [myapp_react1](https://github.com/andrealacamera/myapp_react1) and [myapp_react2](https://github.com/andrealacamera/myapp_react2)), with some differences... 

1. Here I used [**Vite**](https://vitejs.dev/) for creating the project. From terminal, launch `npm create vite@latest myapp_react3`. 
Of course TailwindCss is always present (see [instructions](https://tailwindcss.com/docs/guides/vite) for details). 

2. I introduced the `<Outlet>` in the Router definition, as explained in next section.

3. I used a local (fake and very basic) API for authentication / server-side. Launch with `npm run server` on separated terminal. The user is `andrea` with password `12354` (yes, **1-2-3-FIVE-4** !!! ). See section 3 for details. 

4. I used an apiSlice for defining the mutations (login, logout) and a userSlice for storing the returned token (and set the user). Some hooks are defined for getting the data. See section 4 for details.

**Remark. Unlike the CRA project, Vite does not initialize any PWA. See [here](https://vite-plugin-pwa.netlify.app/)**

## 2 - Outlet and Router

- Install the router (`npm i react-router-dom@6`) and configure it as in the previous projects. Define `pages` and `components`, add `Header` and `Footer` to components, and `Home`, `Login`, `Protected`, and `Welcome` to pages. The homepage and the protected pages cannot be accessed without authentication, while both the login and the Welcome page are public.

- Thanks to [**Outlets**](https://reactrouter.com/docs/en/v6/components/outlet) we can protect a lot of pages in a single definition.  Define a new component `Guard.jsx` with auth hook (see section 4, meanwhile you can set a `const user` to `null` or `andrea` and simulate the two different situations). For now, we put both `Home` and `Protected` within `Guard`.
```js
import { Navigate, Outlet } from 'react-router-dom'
//define by hand the auth object. E.g. 
// const auth = {
//  user: null
//}
return auth.user ? ( <Outlet /> ) : ( <Navigate to='/login' /> )
...
``` 

- Add Routes and Route to `App.jsx`. Note that `Home` is an [Index Route](https://reactrouter.com/docs/en/v6/getting-started/concepts#index-routes).
```js
  <div className='flex flex-col min-h-screen'>
    <Header />
    <div className="flex-grow">
      <Routes>
        <Route path="/" element={ <Guard /> }>
          <Route index element={ <Home /> } />
          <Route path='protected' element={ <Protected /> } />
        </Route>
        <Route path='/login' element={ <Login /> } />
        <Route path="/welcome" element={ <Welcome /> } />
      </Routes>
    </div>
    <Footer />
  </div>
```

## 3 - server side API for authentication

- Install the packages: `npm install express cors` (json-parser is included).

- Define `server.cjs` (due to package.json definition of "type": "module") with a basic example of `express` server.
```js
const express = require('express')
const cors =  require('cors')
const app = express();
const jsonParser = express.json();
app.use(cors);
app.use(jsonParser);

const port = 3000

app.get('/api', (req, res) => {
  res.status(200).json({
    message: "Hello API!"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

- Add a `POST` for endpoint `/api/login` that returns the JWT token (fake or not) if the payload matches with a registered user. The API sets also a cookie with the token. Add also `/api/logout` endpoint. In the application, I defined a fake user (see above) and the API returns a fake token.

- launch the server part with `npm run server` (see the definition on package.json).

## 4 - Redux store (RTK Query)

- Install the packages: `npm install react-redux @reduxjs/toolkit`

- Add the slices: `apiSlice` and `userSlice`. The first one is used for API (hence the name), i.e. the `POST` calls for logging in and out. The latter is used for storing the user data (username and token, in this example), thanks to the mutation called setCredentials. 

- Add the `store.js`: set the two reducers (from apiSlice and from userReducer) and the middleware for apiSlice.middleware. Note that the "standard" Slice directly exports the reducers (and separately the actions) while the apiSlice don't. 

- Add the `<Provider store={store}>` to the `main.jsx` (wrapping the `<BrowserRouter>`). 

- Define the hook `useAuth` for getting the user data. Here a [`useMemo`](https://reactjs.org/docs/hooks-reference.html#usememo) hook is used (This optimization helps to avoid expensive calculations on every render). 

- Within the `Login.jsx` page we'll call the hook `login` (thanks to `useLoginMutation` defined in apiSlice) and we'll set the result by the `setCredentials` hook. (And similar for logout). By using `unwrap()` on the mutation, we can access the error or success payload immediately after the mutation.





## Final remarks
For further details and examples, see the Redux/Redux Toolkit/RTKQuery/ documentation, and in particular [this example](https://redux-toolkit.js.org/rtk-query/usage/examples#authentication).

If the server does not respond (or send an error status code), you can include some additional information to the response. See [here](https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#adding-meta-information-to-queries) for more details.

### Folder structure
In more complicated projects, file structure organization is very important in order to save every file in the "rigth place". Most Redux developers tend to use:

- **Rails-style**: separate folders for “actions”, “constants”, “reducers”, “containers”, and “components”
- **"Feature folders"** / "Domain"-style : separate folders per feature or domain, possibly with sub-folders per file type
- **"Ducks/Slices"**: similar to domain style, but explicitly tying together actions and reducers, often by defining them in the same file.

In the future projects, I will implement one of these (not yet decided!).

More info on this [this page](https://redux.js.org/faq/code-structure#what-should-my-file-structure-look-like-how-should-i-group-my-action-creators-and-reducers-in-my-project-where-should-my-selectors-go)

More info on [Ducks](https://github.com/erikras/ducks-modular-redux).


