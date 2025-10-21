import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Feed from './Feed.jsx';
import AuthProvider from './auth/AuthProvider.jsx';
import RequireAuth from './auth/RequireAuth.jsx';
import { CookiesProvider } from 'react-cookie';


function App() {

  return (
    <>
    <AuthProvider>
        <RequireAuth>
          {
            (user) => (
              <>
                <CookiesProvider>
                    <Feed user={user}/>
                </CookiesProvider>
              </>
            )
          }
        </RequireAuth>
    </AuthProvider>
    </>
  )
}

export default App
