import { useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button';

export const getGoogleUrl = (from: string) => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const options = {
    redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT as string,
    client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};

function App() {
  const [nodeVersion, setNodeVersion] = useState('');

  const from = window.location.pathname;

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_ENDPOINT + '/env', {
      credentials: 'include',
    })
    .then(resp => resp.text())
    .then(txt => setNodeVersion(txt))
  }, [])

  return (
    <>
    <h2>{nodeVersion || 'not authorized'}</h2>
    <Button asChild>
      <a href={getGoogleUrl(from)} target="_blank">Google login</a>
    </Button>
    <Button>tailwind</Button>
    </>
  )
}

export default App
