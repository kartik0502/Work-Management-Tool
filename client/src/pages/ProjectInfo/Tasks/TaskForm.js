import { Form, Input, Modal, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoading } from '../../../redux/loadersSlice'
import { createTask } from '../../../apicalls/tasks'

function TaskForm({showTaskForm, setShowTaskForm, project, task, reloadData}) {
    const {user} = useSelector(state => state.users)
    const [email, setEmail] = React.useState('')
    const formRef = React.useRef(null);
    const dispatch = useDispatch()

    const onFinish = async (values) => {
        try{
            let response = null;
            dispatch(SetLoading(true))
            if(task){
            }
            else{
                const assignedTo = project.members.find(member => member.user.email === email)
                const assignedToUserId = assignedTo.user._id

                const assignedBy = user._id
                response = await createTask({
                    ...values,
                    assignedTo: assignedToUserId,
                    assignedBy,
                    projectId: project._id,
                });
            }
            dispatch(SetLoading(false))
            if(response.success){
                reloadData()
                message.success(response.message)
                setShowTaskForm(false)
            }
            else{ 
                throw new Error(response.message)
            }
        }
        catch(err){ 
            dispatch(SetLoading(false))
            message.error(err.message)
        }
    }

    const validateEmail = () => {
        const employees = project.members.filter(member => member.role === 'employee');
        const employeeEmails = employees.find(employee => employee.user.email === email)
        return employeeEmails ? true : false;
    }

  return (
    <Modal
    title="ADD TASK"
    open={showTaskForm}
    onCancel={() => setShowTaskForm(false)}
    okText="Add"
    centered
    onOk={() => {
        formRef.current.submit()
    }}
    >
        <Form layout='vertical'
        ref={formRef} onFinish={onFinish}
        >
            <Form.Item label="Task Name" name="name">
                <Input name='taskName' placeholder="Task Name" className="px-2 "/>
            </Form.Item>

            <Form.Item label="Description" name="description">
                <TextArea name='description' placeholder="Description" />
            </Form.Item>

            <Form.Item label="Assign to" name="assignedTo">
                <Input name='assignedTo' placeholder="Enter email of the employee" className="px-2"
                onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            {
                email && !validateEmail() && (
                    <p className='text-red-500 font-semibold p-2'>Employee not found!</p>
                )
            }
        </Form>
    </Modal>
  )
}

export default TaskForm