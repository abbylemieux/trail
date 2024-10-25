const Navbar = ({ links }) => {
  return (
    <nav>
      <ul>
        {links.map(link => (
          <li key={link.key}>{link}</li> // Render each link as a list item
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
