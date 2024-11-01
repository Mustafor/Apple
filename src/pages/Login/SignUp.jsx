import React, { useContext, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useAxios } from '../../hook/useAxios'
import { Context } from '../../context/Conext'
import toast, { Toaster } from 'react-hot-toast'

const SignUp = () => {
  const { setToken } = useContext(Context)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onFinish = () => {
    const data = { username, password }

    useAxios().post("/users", data).then(res => {
      if(res.status === 201) { 
        toast.success("Foydalanuvchi muvaffaqiyatli yaratildi!")
        setToken(data)
        history.push('/signin')
      } 
      else{
        toast.error("Xatolik yuz berdi")
      }
    })
  }

  return (
    <div className='w-full h-[100vh] relative'>
      <Toaster position='top-center' reverseOrder={false} />
      <Form className='absolute space-y-4 w-[500px] inset-0 m-auto h-[200px]'name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item>
          <Input required placeholder='Ismingizni kirting' onChange={(e) => setUsername(e.target.value)} name='username' size='large' />
        </Form.Item>
        <Form.Item>
          <Input.Password required placeholder='Parol kirting' onChange={(e) => setPassword(e.target.value)} name='password' size='large' />
        </Form.Item>
        <Button className='w-full' size='large' type="primary" htmlType="submit">Sign Up</Button>
      </Form>
    </div>
  );
};

export default SignUp
