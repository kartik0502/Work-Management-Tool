import { Button } from 'antd'
import React from 'react'
import ProjectForm from './ProjectForm';

function Projects() {
    const [show, setShow] = React.useState(false);
  return (
    <div>
        <div className='flex justify-end'>
            <Button type='primary' className='rounded mt-7' onClick = {() => setShow(true)}> 
            Add Project </Button>   
        </div>

        {show && <ProjectForm show={show} setShow={setShow} reloadData={() => {}}/>}

    </div>
  )
}

export default Projects