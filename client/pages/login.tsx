import { SyncOutlined } from '@ant-design/icons'
import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { getUserData } from '../slices/user'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setKey } from '../slices/navbar'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('')

  const dispatch = useDispatch()

  const router = useRouter()

  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    if (window.localStorage.getItem('user')) {
      dispatch(getUserData(JSON.parse(window.localStorage.getItem('user'))))
    }
  }, [])

  useEffect(() => {
    if (user !== null) {
      router.push('/')
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
        category
      })

      dispatch(getUserData(data))
      dispatch(setKey('app'))

      // save data nin local storage
      window.localStorage.setItem('user', JSON.stringify(data))
      router.push('/')
      toast.success('Login Successful!', {
        icon: '🚀'
      })
    } catch (err) {
      setLoading(false)
      toast.error(err.message)
    }
    setLoading(false)
  }

  return (
    <>
      <h1 className='jumbotron'>Login</h1>
      <div className='container col-md-4 offset-md-4 pb-5 pt-5'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            className='form-control mb-4 p-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email'
            required
          />
          <input
            type='text'
            className='form-control mb-4 p-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
          <select
            onChange={(e) => setCategory(e.target.value)}
            className='form-control mb-4 p-2'
          >
            <option value=''>Position</option>
            <option value='teacher'>Teacher</option>
            <option value='academic'>Acedemic co-ordinator</option>
            <option value='finance'>Finance</option>
            <option value='scheduler'>Scheduler</option>
            <option value='CEO'>CEO</option>
          </select>
          <button
            className='btn btn-block btn-primary'
            disabled={!email || !password || loading}
            style={{ width: '100%' }}
          >
            {loading ? <SyncOutlined spin /> : 'Login'}
          </button>
        </form>
        <p className='p-2 text-center'>
          Not yet registered?{' '}
          <Link href='/register'>
            <a onClick={() => dispatch(setKey('register'))}>Register</a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default Login
