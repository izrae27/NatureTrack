
import { Link } from 'react-router-dom';
import { Heart, MapPin, CalendarDays } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext.jsx';
import PhotoCredit from './PhotoCredit.jsx';

function ObservationCard({ observation }) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const taxon = observation.taxon;
  const photo = observation.photos?.[0]?.url?.replace(
  '/square.',
  '/large.'
);

  const commonName =
    taxon?.preferred_common_name || 'Unknown species';

  const scientificName =
    taxon?.name || 'Scientific name unavailable';

  const saved = isFavorite(observation.id);

  return (
    <article className="observation-card">
      <div className="card-image-container">
        {photo ? (
          <img
            src={photo}
            alt={commonName}
            className="card-image"
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">
            No image available
          </div>
        )}

        <button
          type="button"
          className={`favorite-button ${saved ? 'saved' : ''}`}
          onClick={() => toggleFavorite(observation)}
          aria-label={
            saved ? 'Remove from favorites' : 'Add to favorites'
          }
        >
          <Heart size={20} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <PhotoCredit
        photo={observation.photos?.[0]}
        observationUrl={observation.uri}
      />

      <div className="card-content">
        <span className="taxon-category">
          {taxon?.iconic_taxon_name || 'Wildlife'}
        </span>

        <h3>{commonName}</h3>

        <p className="scientific-name">
          {scientificName}
        </p>

        <div className="observation-meta">
          <span>
            <MapPin size={15} />
            {observation.place_guess || 'Location unavailable'}
          </span>

          <span>
            <CalendarDays size={15} />
            {observation.observed_on || 'Date unavailable'}
          </span>
        </div>

        <Link
          to={`/observation/${observation.id}`}
          className="details-link"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export default ObservationCard;
