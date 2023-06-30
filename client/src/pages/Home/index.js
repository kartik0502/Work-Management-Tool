import React from 'react'
import { useSelector } from 'react-redux'

function Home() {

  const {user} = useSelector(state => state.users)
  return (
    <div>
      Hey {user?.firstName} {user?.lastName}, Welcome to TaskMaster!
    </div>
  )
}

export default Home