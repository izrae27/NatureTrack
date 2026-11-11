import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useFavorites } from '../context/FavoritesContext.jsx';
import ObservationGrid from '../components/ObservationGrid.jsx';
import EmptyState from '../components/EmptyState.jsx';

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <section className="favorites-page">
      <div className="favorites-heading">
        <span className="section-label">YOUR COLLECTION</span>

        <h1>
          <Heart size={28} />
          My Favorites
        </h1>

        <p>
          Your saved wildlife and plant observations in one place.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <EmptyState
            title="No favorites yet"
            message="Explore observations and save the ones you want to keep."
          />

          <Link to="/" className="explore-link">
            Explore Observations
          </Link>
        </div>
      ) : (
        <>
          <p className="results-count">
            {favorites.length} saved observation(s)
          </p>

          <ObservationGrid observations={favorites} />
        </>
      )}
    </section>
  );
}

export default Favorites;
