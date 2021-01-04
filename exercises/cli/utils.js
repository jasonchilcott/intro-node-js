const fs = require('fs')
const path = require('path')

// this path needs to be relative to work with fs
const contactsLocation = './contacts.json'

/**
 * should read the contacts at the
 * @contactsLocation path and convert
 * it to a js object
 */
const getContacts = () => {
  const jsonContacts = fs.readFileSync(contactsLocation)
  const contacts = JSON.parse(jsonContacts)
  return contacts
  
}

/**
 * takes a contacts object, converts it to JSON
 * and saves it at the @contactsLocation path
 * @param {Object} contacts contacts object
 */
const saveContacts = (contacts) => {
  const stringContacts = JSON.stringify(contacts)
  fs.writeFileSync(contactsLocation, stringContacts)

}

module.exports = {
  contactsLocation,
  getContacts,
  saveContacts
}

