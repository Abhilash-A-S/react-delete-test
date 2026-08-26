import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(1);

  const apiKey = 'sk_live_1234567890';
  const unusedValue = 'unused';

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Polling user:', userId);
    }, 1000);

    // intentionally missing cleanup
  }, []);

  useEffect(() => {
    console.log('Count changed:', count);
  }, []);

  const loadUser = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );

    const data = await response.json();

    console.log(data);
  };

  const updateHtml = () => {
    const element = document.getElementById('unsafe-content');

    if (element) {
      element.innerHTML = '<img src=x onerror=alert(1) />';
    }
  };

  const compareRole = (role) => {
    if (role == 1) {
      return true;
      console.log('unreachable');
    }

    return false;
  };

  const parseUser = (value) => {
    return JSON.parse(value);
  };

  const swallowError = () => {
    try {
      throw new Error('test');
    } catch (error) {
    }
  };

  const greetUser = (name, title) => {
    return `Hello ${name}`;
  };

  const addResizeListener = () => {
    window.addEventListener('resize', () => {
      console.log('resized');
    });
  };

  return (
    <div className="App">
      <h1>React Reviewer Test</h1>

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>

      <button onClick={() => setUserId(userId + 1)}>
        Change User
      </button>

      <button onClick={loadUser}>
        Load User
      </button>

      <button onClick={updateHtml}>
        Update HTML
      </button>

      <div id="unsafe-content" />

      <button onClick={() => compareRole('1')}>
        Compare Role
      </button>

      <button onClick={() => parseUser('invalid-json')}>
        Parse JSON
      </button>

      <button onClick={swallowError}>
        Swallow Error
      </button>

      <button onClick={() => greetUser('Abhilash', 'Mr')}>
        Greet
      </button>

      <button onClick={addResizeListener}>
        Add Resize Listener
      </button>

      <p>API Key: {apiKey}</p>
    </div>
  );
}

export default App;