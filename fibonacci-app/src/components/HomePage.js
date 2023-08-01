import { createBrowserHistory } from '@remix-run/router';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [integerValue, setIntegerValue] = useState('');
  const navigate = useNavigate();
  const history = createBrowserHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const n = parseInt(integerValue, 10);
    if (!isNaN(n) && n > 0) {
      navigate(`/result/${n}`)
      history.push(`/result/${n}`)
    }
  };

  return (
    <div>
      <h1>Enter a number to see the Fibonacci Sequence up to that number:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={integerValue}
          onChange={(e) => setIntegerValue(e.target.value)}
        />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
};

export default HomePage;