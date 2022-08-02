const express = require('express')

const app = express();
const jsonParser = express.json();
app.use(jsonParser);

const PORT = 3000

app.get('/api', (req, res) => {
  res.status(200).json({
    message: "Hello API!"
  })
})

app.post('/api/login', (req,res) => {
  const {user, password} = req.body;
  console.log(user,password)
  if (user === "andrea" && password === "12354") {
    const token = `sfs2345afaf53232a.fsfa2342fw2565a662fawef.few342342fafawef`;
    res.cookie('__jwt_token', token, {maxAge: 1000*60*60*24, httpOnly: true});
    res.status(201).json({
      message: `Welcome ${user}!`,
      token
    })
  } else res.status(401).json({
    message: `Unauthorized access`
  })
});

app.post('/api/logout', (req,res) => {
  res.cookie('__jwt_token', token, {maxAge: 0, httpOnly: true});
  res.status(201).json({
    message: `Goodbye!`
  })
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})