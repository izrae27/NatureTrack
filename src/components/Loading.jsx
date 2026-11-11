import { LoaderCircle } from 'lucide-react';

function Loading({ message = 'Loading observations...' }) {
  return (
    <div className="loading-state" role="status">
      <LoaderCircle className="loading-spinner" size={32} />
      <p>{message}</p>
    </div>
  );
}

export default Loading;
