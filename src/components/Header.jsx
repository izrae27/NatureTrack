import { NavLink, Link } from 'react-router-dom';
import { Leaf, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext.jsx';

function Header() {
  const { favorites } = useFavorites();

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="brand">
          <Leaf size={28} />
          <span>
            Nature<span className="brand-highlight">Track</span>
          </span>
        </Link>

        <nav className="navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Discover
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <Heart size={17} />
            Favorites
            <span className="favorite-count">
              {favorites.length}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
