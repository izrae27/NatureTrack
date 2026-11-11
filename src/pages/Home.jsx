
import { useEffect, useState } from 'react';

import {
  fetchObservations,
  searchTaxa,
} from '../services/inatApi.js';

import SearchBar from '../components/SearchBar.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import ObservationGrid from '../components/ObservationGrid.jsx';
import Pagination from '../components/Pagination.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import EmptyState from '../components/EmptyState.jsx';

const PER_PAGE = 12;
const MAX_API_RESULTS = 10000;
const MAX_PAGES = Math.floor(MAX_API_RESULTS / PER_PAGE);

function Home() {
  const [observations, setObservations] = useState([]);
  const [category, setCategory] = useState('');
  const [taxonId, setTaxonId] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [noTaxonMatch, setNoTaxonMatch] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Retrieve observations whenever filters, sorting, or page change.
  useEffect(() => {
    let ignore = false;

    async function loadObservations() {
      setIsLoading(true);
      setError('');

      try {
        const data = await fetchObservations({
          page,
          perPage: PER_PAGE,
          taxonId,
          iconicTaxon: category,
          sortBy,
        });

        if (ignore) return;

        setObservations(data.results || []);
        setTotalResults(data.total_results || 0);
      } catch {
        if (ignore) return;

        setError(
          'We could not retrieve observations. Please check your connection and try again.'
        );
        setObservations([]);
        setTotalResults(0);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadObservations();

    return () => {
      ignore = true;
    };
  }, [page, taxonId, category, sortBy, retryCount]);

  // Search for a species, then retrieve its observations.
  async function handleSearch(searchTerm) {
    setIsSearching(true);
    setError('');
    setNoTaxonMatch(false);

    try {
      const taxa = await searchTaxa(searchTerm);

      if (taxa.length === 0) {
        setTaxonId('');
        setObservations([]);
        setTotalResults(0);
        setNoTaxonMatch(true);
        return;
      }

      setPage(1);
      setTaxonId(String(taxa[0].id));
    } catch {
      setError('Species search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  }

  function handleClearSearch() {
    setTaxonId('');
    setPage(1);
    setNoTaxonMatch(false);
    setError('');
  }

  function handleCategoryChange(value) {
    setCategory(value);
    setPage(1);
  }

  function handleSortChange(event) {
    setSortBy(event.target.value);
    setPage(1);
  }

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRetry() {
    setRetryCount((current) => current + 1);
  }

  const totalPages = Math.min(
    Math.ceil(totalResults / PER_PAGE),
    MAX_PAGES
  );

  return (
    <section className="home-page">
      <div className="hero-section">
        <span className="hero-label">
          EXPLORE THE NATURAL WORLD
        </span>

        <h1>
          Discover the <span>Beauty of Biodiversity</span>
        </h1>

        <p>
          Explore wildlife and plant observations from around
          the world, all in one place.
        </p>

        <SearchBar
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />
      </div>

      <section className="discover-section">
        <div className="section-heading">
          <div>
            <span className="section-label">DISCOVER</span>
            <h2>Explore Observations</h2>
          </div>

          <div className="observation-controls">
            <CategoryFilter
              value={category}
              onChange={handleCategoryChange}
            />

            <label className="sort-filter">
              <span>Sort by</span>

              <select
                value={sortBy}
                onChange={handleSortChange}
                aria-label="Sort observations"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </label>
          </div>
        </div>

        {!isLoading && !error && !noTaxonMatch && (
          <p className="results-count">
            {totalResults.toLocaleString()} observations found
          </p>
        )}

        {(isLoading || isSearching) && (
          <Loading
            message={
              isSearching
                ? 'Searching for species...'
                : 'Loading observations...'
            }
          />
        )}

        {!isLoading && !isSearching && error && (
          <ErrorMessage
            message={error}
            onRetry={handleRetry}
          />
        )}

        {!isLoading &&
          !isSearching &&
          !error &&
          noTaxonMatch && (
            <EmptyState
              title="Species not found"
              message="We couldn't find a matching species. Try another name."
            />
          )}

        {!isLoading &&
          !isSearching &&
          !error &&
          !noTaxonMatch &&
          observations.length === 0 && (
            <EmptyState />
          )}

        {!isLoading &&
          !isSearching &&
          !error &&
          observations.length > 0 && (
            <>
              <ObservationGrid observations={observations} />

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
      </section>
    </section>
  );
}

export default Home;
