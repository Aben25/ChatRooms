import logo from './logo.svg';
import './App.css';
import { AuthenticatedApp } from "./components/AuthenticatedApp";
import { UnauthenticatedApp } from "./components/UnauthenticatedApp";
import { useAuth } from "./hooks/useAuth";

function App() {
const { user } = useAuth();

return (
  <div className="container">
    <h1>💬 Chat Room</h1>
    {user ? <AuthenticatedApp user={user} /> : <UnauthenticatedApp />}
  </div>
);
}

export default App;
