const express = require('express')
const cors = require('cors');

const app = express();
const jsonParser = express.json();
app.use(cors());
app.use(jsonParser);

const PORT = 3000

app.use( (req,res,next) => {
  console.log(req)
  next();
})


app.get('/api', (req, res) => {
  res.status(200).json({
    message: "Hello API!"
  })
})

app.post('/api/login', (req,res) => {
  const {user: username, password} = req.body;
  console.log(username,password)
  if (username === "andrea" && password === "12354") {
    const token = `sfs2345afaf53232a.fsfa2342fw2565a662fawef.few342342fafawef`;
    res.cookie('__jwt_token', token, {maxAge: 1000*60*60*24, httpOnly: true});
    res.status(201).json({
      message: `Welcome ${username}!`,
      token
    })
  } else res.status(401).json({
    message: `Unauthorized access`
  })
});

app.post('/api/logout', (req,res) => {
  res.cookie('__jwt_token', '', {maxAge: 0, httpOnly: true});
  res.status(201).json({
    message: `Goodbye!`
  })
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})