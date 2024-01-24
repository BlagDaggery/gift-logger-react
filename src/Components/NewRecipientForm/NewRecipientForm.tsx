import './NewRecipientForm.css';

interface NewRecipientFormProps {
    saveNewRecipient: (event: React.SyntheticEvent) => void
}

function NewRecipientForm({saveNewRecipient}: NewRecipientFormProps) {

    return (
        <form id='addNewRecipientForm' className='card' onSubmit={(event) => saveNewRecipient(event)}>
            <p><b>Add a New Recipient</b></p>
            <label className='new-recipient-form-item'>
                <div className='label-text'>Name</div>
                <input name='name' type='text' required />
            </label>
            <button type='submit' className='btn btn-secondary new-recipient-form-item'>Save New Recipient</button>
        </form>
    );
}

export default NewRecipientForm;
