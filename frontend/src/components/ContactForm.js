import { useState } from "react"
import { useContactsContext } from "../hooks/useContactsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const ContactForm = () => {
  const { dispatch } = useContactsContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const contact = {name, phone, email}

    const response = await fetch('http://localhost:4000/api/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName('')
      setPhone('')
      setEmail('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_CONTACT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Contact</h3>

      <label>Name:</label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Phone:</label>
      <input 
        type="number"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        className={emptyFields.includes('phone') ? 'error' : ''}
      />

      <label>Email:</label>
      <input 
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className={emptyFields.includes('email') ? 'error' : ''}
      />

      <button>Add Contact</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ContactForm