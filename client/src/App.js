import React, { useState, useEffect } from "react";

export const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : ''

function App() {
  const [name, setName] = useState("")
  useEffect(() => {
    fetch("/auth/whoami")
      .then(r => r.json())
      .then(data => {
        console.log(data)
        if (data.displayName)
          setName(data.displayName)
      })
      .catch(e => console.log(e));
  },[name]);
  return (
    <div>
      Hello{ name && `, ${name}`}
      <div>
        <a href={`${baseUrl}/auth/google`}>Login</a>
      </div>
      <div>
        <a href={`${baseUrl}/auth/logout`}>Logout</a>
      </div>
    </div>
  );
}

export default App;
