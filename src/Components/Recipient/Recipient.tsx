import Gift from '../Gift/Gift';
import './Recipient.css';

interface recipientProps {
    id: number,
    name: string,
    gifts: [{
        id: number,
        giftTitle: string,
        giftType: string,
        reaction: string
    }]
}

function Recipient({ id, name, gifts }: recipientProps) {
    return (
        <div className='recipient-card'>
            <h2 id={`recipient${id.toString()}`}>{name}</h2>
            <div className='gift-list'>
                <table className='gift-table'>
                    <thead>
                        <tr>
                            <th>Gift ID</th>
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
        </div>
    )
}

export default Recipient;
