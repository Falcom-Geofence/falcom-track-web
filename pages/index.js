import { useState } from 'react';

/**
 * A very simple admin dashboard page.  It provides a login form placeholder
 * (without any authentication logic) and a button to query the `/health`
 * endpoint of the backend API.  The base URL of the API can be supplied
 * via the `NEXT_PUBLIC_API_URL` environment variable when the app is built
 * or started; it defaults to `http://localhost:8000`.
 */
export default function Home() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiBase =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  async function checkHealth() {
    setLoading(true);
    setHealth(null);
    try {
      const res = await fetch(`${apiBase}/health`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setHealth(JSON.stringify(data));
    } catch (err) {
      setHealth(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Falcom Admin Dashboard</h1>

      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        style={{
          display: 'block',
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <input
        type="password"
        placeholder="Password"
        style={{
          display: 'block',
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <button
        style={{
          padding: '10px 16px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '30px',
        }}
        onClick={() => {
          /* placeholder login action */
        }}
      >
        Login
      </button>

      <hr />

      <h3>API Health Check</h3>
      <button
        onClick={checkHealth}
        disabled={loading}
        style={{
          padding: '8px 12px',
          backgroundColor: loading ? '#ccc' : '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'default' : 'pointer',
        }}
      >
        {loading ? 'Checking...' : 'Check /health'}
      </button>

      {health && (
        <pre
          style={{
            backgroundColor: '#f7f7f7',
            padding: '10px',
            borderRadius: '4px',
            marginTop: '15px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}
        >
          {health}
        </pre>
      )}
    </div>
  );
}
