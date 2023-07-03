import { Form, Modal, message } from 'antd'
import Input from 'antd/es/input/Input';
import React from 'react'
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';

function MemberForm({showMemberForm, setShowMemberForm, reloadData, project}) {
    const formRef = React.useRef(null);
    const dispatch = useDispatch()
    const onFinish = async (values) => {
        try{
            // check if email is already a member
            const isMember = project.members.find(member => member.user.email === values.email)
            if(isMember){
                throw new Error('User is already a member!')
            }

        }
        catch(err){
            message.error(err.message)
        }
    }
  return (
    <Modal
    title="ADD MEMBER"
    open={showMemberForm}
    onCancel={() => setShowMemberForm(false)}
    okText="Add"
    onOk={() => {
        formRef.current.submit()
    }}
    centered
    >
    
    <Form layout='vertical' onFinish={onFinish} ref={formRef}>
        <Form.Item label="Email" name="email">
            <Input name='email' placeholder="Email" className="px-2" />
        </Form.Item>

        <Form.Item label="Role" name="role">
            <select name='role' className="px-2">
                <option value='admin'>Admin</option>
                <option value='employee'>Employee</option>
            </select>
        </Form.Item>
    </Form>
    </Modal>
  )
}

export default MemberForm