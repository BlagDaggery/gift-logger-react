import giftProps from '../../Interfaces/interfaces';

function Gift({id, giftTitle, giftType, reaction, dateGiven, occasion }: giftProps) {
    return (
        <tr>
            <td>{dateGiven}</td>
            <td>{occasion}</td>
            <td id={id.toString()}>{giftTitle}</td>
            <td>{giftType}</td>
            <td>{reaction}</td>
        </tr>
    )
}

export default Gift;
