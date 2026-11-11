
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const FavoritesContext = createContext(null);

const STORAGE_KEY = 'naturetrack-favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem(STORAGE_KEY);
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(observation) {
    setFavorites((current) => {
      const alreadySaved = current.some(
        (item) => item.id === observation.id
      );

      if (alreadySaved) return current;

      return [...current, observation];
    });
  }

  function removeFavorite(observationId) {
    setFavorites((current) =>
      current.filter((item) => item.id !== observationId)
    );
  }

  function isFavorite(observationId) {
    return favorites.some((item) => item.id === observationId);
  }

  function toggleFavorite(observation) {
    if (isFavorite(observation.id)) {
      removeFavorite(observation.id);
    } else {
      addFavorite(observation);
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      'useFavorites must be used inside FavoritesProvider.'
    );
  }

  return context;
}
