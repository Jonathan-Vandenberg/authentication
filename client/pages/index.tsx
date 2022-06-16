import { useEffect } from 'react'
import { getUserData } from '../slices/user'
import { useDispatch } from 'react-redux'

const Index = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserData(JSON.parse(window.localStorage.getItem('user'))))
  }, [])

  return (
    <>
      <h1>Hello World</h1>
      <p>from NextJS</p>
    </>
  )
}

export default Index
