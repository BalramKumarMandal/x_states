import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [message, setMessage] = useState('');

  // Fetch countries on component mount
  useEffect(() => {
    axios
      .get('https://crio-location-selector.onrender.com/countries')
      .then((response) => setCountries(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`,
        )
        .then((response) => setStates(response.data))
        .catch((error) => console.error(error));
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`,
        )
        .then((response) => setCities(response.data))
        .catch((error) => console.error(error));
    }
  }, [selectedState]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState(''); // Reset state and city selection
    setSelectedCity('');
    setStates([]);
    setCities([]);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
    setCities([]);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setMessage(
      `You Selected ${e.target.value}, ${selectedState}, ${selectedCountry}`,
    );
  };
  return (
    <div>
      <h2>Select Location</h2>

      {/* Country Dropdown */}
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* State Dropdown (Enabled after country selection) */}
      <select
        value={selectedState}
        onChange={handleStateChange}
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* City Dropdown (Enabled after state selection) */}
      <select
        value={selectedCity}
        onChange={handleCityChange}
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Display Selected Location */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
