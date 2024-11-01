import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Modal, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAxios } from '../hook/useAxios'
import OrganizationMoreItem from '../components/OrganizationMoreItem'

function OrganizationMore() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [singleData, setSingleData] = useState({})
    const [refresh, setRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    // Switch start
    function handleCheckSwitch(e){
        singleData.status = e
        useAxios().put(`/organization/${id}`, singleData).then(res => {
            setRefresh(!refresh)
        })
    }
    // Switch end

    // Delete start
    const [deleteModal, setDeleteModal] = useState(false)
  
    function handleBtnClick(){
        setDeleteModal(true)
    }
  
    function handleSureDelete(){
      setDeleteModal(false)
      setIsLoading(true)
      useAxios().delete(`/organization/${id}`).then(res => {
        setTimeout(() => {
          setIsLoading(false)
          navigate(-1)
        }, 1500)
      })
    }
    // Delete end

    useEffect(() => {
        useAxios().get(`/organization?id=${id}`).then(res => {
            setSingleData(res.data[0])
        })
    }, [refresh])

  return (
    <div className='p-5'>
        <div className='flex mb-5 items-center justify-between'>
           <div className='flex items-center space-x-5'>
            <ArrowLeftOutlined onClick={() => navigate(-1)} className='scale-[1.5] cursor-pointer'/>
           <h2 className='font-bold text-[22px]'>{singleData.name}</h2>
           </div>
            <div className='flex items-center space-x-5'>
                <Switch size='large' onChange={handleCheckSwitch} checked={singleData.status}/>
                <Button onClick={handleBtnClick} icon={isLoading ? <LoadingOutlined/> : <DeleteOutlined/>} className='delete-btn' size='large' type='primary'>Delete</Button>
                <Button onClick={() => navigate(`/edit/${id}`)} icon={<EditOutlined/>} className='update-btn' size='large' type='primary'>Update</Button>
            </div>
        </div>
        <div className='flex justify-between w-[70%]'>
        <ul className='w-[49%] p-5 space-y-5 rounded-md border-[2px] border-slate-500'>
        <OrganizationMoreItem spanTitle={"ID"} strongTitle={singleData.id}/>
        <OrganizationMoreItem spanTitle={"Nomi"} strongTitle={singleData.name}/>
        <OrganizationMoreItem spanTitle={"INN"} strongTitle={singleData.inn}/>            
        <OrganizationMoreItem spanTitle={"Holati"} strongTitle={singleData.status ? "Faol" : "Faol emas"}/>            
        </ul>
        <ul className='w-[49%] p-5 space-y-5 rounded-md border-[2px] border-slate-500'>
        <OrganizationMoreItem spanTitle={"Direktor"} strongTitle={singleData.director}/>
        <OrganizationMoreItem spanTitle={"Manzil"} strongTitle={singleData.address}/>
        <OrganizationMoreItem spanTitle={"Yaratilgan vaqt"} strongTitle={singleData.createdAt}/>
        </ul>
        </div>
        <Modal onOk={handleSureDelete} title="O'chirilsinmi?" open={deleteModal} onCancel={() => setDeleteModal(false)}/>
    </div>
  )
}

export default OrganizationMore