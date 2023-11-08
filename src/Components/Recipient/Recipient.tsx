import { BaseSyntheticEvent, useState } from 'react';
import giftProps from '../../Interfaces/interfaces';
import Gift from '../Gift/Gift';
import './Recipient.css';

interface recipientProps {
    id: number,
    name: string,
    gifts: giftProps[]
}

function Recipient({ id, name, gifts }: recipientProps) {

    const [addGiftIsActive, setAddGiftIsActive] = useState('');

    function handleButtonClick() {
        addGiftIsActive ? setAddGiftIsActive('') : setAddGiftIsActive('active');
    }

    function saveGiftData(event: BaseSyntheticEvent){
        console.log(event);
        event.preventDefault();

        const fd = new FormData(event.target);
        const data: object = Object.fromEntries(fd.entries());
        
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
                console.log("Success:", result);
            } catch(error) {
                console.error("Error:", error);
            }
        }

        postGiftData(data);
        setAddGiftIsActive('');
    }

    return (
        <div className='recipient-card'>
            <h2 id={`recipient${id.toString()}`}>{name}</h2>
            
            <div className='gift-list'>
                <table className='gift-table'>
                    <thead>
                        <tr>
                            <th>Gift</th>
                            <th>Type</th>
                            <th>Reaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gifts.map(gift => {
                            return <Gift key={gift.id} id={gift.id} giftTitle={gift.giftTitle} giftType={gift.giftType} reaction={gift.reaction} />
                        })}
                    </tbody>
                </table>
            </div>
            <div className={`add-gift-form-container ${addGiftIsActive}`}>
                <form onSubmit={saveGiftData}>
                    <label>Gift Name
                        <input name='giftTitle' type='text'></input>
                    </label>
                    <label>Gift Type
                        <input name='giftType' type='text'></input>
                    </label>
                    <label>Reaction
                        <select name='reaction'>
                            <option>Positive</option>
                            <option>Neutral</option>
                            <option>Negative</option>
                        </select>
                    </label>
                    <input type='hidden' name='recipientId' value={id} />
                    <button>Save Gift</button>
                </form>
            </div>
            <button onClick={handleButtonClick}>Add Gift</button>
        </div>
    )
}

export default Recipient;
