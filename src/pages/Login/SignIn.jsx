import React, { useContext, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useAxios } from '../../hook/useAxios'
import { Context } from '../../context/Conext'
import toast, { Toaster } from 'react-hot-toast'
import { LoadingOutlined, LoginOutlined } from '@ant-design/icons'

const SignIn = () => {
  const { setToken } = useContext(Context)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = () => {
    const data = { username, password }
    setIsLoading(true)
    useAxios().get("/users").then(res => {
      const isUser = res.data.some(item => item.username === data.username && item.password === data.password)
      if (isUser) {
        setTimeout(() => {
          setIsLoading(false)
          toast.success("Xush kelibsiz " + data.username)
          setToken(data)
        }, 1000);
      } else {
        setTimeout(() => {
          setIsLoading(false)
          toast.error("Foydalanuvchi topilmadi")
          setUsername("")
          setPassword("")
        }, 1000);
      }
    })
  }

  return (
    <div className='w-full h-[100vh] relative'>
      <Toaster position='top-center' reverseOrder={false} />
      <Form className='absolute space-y-4 w-[500px] inset-0 m-auto h-[200px]' name="basic" onFinish={onFinish} autoComplete="off" >
        <Form.Item>
          <Input value={username} required placeholder='Ismingizni kirting' onChange={(e) => setUsername(e.target.value)} name='username' size='large' />
        </Form.Item>
        <Form.Item>
          <Input.Password value={password} required placeholder='Parol kirting' onChange={(e) => setPassword(e.target.value)} name='password' size='large' />
        </Form.Item>
        <a href="sign-up" className='text-[16px]'>Yangi foydalanuvchi qo'shing</a>
        <Button icon={isLoading ? <LoadingOutlined/> : <LoginOutlined/>} className='w-full' size='large' type="primary" htmlType="submit"> Boshlang</Button>
      </Form>
    </div>
  )
}

export default SignIn
