import React, { useEffect, useState } from 'react'
import PageInfo from '../components/PageInfo'
import { Input, Modal, Select, Switch } from 'antd'
import CustomTable from '../components/CustomTable'
import { DashOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import useDebounce from '../hook/useDebaunce'
import {usePath} from '../hook/usePath'
import {useAxios} from '../hook/useAxios'
import { useNavigate } from 'react-router-dom'

function Organization() {
  const [tBodyData, setTBodyData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [innData, setInnData] = useState([])
  const navigate = useNavigate()

  const tHeadData = [
    {
      title: 'Id',
      dataIndex: 'key',
    },
    {
      title: 'Nomi',
      dataIndex: 'name',
    },
    {
      title: 'INN',
      dataIndex: 'inn',
    },
    {
      title: 'Direktor',
      dataIndex: 'director',
    },
    {
      title: 'Yaratilgan vaqt',
      dataIndex: 'createdAt',
    },
    {
      title: 'Holati',
      dataIndex: 'status',
    },
    {
      title: 'Manzil',
      dataIndex: 'address',
    },
    {
      title: 'Batafsil',
      dataIndex: 'action',
    },
  ]

  // Search start
  const [searchData, setSearchData] = useState("")
  function handleSearchOrganization(e) {
    setIsLoading(true)
    setSearchData(e.target.value.toLowerCase())
    if(!e.target.value){
      setTimeout(() => setRefresh(!refresh), 1000)
    }
  }
  const searchByName = useDebounce(searchData, 1000)

  useEffect(() => {
    if(searchByName){
      setIsLoading(false)
      const filteredData = tBodyData.filter(item => item.name.toLowerCase().includes(searchByName))
      setTBodyData(filteredData)
    }
  }, [searchByName])
  // Search end

  // INN start
  const [innId, setInnId] = useState("")
  function handleInnSelectChange(e){
    setIsLoading(true)
    setTimeout(() => setInnId(e), 1000)
  }
  // INN end

  // Delete start
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  function handleDelete(id){
    setDeleteModal(true)
    setDeleteId(id)
  }

  function handleSureDelete(){
    setDeleteModal(false)
    setIsLoading(true)
    useAxios().delete(`/organization/${deleteId}`).then(res => {
      setTimeout(() => {
        setIsLoading(false)
        setRefresh(!refresh)
      }, 1000)
    })
  }
  // Delete end

  // Switch start
  function handleChangeSwitch(item, evt){
    item.status = evt
    useAxios().put(`/organization/${item.id}`, item).then(res => {
      setRefresh(!refresh)
    })
  }
  // Switch end
  
  // Get all start
  useEffect(() => {
    useAxios().get(`/organization?=${innId ? innId : ""}`).then(res => {
      setIsLoading(false)
      setTBodyData(res.data.map((item, index) => {
        item.action = <div className='flex items-center gap-5'>
          <DashOutlined onClick={() => navigate(`${item.id}`)} className='hover:scale-[2] duration-300 cursor-pointer hover:text-blue-500'/>
          <EditOutlined onClick={() => navigate(`/edit/${item.id}`)} className='hover:scale-[2] duration-300 cursor-pointer hover:text-green-500'/>
          <DeleteOutlined onClick={() => handleDelete(item.id)} className='hover:scale-[2] duration-300 cursor-pointer hover:text-red-500'/>
        </div>
        item.key = index + 1
        item.status = <Switch onChange={(evt) => handleChangeSwitch(item, evt)} checked={item.status}/>
        return item
      }))
    })
  }, [refresh, innId])

  useEffect(() => {
    useAxios().get("/organization").then(res => {
      setInnData(res.data.map(item => {
         return {
          label:`INN: ${item.inn}`,
          value:item.id
        }
      }))
    })
  }, [])
  // Get all end
  

  return (
    <div className='p-5'>
      <PageInfo addPath={usePath.organizationAdd} btnTitle={"Qo'shish"} title={"Tahskilotlar"} subtitle={"tahskilotlar"} count={5}/>
      <div className='my-5 flex items-center gap-5'>
        <Input onChange={handleSearchOrganization} className='w-[300px] ' allowClear placeholder='Qidirish...' type='text' size='large'/>
        <Select
        onChange={handleInnSelectChange}
        className='w-[300px]'
        showSearch
        allowClear
        placeholder="INN bo'yicha tanlang"
        size='large'
        optionFilterProp='label'
        options={innData}
        />
      </div>
      <CustomTable isLoading={isLoading} tHead={tHeadData} tBody={tBodyData}/>
      <Modal onOk={handleSureDelete} title="O'chirilsinmi?" open={deleteModal} onCancel={() => setDeleteModal(false)}/>
    </div>
  )
}

export default Organization