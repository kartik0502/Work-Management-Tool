import { Button, Divider, Modal, Table, message } from 'antd'
import React, { useEffect } from 'react'
import TaskForm from './TaskForm'
import { deleteTasks, fetchTasks, updateTask } from '../../../apicalls/tasks'
import { SetLoading } from '../../../redux/loadersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDateFormat } from '../../../utils/helpers'
import { addNotification } from '../../../apicalls/notifications'


function Tasks({ project }) {
  const [filters, setFilters] = React.useState({
    status: 'all',
    assignedBy: 'all',
    assignedTo: 'all'
  });

  const [showViewTask, setShowViewTask] = React.useState(false)
  const [showTaskForm, setShowTaskForm] = React.useState(false)
  const [tasks, setTasks] = React.useState([])
  const [task, setTask] = React.useState(null)
  const dispatch = useDispatch()
  const params = useParams()
  const {user} = useSelector(state => state.users)

  const isEmployee = project.members.find(member => member.user._id === user._id && member.role === 'employee')

  const getTasks = async () => {
    try {
      dispatch(SetLoading(true))
      const response = await fetchTasks({
        projectId: project._id,
        ...filters
      })
      console.log(response)
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

  const deleteTask = async (taskId) => {
    try {
      dispatch(SetLoading(true))
      const response = await deleteTasks(taskId)
      dispatch(SetLoading(false))
      if (response.success) {
        getTasks();
        message.success(response.message)
      }
    }
    catch (err) {
      dispatch(SetLoading(false))
      message.error(err.message)
    }
  }

  const onStatusUpdate = async ({
    task,
    status
  }) => {
    try {
      dispatch(SetLoading(true))
      const response = await updateTask({
        taskId : task._id,
        status: status
      })
      dispatch(SetLoading(false))
      if (response.success) {
        getTasks();
        message.success(response.message)
        addNotification({
          user: task.assignedBy._id,
          title: 'Task Status Updated',
          description: `Task ${task.name} status updated to ${status}`,
          onclick: `/project/${project._id}`
        })
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
      render: (text, record) => (
        <span
          className="underline text-[14px] cursor-pointer"
          onClick={() => {
            setTask(record);
            setShowViewTask(true);
          }}
        >
          {record.name}
        </span>
      ),
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
      render: (text, record) => {
        return (
          <select value={record.status}
          onChange={(e) => {
            onStatusUpdate({
              task : record,
              status : e.target.value
            })
          }}
          disabled = {record.assignedTo._id !== user._id}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="closed">Closed</option>
          </select>
        )
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <div className='flex'>
            <Button type='primary' className='mr-2' onClick={() => {
              setTask(record)
              setShowTaskForm(true)
            }}
            disabled = {record.assignedTo._id !== user._id}
            > Edit </Button>
            {
              !isEmployee && <Button type='primary' danger
              onClick={() => deleteTask(record._id)}
              > Delete </Button>
            }
          </div>
        );
      }
    },
  ];

  useEffect(() => {
    getTasks();
  }, [filters])

  return (
    <>
      {!isEmployee && <div className='flex justify-end'>
        <Button type='primary' onClick={() => setShowTaskForm(true)}> Add Task </Button>
      </div>}

      <div className="flex gap-5">
        <div>
          <span className='font-semibold'>Status : </span>
          <select
          value={filters.status}
          onChange={(e) => setFilters({
            ...filters,
            status: e.target.value,

          })}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <span className='font-semibold'>Assigned By : </span>
          <select
          value={filters.assignedBy}
          onChange={(e) => setFilters({
            ...filters,
            assignedBy: e.target.value
          })}
          >
            <option value="all">All</option>
            {
              project.members.filter((m) => m.role === "admin" || m.role === "Owner").map(member => (
                <option value={member.user._id}>{member.user.firstName} {member.user.lastName}</option>
              ))
            }
          </select>
        </div>
        <div>
          <span className='font-semibold'>Assigned To : </span>
          <select
          value={filters.assignedTo}
          onChange={(e) => setFilters({
            ...filters,
            assignedTo: e.target.value
          })}
          >
            <option value="all">All</option>
            {
              project.members.filter((m) => m.role === "employee").map(member => (
                <option value={member.user._id}>{member.user.firstName} {member.user.lastName}</option>
              ))
            }
          </select>
        </div>
      </div>

      <Table columns={columns} dataSource={tasks}
        className='mt-5'
      />


      {showTaskForm && (
        <TaskForm showTaskForm={showTaskForm} setShowTaskForm={setShowTaskForm} project={project} task={task} reloadData={getTasks} />
      )}

      {showViewTask && (
        <Modal
        title="Task Details"
        open={showViewTask}
        onCancel={() => setShowViewTask(false)}
        centered
        footer={null}
        >

          <div className='h-[1px] bg-gray-800 my-2'></div>

          <h2>
            Name : {task.name}
          </h2>

          <span className='mt-2 font-semibold pr-4'>
            Description :  
          </span>
          {task.description}
        </Modal>
      )}

    </>
  )
}

export default Tasks