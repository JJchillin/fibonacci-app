import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NewPage = () => {
    const { n } = useParams();
    const [fibonacciList, setFibonacciList] = useState([]);

    const url = `http://localhost:5000/api/fibonacci/${n}`;
  fetch(url)
    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => setFibonacciList(data.fibonacciNumbers));
    }, [n]);
  
    return (
      <div>
        <h1>First {n} Fibonacci Numbers:</h1>
        <h2>{fibonacciList.join(', ')}</h2>
      </div>
    );
};

export default NewPage;