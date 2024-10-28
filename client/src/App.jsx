// import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import "./App.css";
import "./landingPage.css";

function App() {
  return (
    <>
      <div>
        <Outlet />
        {/* <Nav /> */}
      </div>
    </>
    
  );

}

export default App;
