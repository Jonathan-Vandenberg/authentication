import {
  AppstoreOutlined,
  LineChartOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setKey } from '../slices/navbar'
import { getUserData } from '../slices/user'
import { RootState } from '../store/store'

const TopNav = () => {
  const dispatch = useDispatch()
  const key = useSelector((state: RootState) => state.key.key)
  const user = useSelector((state: RootState) => state.user.user)
  const router = useRouter()

  const app = {
    label: (
      <Link href='/'>
        <a>App</a>
      </Link>
    ),
    icon: <AppstoreOutlined />,
    key: 'app',
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  let login
  if (user === null) {
    login = {
      label: (
        <Link href='/login'>
          <a>Login</a>
        </Link>
      ),
      icon: <LoginOutlined />,
      key: 'login',
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  } else {
    login = null
  }

  let register
  if (user === null) {
    register = {
      label: (
        <Link href='/register'>
          <a>Register</a>
        </Link>
      ),
      icon: <UserAddOutlined />,
      key: 'register',
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  } else {
    register = null
  }

  let logout
  if (user !== null) {
    logout = {
      label: (
        <Link href='/login'>
          <a>Logout</a>
        </Link>
      ),
      icon: <LogoutOutlined />,
      key: 'logout',
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  } else {
    logout = null
  }

  const finances = {
    label: (
      <Link href='/finances'>
        <a>Finances</a>
      </Link>
    ),
    icon: <LineChartOutlined />,
    key: 'finances',
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  const schools = {
    label: (
      <Link href='/schools'>
        <a>Schools</a>
      </Link>
    ),
    icon: <LineChartOutlined />,
    key: 'schools',
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  const staff = {
    label: (
      <Link href='/staff'>
        <a>Staff</a>
      </Link>
    ),
    icon: <LineChartOutlined />,
    key: 'staff',
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  const teachers = {
    label: (
      <Link href='/teachers'>
        <a>Teachers</a>
      </Link>
    ),
    icon: <LineChartOutlined />,
    key: 'teachers',
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  let subMenu
  if (user === null) {
    subMenu = null
  } else if (user.role[0] === 'staff') {
    subMenu = {
      label: 'Dash',
      key: 'dash',
      children: [teachers, schools, logout]
    }
  } else
    subMenu = {
      label: 'Dash',
      key: 'dash',
      children: [logout]
    }

  const financialProjection = {
    label: 'Financial Projection',
    key: 'financialProjection'
  }

  let CEO
  if (user !== null && user.role[0] === 'CEO') {
    CEO = {
      label: 'CEO',
      key: 'CEO',
      children: [
        {
          label: 'Master Overview',
          key: 'financialProjection',
          children: [financialProjection, , finances, schools, staff, teachers]
        }
      ]
    }
  }

  console.log(user)

  const items = [app, login, register, subMenu, CEO]

  const onClick = (e) => {
    dispatch(setKey(e.key))

    if (e.key === 'logout') {
      const logoutHandler = async () => {
        try {
          window.localStorage.removeItem('user')
          const { data } = await axios.get('/api/logout')
          toast(data.message)
          router.push('/login')
          dispatch(setKey('login'))
          dispatch(getUserData(null))
        } catch (err) {
          console.log(err)
        }
      }

      logoutHandler()
    }
  }

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[key]}
      mode='horizontal'
      items={items}
    />
  )
}

export default TopNav
