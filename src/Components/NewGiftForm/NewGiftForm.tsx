import { SyntheticEvent } from 'react';
import { recipientOptions }  from '../../Interfaces/interfaces';

interface NewGiftFormProps {
    recipientOptions: recipientOptions[],
    saveNewGift: (event: SyntheticEvent) => void
}

function NewGiftForm({recipientOptions, saveNewGift} : NewGiftFormProps) {
    
    return (
        <div>
            <h3>Add a New Gift</h3>
            <form className='new-gift-form' onSubmit={(event) => saveNewGift(event)}>
                <label>
                    <span className='label-text'>Recipient</span>
                    <select name='recipientId' required>
                        {recipientOptions.map(recipient => {
                            return (
                                <option key={recipient.id} value={recipient.id}>{recipient.name}</option>
                            )
                        })}
                    </select>
                </label>
                <label>
                    <span className='label-text'>Date Given</span>
                    <input name='dateGiven' type='date' required></input>
                </label>
                <label>
                    <span className='label-text'>Occasion</span>
                    <select name='occasion' required>
                        <option>Anniversary</option>
                        <option>Birthday</option>
                        <option>Christmas</option>
                        <option>Fathers Day</option>
                        <option>Graduation</option>
                        <option>Mothers Day</option>
                        <option>Retirement</option>
                        <option>Valentines Day</option>
                        <option>None</option>
                    </select>
                </label>
                <label>
                    <span className='label-text'>Gift</span>
                    <input name='giftTitle' type='text' required></input>
                </label>
                <label>
                    <span className='label-text'>Gift Type</span>
                    <input name='giftType' type='text' required></input>
                </label>
                <label>
                    <span className='label-text'>Reaction</span>
                    <select name='reaction' required>
                        <option>Positive</option>
                        <option>Neutral</option>
                        <option>Negative</option>
                    </select>
                </label>
                <button className='btn btn-primary' type='submit'>Save Gift</button>
            </form>
        </div>
    );
}

export default NewGiftForm;
