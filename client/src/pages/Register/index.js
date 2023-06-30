import React, { useEffect } from 'react'
import {Form , Input , Button, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import Divider from '../../components/Divider'
import {registerUser} from '../../apicalls/users'
import { useDispatch, useSelector } from 'react-redux'
import { SetButtonLoading } from '../../redux/loadersSlice'

function Register() {
  const { buttonLoading } = useSelector(state => state.loaders)
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem('token')){
      window.location.href = '/';
    }
  }, [])

  const Navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(SetButtonLoading(true));
      const response = await registerUser(values);
      dispatch(SetButtonLoading(false)) ;
      if (response.success) {
        message.success(response.message)
        Navigate('/login')
      }
      else {
        dispatch(SetButtonLoading(false)) ;
        throw new Error(response.message)
      }
    }
    catch (err) {
      message.error(err.message)
    }
  }
  
  return (
    <div className='grid grid-cols-2'>
      <div className='bg-primary h-screen flex flex-col justify-center items-center'>
        <h1 className='text-7xl text-white font-bold'>TaskMaster</h1>
        <span className='text-xl text-white'>
          One Stop Solution to track all your business records
        </span>
      </div>
      <div className='flex justify-center items-center'>
        <div className='w-[500px]'>
          <h1 className='text-2xl'>Create an account to get started!</h1>
          <Divider />
          <Form layout='vertical' className='mt-5' onFinish={onFinish}>
              <Form.Item className='font-medium' label="First Name" name="firstName"
              rules={ [{ required: true, message: 'Please input your first name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item className='font-medium' label="Last Name" name="lastName"
              rules={ [{ required: true, message: 'Please input your last name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item className='font-medium' label="Email" name="email"
              rules={ [{ required: true, message: 'Please input your email!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item className='font-medium' label="Password" name="password"
              rules={ [{ required: true, message: 'Please input your password!' }]}
              >
                <Input type='password' />
              </Form.Item>

              <Button className='mt-4' type="primary" htmlType="submit" block
              buttonLoading={buttonLoading}>
                {buttonLoading ? 'Registering.. ' : 'Register'}
              </Button>

              <div className="flex justify-center mt-3">
                <span>
                  Already have an account ? 
                  <Link to="/login" className="text-primary"> Login</Link>
                </span>
              </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register