import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TopNav from '../components/TopNav'
import '../public/css/styles.css'
import { store } from '../store/store'
import { NextPage } from 'next'
import { AppProps } from 'next/app'

const MyApp: NextPage = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        transition={Flip}
        limit={3}
        closeButton={false}
      />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
