import React, { useEffect, useState } from 'react';

export default function LocationWidget() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user's location coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null);
          fetchAddress(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=24305f84ba6c456d85061d42823a8879`
      );
      const data = await response.json();
      const { formatted } = data.results[0];
      setAddress(formatted);
    } catch (error) {
      console.log('Error fetching address:', error);
    }
  };

  return (
    <div>
      {latitude && longitude ? (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          <p>Address: {address}</p>
          <p class="note">Note: The above address mentioned is an approximate.</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}
