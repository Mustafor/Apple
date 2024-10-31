import { AppstoreAddOutlined, ArrowDownOutlined, ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Checkbox, DatePicker, Input } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { HTTP } from '../hook/useEnv'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function OrganizationAdd() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [inn, setInn] = useState("")
  const [director, setDirector] = useState("")
  const [address, setAddress] = useState("")
  const [createdAt, setCreatedAt] = useState("2024-01-01")
  const [status, setStatus] = useState("")
  const dateFormat = 'YYYY-MM-DD';
  const [isLoading, setIsLoading] = useState(false)

  function handleAddOrganization(e){
    e.preventDefault()
    setIsLoading(true)
    const data = {
      name,
      inn,
      director,
      address,
      status,
      createdAt
    }
    axios.post(`${HTTP}/organization`, data).then(res => {
      setTimeout(() => {
        toast.success("Muvaffaqiyatli!")
        setIsLoading(false)
        navigate(-1)
      }, 1000)
    })
  }

  return (
    <form onSubmit={handleAddOrganization} className='p-5'>
      <Toaster position='top-center' reverseOrder={false}/>
      <div className='flex items-center space-y-5 justify-between'>
        <div className='flex items-center space-x-5'>
          <ArrowLeftOutlined onClick={() => navigate(-1)} className='scale-[1.5] cursor-pointer'/>
          <h2 className='font-bold text-[22px]'>Tashkilot qoshish</h2>
        </div>
        <Button htmlType='submit' icon={isLoading ? <LoadingOutlined/> : <AppstoreAddOutlined/>} type='primary' size='large'>Saqlash</Button>
      </div>
      <div className='mb-5 flex justify-between w-[70%]'>
        <div className='w-[49%] space-y-5 p-5 border-[1px] border-slate-400 rounded-md'>
          <label className='flex flex-col'>
            <span className='text-[15px] mb-1 text-slate-400'>Nomini kirting</span>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Nomini kirting' size='large' allowClear/>
          </label>
          <label className='flex flex-col'>
            <span className='text-[15px] mb-1 text-slate-400'>Inn kirting</span>
            <Input type='number' value={inn} onChange={(e) => setInn(e.target.value)} placeholder='Inn kirting' size='large' allowClear/>
          </label>
          <label className='flex flex-col'>
            <span className='text-[15px] mb-1 text-slate-400'>Direktor kirting</span>
            <Input type='text' value={director} onChange={(e) => setDirector(e.target.value)} placeholder='Direktor kirting' size='large' allowClear/>
          </label>
        </div>
        <div className='w-[49%] space-y-5 p-5 border-[1px] border-slate-400 rounded-md'>
          <label className='flex flex-col'>
            <span className='text-[15px] mb-1 text-slate-400'>Manzil kirting</span>
            <Input type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Manzil kirting' size='large' allowClear/>
          </label>
          <label className='flex flex-col'>
            <span className='text-[15px] mb-1 text-slate-400'>Yaratilgan vaqt</span>
            <DatePicker value={dayjs(createdAt, dateFormat)} onChange={(a,b) => setCreatedAt(b)} size='large' placeholder='Vaqt kirting' />
          </label>
          <label className='flex flex-col'>
            <span className='text-[15px] mb-1 text-slate-400'>Holati</span>
            <Checkbox checked={status} onChange={(a) => setStatus(a.target.checked)}>Holati</Checkbox>
          </label>
        </div>
      </div>
    </form>
  )
}

export default OrganizationAdd