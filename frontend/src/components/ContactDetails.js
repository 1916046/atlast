import { useContactsContext } from '../hooks/useContactsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ContactDetails = ({ contact, setEditContact}) => {
  const { dispatch } = useContactsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('http://localhost:4000/api/contacts/' + contact._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_CONTACT', payload: json})
    }
  }
  const handleEdit = () => {
    setEditContact(contact)
  }
  

  return (
    <div className="contact-details">
      <h4>{contact.name}</h4>
      <p><strong>Phone: </strong>{contact.phone}</p>
      <p><strong>Email: </strong>{contact.email}</p>
      <p>{formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}</p>
      <div className='button-details'><span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      <span className="material-symbols-outlined" onClick={handleEdit}>Edit</span></div>
    </div>
  )
}

export default ContactDetails