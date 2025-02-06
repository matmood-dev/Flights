import { useState } from 'react';
import { fetchFlights } from '../api/flights';
import styles from '../styles/FlightSearchForm.module.css';

const FlightSearchForm = ({ onResults }: { onResults: (data: any) => void }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await fetchFlights(origin, destination, date);
      console.log('Complete API Response:', JSON.stringify(data, null, 2));
      onResults(data);
    } catch (err) {
      console.error('Search Form Error:', err);
      setError('Failed to fetch flights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Search Flights</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Origin (e.g., LAX)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination (e.g., LHR)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FlightSearchForm;
