function Login(req, res) {
  console.log("login");
  res.sendStatus(201);
}

function Register(req, res) {
  console.log("register");
  res.sendStatus(201);
}

export default { Login, Register };
