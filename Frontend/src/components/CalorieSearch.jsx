import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx'; 

const CalorieSearch = () => {
  const { user } = useAuth();
  const [calories, setCalories] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!calories) return alert('Please enter calories');
    setLoading(true);
    try {
      const res = await fetch(`/api/searchByCalories?calories=${calories}`);
      if (!res.ok) throw new Error('Failed to fetch foods');
      const data = await res.json();
      setResults(data);
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (item) => {
    if (!user || !user.token) {
      alert('User is not logged in');
      return;
    }

    try {
      const res = await fetch('/api/email/food_service/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          id: item.id,
          name: item.title,
          image: item.image,
          price: item.price || null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.text();
        alert('Failed to send request: ' + errorData);
        return;
      }

      const data = await res.json();
      alert(data.message || `${item.title} request sent to FoodMine!`);
    } catch (error) {
      alert('Error sending request: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
        🍽️ Find Foods by Calories
      </h2>

      <p
        style={{
          fontWeight: 'bold',
          color: '#6b46c1',
          textAlign: 'center',
          marginBottom: '1rem',
          fontSize: '1.2rem',
        }}
      >
        💪 Fitness-Freak?
        <br />
        <span style={{ color: '#2d3748' }}> Search for foods based on calories!</span>
      </p>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <input
          type="number"
          placeholder="Enter Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          style={{
            marginRight: '0.5rem',
            padding: '0.6rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '200px',
          }}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: loading ? '#ccc' : '#6b46c1',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
        }}
      >
        {results.map((item) => (
          <div
            key={item.id}
            style={{
              width: '260px',
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '1rem',
              backgroundColor: '#fff',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                height: '160px',
                objectFit: 'cover',
                borderRadius: '10px',
                marginBottom: '1rem',
              }}
            />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>{item.title}</h3>
            <p><strong>Calories:</strong> {item.calories} kcal</p>
            <p><strong>Protein:</strong> {item.protein}</p>
            <p><strong>Fat:</strong> {item.fat}</p>
            <button
              onClick={() => handleAddToCart(item)}
              style={{
                marginTop: '0.8rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#6b46c1',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Request Item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalorieSearch;
