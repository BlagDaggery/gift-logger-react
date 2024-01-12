import { useState, useEffect, SyntheticEvent } from 'react';
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
        getRecipients();
    }, []);

    async function getRecipients() {
        const response: Response = await fetch('http://localhost:3000/recipients?_embed=gifts');
        const data = await response.json();

        data.forEach((recipient: recipientData) => {
            recipient.gifts.sort((a: giftProps, b: giftProps) => {
                if (a.dateGiven < b.dateGiven) {
                    return 1;
                } else if (a.dateGiven > b.dateGiven) {
                    return -1;
                } else {
                    return 0;
                }
            });
        });

        setRecipients(data);
    }

    function saveNewGift(event: SyntheticEvent, id: number) {
        event.preventDefault();

        const myForm: HTMLFormElement = event.target as HTMLFormElement;
        const fd: FormData = new FormData(myForm);
        
        let data: object = Object.fromEntries(fd.entries());
        data = {...data, recipientId: id};

        async function postGiftData(data: object) {
            try {
                const response = await fetch('http://localhost:3000/gifts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                console.log('Success:', result);
                getRecipients();
            } catch(error) {
                console.error('Error:', error);
            } finally {
                myForm.reset();
            }
        }

        postGiftData(data);
    }

    return (
        <>
            <h1>Gift Logger</h1>
            {recipients && recipients.map(recipient => {
                return (
                    <Recipient
                        key={recipient.id}
                        id={recipient.id}
                        name={recipient.name}
                        gifts={recipient.gifts}
                        saveNewGift={saveNewGift} />
                ) 
            })}
        </>
    )
}

export default App;
