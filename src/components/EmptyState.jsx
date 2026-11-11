import { SearchX } from 'lucide-react';

function EmptyState({
  title = 'No observations found',
  message = 'Try changing your search or filters.',
}) {
  return (
    <div className="empty-state">
      <SearchX size={42} />

      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
