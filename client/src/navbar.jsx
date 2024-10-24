export default function Nav({ links }) {
  return (
    <nav className="/">
      <div className="/">
        <div className="/">
          <ul className="/">
            {links.map((link) => link)}
          </ul>
        </div>
      </div>
    </nav>
  )
}