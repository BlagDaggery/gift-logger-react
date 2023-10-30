import { useState, useEffect } from 'react';
import Recipient from '../Recipient/Recipient';
import './App.css';

function App() {
  const [recipients, setRecipients] = useState([{
    id: 0,
    name: "Blaine",
    gifts: [{ id: 0, giftTitle: 'blah', giftType: 'blah', reaction: 'neutral' }]
  }]);

  useEffect(() => {
    async function getRecipients() {
      const response: Response = await fetch('http://localhost:3000/recipients?_embed=gifts');
      const data = await response.json();
      console.log(response);
      console.log(data);
      setRecipients(data);
    }

    getRecipients();
  }, []);

  return (
    <>
      <h1>Gift Logger</h1>
      {recipients.map(recipient => {
        return <Recipient key={recipient.id} id={recipient.id} name={recipient.name} gifts={recipient.gifts} />
      })}
    </>
  )
}

export default App;
