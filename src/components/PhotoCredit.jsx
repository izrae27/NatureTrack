function PhotoCredit({ photo, observationUrl }) {
  if (!photo) return null;

  return (
    <div className="photo-credit">
      <p>
        <strong>Photo credit:</strong>{' '}
        {photo.attribution || 'Attribution unavailable'}
      </p>

      {photo.license_code && (
        <p>
          <strong>License:</strong>{' '}
          {photo.license_code.toUpperCase()}
        </p>
      )}

      {observationUrl && (
        <a
          href={observationUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Original source on iNaturalist
        </a>
      )}
    </div>
  );
}

export default PhotoCredit;
