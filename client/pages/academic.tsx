import { SyncOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setKey } from '../slices/navbar'

const Academic = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { data } = await axios.post(`/api/academic`, {
        name,
        email,
        password,
        role: 'academic'
      })
      setLoading(false)
      toast.success('Registration Successful!')
    } catch (err) {
      setLoading(false)
      toast.error(err.response.data.message)
    }
  }

  return (
    <>
      <h1 className='jumbotron'>Register</h1>
      <div className='container col-md-4 offset-md-4 pb-5 pt-5'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            className='form-control mb-4 p-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Username'
            required
          />
          <input
            type='email'
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
          <button
            className='btn btn-block btn-primary'
            disabled={!name || !email || !password || loading}
            style={{ width: '100%' }}
          >
            {loading ? <SyncOutlined spin /> : 'Submit'}
          </button>
        </form>
        <p className='p-2 text-center'>
          Already registered?{' '}
          <Link href='/login'>
            <a onClick={() => dispatch(setKey('login'))}>Login</a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default Academic
