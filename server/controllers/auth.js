import { hashPassword, comparePassword } from '../utils/auth'
import jwt from 'jsonwebtoken'
import Teacher from '../models/teacher'
import CEO from '../models/CEO'
import Finance from '../models/finance'
import Academic from '../models/academic'
import Scheduler from '../models/scheduler'
import TeacherData from '../models/teacherData'

export const login = async (req, res) => {
  try {
    // check if db has user with that email
    const { email, password, category } = req.body

    let User

    switch (category) {
      case 'teacher':
        User = Teacher
        break
      case 'CEO':
        User = CEO
        break
      case 'finance':
        User = Finance
        break
      case 'academic':
        User = Academic
        break
      case 'scheduler':
        User = Scheduler
        break
      default:
        break
    }

    const user = await User.findOne({ email }).exec()
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    // check for password match
    const match = await comparePassword(password, user.password)
    if (!match) {
      return res.status(400).json({
        message: 'Incorrect password'
      })
    }

    // create signed JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1000d'
    })

    // return user and token to client, exclude hashed password
    user.password = undefined

    // send token in cookie, using HTML only format so not accessable on client side.
    res.cookie('token', token, {
      httpOnly: true
      // secure: true // only works on https
    })

    // send user as json response
    res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(400).send('Error logging in user')
  }
}

export const finance = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // validate user input
    if (!name) {
      return res.status(400).json({
        message: 'Name is required'
      })
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: 'Password is required and must be at least 6 characters'
      })
    }

    let userExists = await Finance.findOne({ email }).exec()
    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    // hash password
    const hashedPassword = await hashPassword(password)

    // register user
    const newFinance = new Finance({
      name,
      email,
      password: hashedPassword,
      role
    })

    await newFinance.save()

    return res.json({ ok: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send('Error registering user')
  }
}

export const academic = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // validate user input
    if (!name) {
      return res.status(400).json({
        message: 'Name is required'
      })
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: 'Password is required and must be at least 6 characters'
      })
    }

    let userExists = await Academic.findOne({ email }).exec()
    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    // hash password
    const hashedPassword = await hashPassword(password)

    // register user
    const newAcademic = new Academic({
      name,
      email,
      password: hashedPassword,
      role
    })

    await newAcademic.save()

    return res.json({ ok: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send('Error registering user')
  }
}

export const scheduler = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // validate user input
    if (!name) {
      return res.status(400).json({
        message: 'Name is required'
      })
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: 'Password is required and must be at least 6 characters'
      })
    }

    let userExists = await Scheduler.findOne({ email }).exec()
    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    // hash password
    const hashedPassword = await hashPassword(password)

    // register user
    const newScheduler = new Scheduler({
      name,
      email,
      password: hashedPassword,
      role
    })

    await newScheduler.save()

    return res.json({ ok: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send('Error registering user')
  }
}

export const logout = async (req, res) => {
  try {
    await res.clearCookie('token')
    return res.json({ message: 'Signed out successfully' })
  } catch (err) {
    console.log(err)
  }
}

export const teacher = async (req, res) => {
  try {
    const { name, email } = req.body

    // validate user input
    if (!name) {
      return res.status(400).json({
        message: 'Name is required'
      })
    }

    let userExists = await Teacher.findOne({ email }).exec()
    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    // register user
    const newTeacher = new Teacher({
      name,
      email
    })

    await newTeacher.save()

    return res.json({ ok: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send('Error registering user')
  }
}

export const ceo = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // validate user input
    if (!name) {
      return res.status(400).json({
        message: 'Name is required'
      })
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: 'Password is required and must be at least 6 characters'
      })
    }

    let userExists = await CEO.findOne({ email }).exec()
    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    // hash password
    const hashedPassword = await hashPassword(password)

    // register user
    const newCeo = new CEO({
      name,
      email,
      password: hashedPassword,
      role
    })

    await newCeo.save()

    return res.json({ ok: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send('Error registering user')
  }
}

export const teacherData = async (req, res) => {
  try {
    const {
      teacherId,
      name,
      email,
      school,
      absentDays,
      warnings,
      contract,
      salary,
      picture,
      dob,
      nationality,
      address,
      cv,
      passport,
      workPermit,
      notes
    } = req.body

    // validate user input
    if (!name) {
      return res.status(400).json({
        message: 'Name is required'
      })
    }

    if (!email) {
      return res.status(400).json({
        message: 'Email is required'
      })
    }

    if (!contract) {
      return res.status(400).json({
        message: 'Contract is required'
      })
    }

    if (!salary) {
      return res.status(400).json({
        message: 'Salary is required'
      })
    }

    if (!picture) {
      return res.status(400).json({
        message: 'Picture is required'
      })
    }

    if (!nationality) {
      return res.status(400).json({
        message: 'Natioinality is required'
      })
    }

    if (!cv) {
      return res.status(400).json({
        message: 'CV is required'
      })
    }

    if (!passport) {
      return res.status(400).json({
        message: 'Passport is required'
      })
    }

    let userExists = await TeacherData.findOne({ email }).exec()
    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    // register user
    const newTeacherData = new TeacherData({
      teacherId,
      name,
      email,
      school,
      absentDays,
      warnings,
      contract,
      salary,
      picture,
      dob,
      nationality,
      address,
      cv,
      passport,
      workPermit,
      notes
    })

    await newTeacherData.save()

    return res.json({ ok: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send('Error registering user')
  }
}
