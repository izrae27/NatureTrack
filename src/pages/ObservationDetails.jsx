
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  MapPin,
  CalendarDays,
  User,
} from 'lucide-react';

import { fetchObservationById } from '../services/inatApi.js';
import { useFavorites } from '../context/FavoritesContext.jsx';

import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import EmptyState from '../components/EmptyState.jsx';
import PhotoCredit from '../components/PhotoCredit.jsx';

function ObservationDetails() {
  const { id } = useParams();

  const [observation, setObservation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    let ignore = false;

    async function loadObservation() {
      setIsLoading(true);
      setError('');

      try {
        const data = await fetchObservationById(id);

        if (ignore) return;

        const result = data.results?.[0];

        if (!result) {
          setObservation(null);
        } else {
          setObservation(result);
        }
      } catch {
        if (ignore) return;

        setError(
          'We could not load this observation. Please try again.'
        );
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadObservation();

    return () => {
      ignore = true;
    };
  }, [id, retryCount]);

  if (isLoading) {
    return <Loading message="Loading observation details..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => setRetryCount((current) => current + 1)}
      />
    );
  }

  if (!observation) {
    return (
      <EmptyState
        title="Observation not found"
        message="This observation may no longer be available."
      />
    );
  }

  const taxon = observation.taxon;
  const photo = observation.photos?.[0]?.url?.replace(
  '/square.',
  '/large.'
);
  const saved = isFavorite(observation.id);

  const commonName =
    taxon?.preferred_common_name || 'Unknown species';

  const scientificName =
    taxon?.name || 'Scientific name unavailable';

  return (
    <section className="details-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={18} />
        Back to Discover
      </Link>

      <div className="details-container">
        <div className="details-image-container">
          {photo ? (
            <img
              src={photo}
              alt={commonName}
              className="details-image"
            />
          ) : (
            <div className="image-placeholder">
              No image available
            </div>
          )}

          <PhotoCredit
            photo={observation.photos?.[0]}
            observationUrl={observation.uri}
          />
        </div>

        <div className="details-information">
          <span className="taxon-category">
            {taxon?.iconic_taxon_name || 'Wildlife'}
          </span>

          <h1>{commonName}</h1>
          <p className="scientific-name">{scientificName}</p>

          <button
            type="button"
            className={`favorite-button details-favorite ${
              saved ? 'saved' : ''
            }`}
            onClick={() => toggleFavorite(observation)}
          >
            <Heart
              size={19}
              fill={saved ? 'currentColor' : 'none'}
            />
            {saved ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>

          <div className="details-divider" />

          <h2>Observation Information</h2>

          <div className="detail-item">
            <MapPin size={19} />
            <div>
              <strong>Location</strong>
              <p>
                {observation.place_guess || 'Location unavailable'}
              </p>
            </div>
          </div>

          <div className="detail-item">
            <CalendarDays size={19} />
            <div>
              <strong>Date Observed</strong>
              <p>{observation.observed_on || 'Date unavailable'}</p>
            </div>
          </div>

          <div className="detail-item">
            <User size={19} />
            <div>
              <strong>Observer</strong>
              <p>
                {observation.user?.login || 'Unknown observer'}
              </p>
            </div>
          </div>

          <div className="detail-item">
            <div>
              <strong>Taxonomic Category</strong>
              <p>
                {taxon?.iconic_taxon_name || 'Not specified'}
              </p>
            </div>
          </div>

          {observation.uri && (
            <a
              href={observation.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              View original observation on iNaturalist
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default ObservationDetails;
