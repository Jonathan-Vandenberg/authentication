import express from 'express'

const router = express.Router()

//controllers
import {
  login,
  logout,
  teacher,
  ceo,
  scheduler,
  academic,
  finance
} from '../controllers/auth'

router.post('/login', login)
router.get('/logout', logout)
router.post('/teacher', teacher)
router.post('/CEO', ceo)
router.post('/scheduler', scheduler)
router.post('/academic', academic)
router.post('/finance', finance)

module.exports = router
