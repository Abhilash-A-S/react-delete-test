import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [userId, setUserId] = useState(1)
  const [profile, setProfile] = useState(null)

  // Intentional hardcoded secrets
  const apiKey = 'sk_live_super_secret_123456'
  const databasePassword = 'Admin@123456'

  // Intentional unused variables
  const unusedValue = 'unused'
  const unusedCounter = 100

  // Missing dependency + missing interval cleanup
  useEffect(() => {
    setInterval(() => {
      console.log('Polling user:', userId)
    }, 3000)
  }, [])

  // Missing dependency
  useEffect(() => {
    console.log('Count changed:', count)
  }, [])

  // Global event listener without cleanup
  useEffect(() => {
    window.addEventListener('resize', () => {
      console.log('Window resized')
    })
  }, [])

  const loadUser = async () => {
    // Fetch without checking response.ok
    const response = await fetch(`/api/users/${userId}`)

    // Consuming response immediately
    const data = await response.json()

    console.log('Loaded user:', data)

    setProfile(data)
  }

  const saveUser = async () => {
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      })
    } catch (error) {
      // Intentional empty catch
    }
  }

  const updateUnsafeContent = (html) => {
    // Direct DOM access
    const element = document.getElementById('unsafe-content')

    // Unsafe HTML injection
    element.innerHTML = html
  }

  const parseUserData = (value) => {
    // JSON.parse without handling
    return JSON.parse(value)
  }

  const checkRole = (role) => {
    // Loose equality
    if (role == 1) {
      return 'ADMIN'

      // Unreachable code
      console.log('This should never execute')
    }

    return 'USER'
  }

  const calculateTotal = (price, tax, discount) => {
    const subtotal = price + tax

    // Intentional redundant variable
    const total = subtotal

    if (discount > 0) {
      return subtotal - discount
    }

    return subtotal
  }

  const greetUser = (name, title, department) => {
    // title and department intentionally unused
    return `Hello ${name}`
  }

  const dangerousEval = (value) => {
    // Dangerous dynamic execution
    return eval(value)
  }

  const triggerTimer = () => {
    // Timer handle not retained
    setInterval(() => {
      console.log('Background task running')
    }, 5000)
  }

  const attachListener = () => {
    // Listener never removed
    document.addEventListener('click', () => {
      console.log('Document clicked')
    })
  }

  const brokenAsyncFlow = async () => {
    // Promise started but result ignored
    fetch('/api/audit')

    // Suspicious error handling
    try {
      const response = await fetch('/api/data')
      return await response.json()
    } catch (error) {
      console.log(error)
      return null
    }
  }

  const mutateProfile = () => {
    // Direct state object mutation
    if (profile) {
      profile.name = 'Changed'
      setProfile(profile)
    }
  }

  const duplicateCalculation = () => {
    const first = count * 2
    const second = count * 2

    console.log(first)
    console.log(second)
  }

  const debuggerExample = () => {
    debugger

    console.log('debugging')
  }

  const unsafeExternalLink = () => {
    window.open('https://example.com', '_blank')
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img
            src={heroImg}
            className="base"
            width="170"
            height="179"
            alt=""
          />

          <img
            src={reactLogo}
            className="framework"
            alt="React logo"
          />

          <img
            src={viteLogo}
            className="vite"
            alt="Vite logo"
          />
        </div>

        <div>
          <h1>Reviewer Stress Test</h1>

          <p>
            Count: {count}
          </p>

          <p>
            User: {userId}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>

        <button
          type="button"
          onClick={() => setUserId(userId + 1)}
        >
          Change User
        </button>

        <button
          type="button"
          onClick={loadUser}
        >
          Load User
        </button>

        <button
          type="button"
          onClick={saveUser}
        >
          Save User
        </button>

        <button
          type="button"
          onClick={() =>
            updateUnsafeContent(
              '<img src=x onerror=alert("xss") />',
            )
          }
        >
          Unsafe DOM Update
        </button>

        <button
          type="button"
          onClick={() => parseUserData('invalid-json')}
        >
          Parse JSON
        </button>

        <button
          type="button"
          onClick={() => checkRole('1')}
        >
          Check Role
        </button>

        <button
          type="button"
          onClick={() => calculateTotal(100, 10, 5)}
        >
          Calculate
        </button>

        <button
          type="button"
          onClick={() =>
            greetUser(
              'Abhilash',
              'Mr',
              'Engineering',
            )
          }
        >
          Greet
        </button>

        <button
          type="button"
          onClick={() => dangerousEval('2 + 2')}
        >
          Eval
        </button>

        <button
          type="button"
          onClick={triggerTimer}
        >
          Start Timer
        </button>

        <button
          type="button"
          onClick={attachListener}
        >
          Add Listener
        </button>

        <button
          type="button"
          onClick={brokenAsyncFlow}
        >
          Async Flow
        </button>

        <button
          type="button"
          onClick={mutateProfile}
        >
          Mutate Profile
        </button>

        <button
          type="button"
          onClick={duplicateCalculation}
        >
          Duplicate Calculation
        </button>

        <button
          type="button"
          onClick={debuggerExample}
        >
          Debug
        </button>

        <button
          type="button"
          onClick={unsafeExternalLink}
        >
          Open Link
        </button>

        <div id="unsafe-content"></div>

        {profile && (
          <div>
            <p>{profile.name}</p>
            <p>{profile.email}</p>
          </div>
        )}

        <p>{databasePassword}</p>
      </section>
    </>
  )
}

export default App