import { getAuth } from "firebase/auth";
import "./App.css";
import app from "./firebase.init";

const auth = getAuth(app);

function App() {
  const handleEmailBlur = (e) =>{
    console.log(e.target.value);
  }
  const handlePasswordBlur = (e) =>{
    console.log(e.target.value);
  }


  return (
    <div className="form">
      <h2 className="header">Login Form</h2>
      <input onBlur={handleEmailBlur} type="email" name="email" placeholder="Enter Email Here" />
      <input onBlur={handlePasswordBlur} type="password" name="" placeholder="Enter Password Here" />
      <button className="btn">Login</button>
      <button className="btn">Sing In</button>
    </div>
  );
}

export default App;
