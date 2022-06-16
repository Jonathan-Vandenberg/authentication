import 'antd/dist/antd.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setKey } from '../slices/navbar'

const Register = () => {
  const router = useRouter()

  const dispatch = useDispatch()

  return (
    <>
      <h1 className='jumbotron'>Register</h1>
      <div className='container col-md-4 offset-md-4 pb-5 pt-5'>
        <form>
          <select
            className='form-control mb-4 p-2'
            onChange={(e) => router.push(e.target.value)}
          >
            <option value='' style={{ color: 'rgb(108,117,125)' }}>
              Select Role
            </option>
            <option value='/finance' className='form-control mb-4 p-2'>
              Finance
            </option>
            <option value='/scheduler' className='form-control mb-4 p-2'>
              Scheduler
            </option>
            <option value='/academic' className='form-control mb-4 p-2'>
              Academic Co-ordinator
            </option>
            <option value='/teacher' className='form-control mb-4 p-2'>
              Teacher
            </option>
            <option value='/CEO' className='form-control mb-4 p-2'>
              CEO
            </option>
          </select>
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

export default Register
