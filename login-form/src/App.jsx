import "./App.css";

function App() {
  return (
    <div className="app-container">
      <p>Hello, Welcome to my website</p>
      <div>
        <input placeholder="Email" className="login-input" />
      </div>
      <div>
        <input placeholder="Password" className="login-input" />
      </div>
      <button className="login-button">Login</button>
      <button className="login-button">Sign up</button>
    </div>
  );
}

export default App;
