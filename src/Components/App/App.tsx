import { useState, useEffect } from 'react';
import giftProps from '../../Interfaces/interfaces';
import Recipient from '../Recipient/Recipient';
import './App.css';

interface recipientData {
    id: number,
    name: string,
    gifts: giftProps[]
}

function App() {
    const [recipients, setRecipients] = useState<recipientData[] | null>(null);

    useEffect(() => {
        async function getRecipients() {
            const response: Response = await fetch('http://localhost:3000/recipients?_embed=gifts');
            const data = await response.json();
            setRecipients(data);
        }

        getRecipients();
    }, []);

    return (
        <>
            <h1>Gift Logger</h1>
            {recipients && recipients.map(recipient => {
                return <Recipient key={recipient.id} id={recipient.id} name={recipient.name} gifts={recipient.gifts} />
            })}
        </>
    )
}

export default App;
