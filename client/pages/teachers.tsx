import { SyncOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Teacher = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { data } = await axios.post(`/api/teacher`, {
        name,
        email,
        role: 'teacher'
      })
      setLoading(false)
      toast.success('Teacher Added Successfully!')
    } catch (err) {
      setLoading(false)
      toast.error(err.response.data.message)
    }
  }

  return (
    <>
      <h1 className='jumbotron'>Teachers</h1>
      <div className='container col-md-4 offset-md-4 pb-5 pt-5'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            className='form-control mb-4 p-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New Teacher's Name"
            required
          />
          <input
            type='email'
            className='form-control mb-4 p-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
          <button
            className='btn btn-block btn-primary'
            disabled={!name || !email || loading}
            style={{ width: '100%' }}
          >
            {loading ? <SyncOutlined spin /> : 'Submit'}
          </button>
        </form>
      </div>
    </>
  )
}

export default Teacher
