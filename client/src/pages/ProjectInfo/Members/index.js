import { Button, Table, message } from 'antd'
import React from 'react'
import MemberForm from './MemberForm'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoading } from '../../../redux/loadersSlice'
import { removeMember } from '../../../apicalls/projects'

function Members({ project, reloadData }) {
  const [showMemberForm, setShowMemberForm] = React.useState(false)
  const { user } = useSelector(state => state.users)
  const dispatch = useDispatch();
  const isOwner = project.owner._id === user._id

  const deleteMember = async (memberId) => {
    try {
      dispatch(SetLoading(true))
      const response = await removeMember({ memberId, projectId: project._id })
      dispatch(SetLoading(false))
      if (response.success) {
        reloadData()
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

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      render: (text, record) => {
        return record.user.firstName
      }
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      render: (text, record) => {
        return record.user.lastName
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text, record) => {
        return record.user.email
      }
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (text, record) => {
        return record.role.toUpperCase()
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        return <Button 
        className={`primary ${isOwner ? 'bg-red-500' : 'bg-red-200'}`}
          onClick={() => {
            deleteMember(record._id)
          }}
          disabled={!isOwner}
        >
          <span className={isOwner ? 'text-white' : 'text-black'}>Remove</span>
        </Button>
      }
    }
  ]

  return (
    <div>
      <div className="flex justify-end">
        {
          isOwner &&
          <Button className="btn btn-primary mb-6"
            onClick={() => setShowMemberForm(true)}
          >Add Member
          </Button>
        }
      </div>
      <Table columns={columns} dataSource={project.members} />
      {showMemberForm && <MemberForm showMemberForm={showMemberForm} setShowMemberForm={setShowMemberForm} reloadData={reloadData} project={project} />}
    </div>
  )
}

export default Members