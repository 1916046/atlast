const express = require('express')
const {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  updateContact
} = require('../controllers/contactController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getContacts)

//GET a single workout
router.get('/:id', getContact)

// POST a new workout
router.post('/', createContact)

// DELETE a workout
router.delete('/:id', deleteContact)

// UPDATE a workout
router.put('/:id', updateContact)


module.exports = router