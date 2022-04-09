import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./App.css";
import app from "./firebase.init";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  };
  const handleRegistered = (e) => {
    setRegistered(e.target.checked);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    }
    setValidated(true);
    setError("");

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
      .then(result =>{
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        setError(error.message);
      });
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
    }
    e.preventDefault();
    console.log("submit", email, password);
  };

  return (
    <div>
      <div className="submit w-50 mx-auto mt-5">
        <h2 className="text-primary header">
          Please {registered ? "Log In" : 'Register'}!!!
        </h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePasswordBlur}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={handleRegistered}
              type="checkbox"
              label="Already Registered?"
            />
          </Form.Group>
          <p className="text-danger">{error}</p>
          <Button variant="primary" type="submit">
            {registered ? 'Log In' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
