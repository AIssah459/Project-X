import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Feed from './Feed.jsx';
import AuthProvider from './auth/AuthProvider.jsx';
import RequireAuth from './auth/RequireAuth.jsx';


function App() {

  return (
    <>
    <AuthProvider>
        <RequireAuth>
          {
            (user) => (
              <>
                <Feed user={user}/>
              </>
            )
          }
        </RequireAuth>
    </AuthProvider>
    </>
  )
}

export default App
