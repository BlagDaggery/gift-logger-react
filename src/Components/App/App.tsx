import { useState, useEffect, SyntheticEvent } from 'react';
import giftProps from '../../Interfaces/interfaces';
import Recipient from '../Recipient/Recipient';
import NewRecipientForm from '../NewRecipientForm/NewRecipientForm';
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

    function saveNewRecipient(event: SyntheticEvent) {
        event.preventDefault();
        const newRecipientForm: HTMLFormElement = event.target as HTMLFormElement;
        const fd: FormData = new FormData(newRecipientForm);
        const data: object = Object.fromEntries(fd.entries());

        async function postRecipientData(data: object) {
            try {
                const response: Response = await fetch('http://localhost:3000/recipients', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result: object = await response.json();
                console.log('Success:', result);
                getRecipients();
            } catch (error) {
                console.error('Error:', error);
            } finally {
                newRecipientForm.reset();
                toggleNewRecipientForm();
            }
        }

        postRecipientData(data);
    }

    function saveNewGift(event: SyntheticEvent, id: number) {
        event.preventDefault();

        const myForm: HTMLFormElement = event.target as HTMLFormElement;
        const fd: FormData = new FormData(myForm);
        let data: object = Object.fromEntries(fd.entries());
        data = { ...data, recipientId: id };

        async function postGiftData(data: object) {
            try {
                const response: Response = await fetch('http://localhost:3000/gifts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result: object = await response.json();
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

    function toggleNewRecipientForm() {
        const newRecipientFormContainer: HTMLElement = document.querySelector('.new-recipient-form-container') as HTMLElement;
        newRecipientFormContainer.classList.toggle('hidden');
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
            <div className='add-btn-row'>
                <button type='button' id='addNewRecipient' className='btn btn-secondary' onClick={toggleNewRecipientForm}>Add New Recipient</button>
            </div>
            <div className='new-recipient-form-container hidden'>
                <NewRecipientForm saveNewRecipient={saveNewRecipient} />
            </div>
        </>
    )
}

export default App;
