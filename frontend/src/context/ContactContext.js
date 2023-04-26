import { createContext, useReducer } from 'react'

export const ContactsContext = createContext()

export const contactsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTACTS': 
      return {
        contacts: action.payload
      }
    case 'CREATE_CONTACT':
      return {
        contacts: [action.payload, ...state.contacts]
      }
    case 'DELETE_CONTACT':
      return {
        contacts: state.contacts.filter((w) => w._id !== action.payload._id)
      }
    case 'UPDATE_CONTACT':
      return {
        contacts: state.contacts.map((contact) => 
        contact._id === action.payload._id ? action.payload : contact
    )
  }

    default:
      return state
  }
}

export const ContactsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactsReducer, {
    contacts: null
  })

  return (
    <ContactsContext.Provider value={{...state, dispatch}}>
      { children }
    </ContactsContext.Provider>
  )
}