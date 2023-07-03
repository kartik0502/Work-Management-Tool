import { Button, Table, message } from 'antd'
import React from 'react'
import ProjectForm from './ProjectForm';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';
import { deleteProject, fetchProjects } from '../../../apicalls/projects';
import { getDateFormat } from '../../../utils/helpers';

function Projects() {
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [projects, setProjects] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const { user } = useSelector(state => state.users);
  const dispatch = useDispatch();

  const getDetails = async () => {
    try {
      dispatch(SetLoading(true));
      const res = await fetchProjects(user._id);
      if (res.success) {
        setProjects(res.data);
      }
      dispatch(SetLoading(false));
    }
    catch (err) {
      dispatch(SetLoading(false));
      console.log(err);
    }
  }

  const onDelete = async (id) => {
    try {
      dispatch(SetLoading(true));
      const res = await deleteProject(id);
      if (res.success) {
        message.success(res.message);
        getDetails();
      }
      else {
        throw new Error(res.message);
      }
      dispatch(SetLoading(false));
    }
    catch (err) {
      dispatch(SetLoading(false));
      console.log(err);
    }
  }

  React.useEffect(() => {
    getDetails();
  }, [])


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => text.toUpperCase(),
    },
    {
      title: 'Created/Updated At',
      dataIndex: 'updatedAt',
      render: (text, record) => (
        <span>{getDateFormat(record.updatedAt)}</span>
      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <div className='flex gap-4'>
          <i className="ri-pencil-line cursor-pointer" 
          onClick={() => {
            setSelectedProject(record);
            setShow(true);
          }}
          >
          </i>
          <i className="ri-delete-bin-line cursor-pointer"
          onClick={() => {
            onDelete(record._id);
          }}
          >
          </i>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className='flex justify-end'>
        <Button type='primary' className='rounded mt-7' onClick={() =>{
          setSelectedProject(null);
          setShow(true);
        } }>
          Add Project </Button>
      </div>
      <Table bordered className="border border-black-300 mt-5" columns={columns} dataSource={projects} />
      {show && <ProjectForm show={show} setShow={setShow} reloadData={getDetails} project={selectedProject} />}

    </div>
  )
}

export default Projects