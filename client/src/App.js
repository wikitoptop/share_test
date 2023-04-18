import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/about/About";
import Prebook from "./pages/prebook/Prebook";
import Admin from "./pages/admin/Admin";
import Profile from "./pages/profile/Profile";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/write">{user ? <Write /> : <Register />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
        <Route path="/about">{user ? <About /> : <Register />}</Route>
        <Route path="/prebook">{user ? <Prebook /> : <Register />}</Route>
        <Route path="/admin">{user ? <Admin /> : <Register />}</Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
        <Route path="/profile/:id">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
