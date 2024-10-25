import React from 'react';

export default function Navbar({ links }) {
  return (
    <nav>
      <ul>
        {links.map(link => (
          <li key={link.key}>{link}</li>
        ))}
      </ul>
    </nav>
  );
}
