import { AlertCircle, RefreshCw } from 'lucide-react';

function ErrorMessage({
  message = 'Something went wrong. Please try again.',
  onRetry,
}) {
  return (
    <div className="error-state" role="alert">
      <AlertCircle size={36} />

      <h3>Unable to load observations</h3>
      <p>{message}</p>

      {onRetry && (
        <button
          type="button"
          className="retry-button"
          onClick={onRetry}
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
