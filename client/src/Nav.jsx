import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Nav() {
  return (
    <Navbar
      links={[
        <Link key={1} className="nav" to="/">Home</Link>,
        <Link key={2} className="reg" to="/register">Register</Link>,
        <Link key={3} className="log" to="/login">Login</Link>,
      ]}
    />
  );
}
