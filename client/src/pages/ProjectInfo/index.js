import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProjectById } from '../../apicalls/projects'
import { SetLoading } from '../../redux/loadersSlice'
import { Tabs, message } from 'antd'
import Divider from '../../components/Divider'
import Tasks from './Tasks'
import Members from './Members'

function ProjectInfo() {
  const [project, setProject] = React.useState(null)
  const dispatch = useDispatch()
  const params = useParams()
  //useParams() ->  It allows you to access URL parameters in your components.

  const fetchProject = async () => {
    try {
      dispatch(SetLoading(true))
      console.log(params)
      const response = await getProjectById(params.id)
      console.log(response)
      dispatch(SetLoading(false))
      if (response.success) {
        setProject(response.data)
        message.success(response.message)
      }
      else {
        throw new Error(response.message)
      }
    }
    catch (err) {
      dispatch(SetLoading(false))
      message.error(err.message)
    }
  }

  React.useEffect(() => {
    fetchProject();
  }, [])

  return (
    project &&
    (<div>
              <div className="flex justify-between items-center">
          <div>
            <h1 className="text-primary text-2xl font-semibold uppercase">
              {project?.name}
            </h1>
            <span className="text-gray-600 text-sm mt-2">
              {project?.description}
            </span>
          </div>
          <div>
            <div className="flex gap-5">
              <span className="text-gray-600 text-sm font-semibold">
                Created At
              </span>
              <span className="text-gray-600 text-sm">
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex gap-5">
              <span className="text-gray-600 text-sm font-semibold mt-2">
                Created By
              </span>
              <span className="text-gray-600 text-sm mt-2">
                {project.owner.firstName} {project.owner.lastName}
              </span>
            </div>
          </div>
        </div>

      <Divider />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Tasks" key="1">
          <Tasks />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Members" key="2">
          <Members project={project}/>
        </Tabs.TabPane>
      </Tabs>



    </div>
    )
  )
}

export default ProjectInfo