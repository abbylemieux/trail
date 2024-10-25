import { Link } from 'react-router-dom';
import Navbar from './navbar';

export default function Nav() {
    return(
        <Navbar
            links={[
                <Link
                key={1}  
                to="/">
                    
                </Link>,
                <><Link
                    key={2}
                    to="/register">

                </Link><Link key={3}
                    to="sign-in">

                    </Link></>
               
            ]}
            />
    );
}