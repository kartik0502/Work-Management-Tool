import { Form, Modal, message } from 'antd'
import Input from 'antd/es/input/Input';
import React from 'react'
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';
import { addMember } from '../../../apicalls/projects';

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
            else{
                // add member
                dispatch(SetLoading(true))
                const response = await addMember({
                    projectId: project._id,
                    email: values.email,
                    role: values.role
                })
                dispatch(SetLoading(false))
                if(response.success){
                    message.success(response.message)
                    setShowMemberForm(false)
                    reloadData()
                }
                else{
                    throw new Error(response.message)
                }
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
        <Form.Item label="Email" name="email"
        rules={ [{ required: true, message: "Please enter the member's email " }]}
        >
            <Input name='email' placeholder="Email" className="px-2" />
        </Form.Item>

        <Form.Item label="Role" name="role"
        rules={ [{ required: true, message: "Please select the member's role " }]}
        >
            <select name='role' className="px-2 py-2">
                <option value="">Select Role</option>
                <option value='admin' >Admin</option>
                <option value='employee'>Employee</option>
            </select>
        </Form.Item>
    </Form>
    </Modal>
  )
}

export default MemberForm