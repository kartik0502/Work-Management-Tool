import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { SetLoading } from '../../redux/loadersSlice'
import { getProjectByRole } from '../../apicalls/projects'
import { message } from 'antd'
import Divider from '../../components/Divider'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [projects, setProjects] = React.useState([])
  const {user} = useSelector(state => state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const getData = async () => {
    try{
      dispatch(SetLoading(true))
      const res = await getProjectByRole(user._id)
      dispatch(SetLoading(false))
      if(res.success){
        setProjects(res.data)
      }
      else{
        throw new Error(res.message)
      }
    }
    catch(err){
      dispatch(SetLoading(false))
      message.error(err.message)
    }
  }

  React.useEffect(() => {
    getData();
  }, [])
  
  return (
    
    <div>
      <span className='font-semibold italic'>Hey {user?.firstName} {user?.lastName}, Welcome to TaskMaster!</span>

      <div className="grid grid-cols-4 gap-5 mt-4">
        {projects.map(project => (
          <div className="flex flex-col gap-1 border-solid border-gray-300 rounded-md p-2 m-2 cursor-pointer"
          onClick={() => navigate(`/project/${project._id}`)}
          >
            <div className="text-lg font-bold">{project.name}</div>
            <div className="text-sm text-clip">{project.description}</div>
            <Divider />
            <div className="text-sm mt-1 font-semibold">Created on: {new Date(project.createdAt).toLocaleDateString()}</div>
            <div className="text-sm font-semibold">Last updated on: {new Date(project.updatedAt).toLocaleDateString()}</div>
            <Divider />
            <div className="text-sm font-semibold">Owner: {project.owner.firstName} {project.owner.lastName}</div>
            <div className="text-sm font-semibold uppercase">Status: {project.status}</div>
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home