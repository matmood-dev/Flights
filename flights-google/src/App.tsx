// App.js
import { useState } from 'react';
import FlightSearchForm from './components/FlightSearchForm';
import FlightResults from './components/FlightResults';
import styles from './App.module.css';

const App = () => {
  const [flightData, setFlightData] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <FlightSearchForm onResults={setFlightData} />
      </div>
      <div className={styles.rightPane}>
        {flightData && <FlightResults data={flightData.data} />}
      </div>
    </div>
  );
};

export default App;
