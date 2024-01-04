import { SyntheticEvent } from 'react';
import giftProps from '../../Interfaces/interfaces';
import Gift from '../Gift/Gift';
import './Recipient.css';

interface recipientProps {
    id: number,
    name: string,
    gifts: giftProps[],
    saveNewGift: (event: SyntheticEvent, id: number) => void
}

function Recipient({ id, name, gifts, saveNewGift }: recipientProps) {

    return (
        <div className='recipient-card'>
            <h2 id={`recipient${id.toString()}`}>{name}</h2>

            <div className='gift-list'>
                <table className='gift-table'>
                    <thead>
                        <tr>
                            <th>Date Given</th>
                            <th>Occasion</th>
                            <th>Gift</th>
                            <th>Type</th>
                            <th>Reaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gifts.map(gift => {
                            return (
                                <Gift
                                    key={gift.id}
                                    id={gift.id}
                                    giftTitle={gift.giftTitle}
                                    giftType={gift.giftType}
                                    reaction={gift.reaction}
                                    dateGiven={gift.dateGiven}
                                    occasion={gift.occasion} />
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <h3>Add a New Gift</h3>
            <form className='new-gift-form' onSubmit={(event) => saveNewGift(event, id)}>
                <label>
                    <span className='label-text'>Date Given</span>
                    <input name='dateGiven' type='date' required></input>
                </label>
                <label>
                    <span className='label-text'>Occasion</span>
                    <select name='occasion' required>
                        <option value="" selected disabled>-- Please choose an option --</option>
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
                        <option value="" selected disabled>-- Please choose an option --</option>
                        <option>Positive</option>
                        <option>Neutral</option>
                        <option>Negative</option>
                    </select>
                </label>
                <button className='btn btn-primary' type='submit'>Save Gift</button>
            </form>
        </div>
    )
}

export default Recipient;
