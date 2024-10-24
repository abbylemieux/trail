import { Link } from 'react-router-dom';
import Navbar from './navbar';

export default function Nav() {
    return(
        <Navbar
            links={[
                <Link key={1} className="nav" to="/">
                    Home
                </Link>,
                <Link key={2} className="reg" to="/register">
                    Register
                </Link>
            ]}
            />
    );
}