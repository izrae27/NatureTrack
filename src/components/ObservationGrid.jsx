import ObservationCard from './ObservationCard.jsx';

function ObservationGrid({ observations }) {
  return (
    <div className="observation-grid">
      {observations.map((observation) => (
        <ObservationCard
          key={observation.id}
          observation={observation}
        />
      ))}
    </div>
  );
}

export default ObservationGrid;
