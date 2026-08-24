import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  const unusedMessage = "This variable is never used";

  useEffect(() => {
    console.log("Loading users...");

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Timer running");
    }, 1000);
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>React Reviewer Test</h1>

      <div>
        <button onClick={() => setCount(count + 1)}>
          Count: {count}
        </button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search users"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div>
        {filteredUsers.map((user, index) => (
          <div key={index}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          document.getElementById("message").innerHTML =
            "<strong>Hello from React</strong>";
        }}
      >
        Change Message
      </button>

      <div id="message">Original message</div>
    </div>
  );
}

export default App;