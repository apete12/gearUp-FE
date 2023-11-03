import './Profile.css'
import { useQuery } from '@apollo/client'
import { LOAD_SINGLE_USER } from '../../GraphQL/Queries'
import { useState, useEffect } from 'react'
import ProfilePic from '../../assets/user-icon.png'
import Projects from '../Projects/Projects'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'

const Profile = ({ setLoginAccess, setProfileAccess }) => {
  const { loading, error, data } = useQuery(LOAD_SINGLE_USER, {
    variables: { id: 4 }
  })
  const [user, setUser] = useState({})

  useEffect(() => {
    if (!loading && data) {
      setUser(data.artist)
      setProfileAccess(true)
    }
  }, [loading, error, data, setProfileAccess])

  if (loading) return <Loading />

  if (error) {
    console.error('Error fetching data:', error)
    return <Error error={error} />
  }

  return (
    <>
      {user && (
        <section className='details-container' key={user.id}>
          <div className='profile-details-container'>
            <div className='profile-pic-container'>
              <img
                className='profile-pic'
                src={
                  user.profileImage === 'image.jpg'
                    ? ProfilePic
                    : user.profileImage
                }
                alt=''
              />
            </div>
            <p>
              {user.city}, {user.state}
            </p>
            <p>{user.zipcode}</p>
            <p>Email: {user.email}</p>
            <p>Your Preferred Medium: {user.medium}</p>
            <Link
              className='login-link'
              to={`/`}
              onClick={() => {
                setLoginAccess(false)
                setProfileAccess(false)
              }}
            >
              Logout
            </Link>
          </div>
          <div className='artist-details'>
            <h2 className='artist-welcome'>Welcome, {user.name}!</h2>
            <div className='projects-container'>
              <div className='projects-heading-container'>
                <h2 className='projects-heading'>All Projects:</h2>
              </div>
              <Projects user={user} />
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Profile
