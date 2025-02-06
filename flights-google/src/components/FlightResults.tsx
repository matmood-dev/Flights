import styles from '../styles/FlightResults.module.css';

const FlightResults = ({ data }: { data: any }) => {
  if (!data || !data.itineraries || data.itineraries.length === 0) {
    return <p className={styles.noResults}>No flights found.</p>;
  }

  return (
    <div className={styles.resultsContainer}>
      <h2>Flight Results</h2>
      {data.itineraries.map((itinerary: any, index: number) => (
        <div key={index} className={styles.flightCard}>
          <p>🛫 {itinerary.legs[0].origin.city} ({itinerary.legs[0].origin.displayCode}) → 🛬 {itinerary.legs[0].destination.city} ({itinerary.legs[0].destination.displayCode})</p>
          <p>🕒 Duration: {itinerary.legs[0].durationInMinutes} minutes</p>
          <p>💲 Price: {itinerary.price.formatted}</p>
        </div>
      ))}
    </div>
  );
};

export default FlightResults;
