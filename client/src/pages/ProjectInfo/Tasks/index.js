import { Button, Table, message } from 'antd'
import React from 'react'
import TaskForm from './TaskForm'
import { fetchTasks } from '../../../apicalls/tasks'
import { SetLoading } from '../../../redux/loadersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDateFormat } from '../../../utils/helpers'


function Tasks({ project }) {
  const [showTaskForm, setShowTaskForm] = React.useState(false)
  const [tasks, setTasks] = React.useState([])
  const dispatch = useDispatch()
  const params = useParams()
  const {user} = useSelector(state => state.users)

  const isEmployee = project.members.find(member => member.user._id === user._id && member.role === 'employee')

  const getTasks = async () => {
    try {
      dispatch(SetLoading(true))
      const response = await fetchTasks({
        projectId: project._id
      })
      dispatch(SetLoading(false))
      if (response.success) {
        setTasks(response.data)
        message.success(response.message)
      }
    }
    catch (err) {
      dispatch(SetLoading(false))
      message.error(err.message)
    }
  }

  React.useEffect(() => {
    getTasks();
  }, [])

  const columns = [
    {
      title: 'Task Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      render: (text, record) => record.assignedTo.firstName + ' ' + record.assignedTo.lastName
    },
    {
      title: 'Assigned By',
      dataIndex: 'assignedBy',
      render: (text, record) => record.assignedBy.firstName + ' ' + record.assignedBy.lastName
    },
    {
      title: 'Assigned On',
      dataIndex: 'createdAt',
      render: (text, record) => (
        getDateFormat(record.updatedAt)
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <span className='uppercase'>{text}</span>
      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];


  return (
    <>
      {!isEmployee && <div className='flex justify-end'>
        <Button type='primary' onClick={() => setShowTaskForm(true)}> Add Task </Button>
      </div>}

      <Table columns={columns} dataSource={tasks}
        className='mt-5'
      />


      {showTaskForm && (
        <TaskForm showTaskForm={showTaskForm} setShowTaskForm={setShowTaskForm} project={project} task={null} reloadData={getTasks} />
      )}
    </>
  )
}

export default Tasks