import React from 'react';

export default function Navbar({ links }) {
const Navbar = ({ links }) => {
  return (
    <nav>
      <ul>
        {links.map(link => (
          <li key={link.key}>{link}</li>
        ))}
      </ul>
    <nav>
      <ul>
        {links.map(link => (
          <li key={link.key}>{link}</li> // Render each link as a list item
        ))}
      </ul>
    </nav>
  );
}

  );
};

export default Navbar;
