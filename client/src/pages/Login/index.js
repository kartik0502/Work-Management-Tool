import React, { useEffect } from 'react'
import {Form , Input , Button, message} from 'antd'
import {Link} from 'react-router-dom'
import Divider from '../../components/Divider'
import { loginUser } from '../../apicalls/users'
import { useDispatch, useSelector } from 'react-redux'
import { SetButtonLoading } from '../../redux/loadersSlice'


function Login() {
  
  const { buttonLoading } = useSelector(state => state.loaders)
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('token')){
      window.location.href = '/';
    }
  }, [])

  const onFinish = async (values) => {
    try{
      dispatch(SetButtonLoading(true));
      const response = await loginUser(values);
      dispatch(SetButtonLoading(false));
      if(response.success){
        localStorage.setItem('token', response.data)
        message.success(response.message)
        window.location.href = '/';
      }
      else{
        dispatch(SetButtonLoading(false));
        throw new Error(response.message)
      }
    }
    catch(err){
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
          <h1 className='text-2xl'>Login to your account!</h1>
          <Divider />
          <Form layout='vertical' className='mt-5' onFinish={onFinish}>
              <Form.Item className='font-medium' label="Email" name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item className='font-medium' label="Password" name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input type='password' />
              </Form.Item>

              <Button className='mt-4' type="primary" htmlType="submit" block
              buttonLoading={buttonLoading}>
                {buttonLoading ? 'Logging In' : 'Login'}
              </Button>

              <div className="flex justify-center mt-3">
                <span>
                  Don't have an account ? 
                  <Link to="/register" className="text-primary"> Register</Link>
                </span>
              </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login