import { Form, Input, Modal, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';
import { createProject } from '../../../apicalls/projects';

function ProjectForm({
    show,
    setShow,
    reloadData,
    project
}) {
    const formRef = React.useRef(null);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.users);

    const onFinish = async (values) => {
        try{
            dispatch(SetLoading(true));
            if(project){
                // update project
            }
            else{
                // add project
                values.owner = user._id;
                values.members = [
                    {
                        user: user._id,
                        role: 'Owner'
                    }
                ];
            }
            const response = await createProject(values);
            dispatch(SetLoading(false));
            if(response.success){
                message.success(response.message);
                reloadData();
                setShow(false);
            }
            else{
                throw new Error(response.message)
            }
        }
        catch(err){
            dispatch(SetLoading(false));
            console.log(err);
        }
    }
  return (
    <Modal
    title='Add Project' open={show} onCancel={() => setShow(false)} centered width={700}
    onOk={() => {
        formRef.current.submit();
    }}
    okText='Add'
    >     
        <Form layout='vertical' ref={formRef} onFinish={onFinish}>
            <Form.Item label='Project Name' name='name'>
                <Input className='font-medium custom-input' placeholder = "Project Name"/>
            </Form.Item>

            <Form.Item label='Project Description' name='description'>
                <TextArea className='font-medium custom-input' placeholder = "Project Description"/>
            </Form.Item>
        </Form>
    </Modal>
  )
}

export default ProjectForm