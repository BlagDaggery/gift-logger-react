import giftProps from '../../Interfaces/interfaces';

function Gift({id, giftTitle, giftType, reaction }: giftProps) {
    return (
        <tr>
            <td id={id.toString()}>{id}</td>
            <td>{giftTitle}</td>
            <td>{giftType}</td>
            <td>{reaction}</td>
        </tr>
    )
}

export default Gift;
