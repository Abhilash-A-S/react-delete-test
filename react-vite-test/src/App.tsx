import { useEffect, useState } from 'react'

function ReviewTest() {
  const [count, setCount] = useState(0)
  const [username, setUsername] = useState('')

  // ISSUE 1:
  // Interval is created but never cleaned up.
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Polling...')
    }, 1000)
  }, [])
console.log('test hahahahha')
  // ISSUE 2:
  // Effect uses count but dependency array is empty.
  useEffect(() => {
    console.log('Current count:', count)
  }, [])

  // ISSUE 3:
  // Hardcoded secret.
  const apiKey = 'sk_test_123456789_super_secret_key'

  // ISSUE 4:
  // Direct DOM manipulation in React.
  const updateMessage = () => {
    const element = document.getElementById('review-message')

    if (element) {
      element.innerHTML = username
    }
  }

  // ISSUE 5:
  // Fetch response/error handling is missing.
  const loadUsers = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    )

    const users = await response.json()
    console.log(users)
  }

  return (
    <div>
      <h1>PR Reviewer Test</h1>

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>

      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter name"
      />

      <button onClick={updateMessage}>
        Update Message
      </button>

      <button onClick={loadUsers}>
        Load Users
      </button>

      <div id="review-message" />

      <p>{apiKey}</p>
    </div>
  )
}

export default ReviewTest