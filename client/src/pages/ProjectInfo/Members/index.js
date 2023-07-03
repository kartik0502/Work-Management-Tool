import { Button } from 'antd'
import React from 'react'
import MemberForm from './MemberForm'

function Members({project}) {
  const [showMemberForm, setShowMemberForm] = React.useState(false)
  return (
    <div>
      <div className="flex justify-end">
        <Button className="btn btn-primary"
          onClick={() => setShowMemberForm(true)}
        >Add Member</Button>
      </div>

      {showMemberForm && <MemberForm showMemberForm={showMemberForm} setShowMemberForm={setShowMemberForm} reloadData={() => { }} project={project} />}
    </div>
  )
}

export default Members