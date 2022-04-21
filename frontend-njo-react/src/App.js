import logo from "./logo.svg";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Login from "./Components/Login/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import { Route, Switch } from "react-router-dom";
import Sessions from "./Components/Sessions/Sessions";
import Welcomekit from "./Components/Welcomekit/Welcomekit";
import Feedback from "./Components/Feedback/Feedback";
import Notices from "./Components/Notices/Notices";
import Schedules from "./Components/Schedules/Schedules";
import Documents from "./Components/Documents/Documents";
import Docupload from "./Components/Docupload/Docupload";
import UserInformation from "./Components/UserInformation/UserInformation";
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/sessions" component={Sessions} />
        <Route exact path="/welcomekit" component={Welcomekit} />
        <Route exact path="/feedback" component={Feedback} />
        <Route exact path="/notices" component={Notices} />
        <Route exact path="/userinfo" component={UserInformation} />
        <Route exact path="/documents" component={Documents} />
        <Route exact path="/schedules" component={Schedules} />
        <Route exact path="/docupload" component={Docupload} />
        
        <Login />
      </Switch>
    </>
  );
}

export default App;
