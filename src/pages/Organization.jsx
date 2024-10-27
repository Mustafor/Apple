import React, { useEffect, useState } from 'react'
import PageInfo from '../components/PageInfo'
import { Input, Select, Switch } from 'antd'
import CustomTable from '../components/CustomTable'
import { HTTP } from '../hook/useEnv'
import axios from 'axios'
import { DashOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import useDebounce from '../hook/useDebaunce'

function Organization() {
  const [tBodyData, setTBodyData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const tHeadData = [
    {
      title: 'Id',
      dataIndex: 'id',
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

  useEffect(() => {
    axios(`${HTTP}/organization`).then(res => {
      setIsLoading(false)
      setTBodyData(res.data.map(item => {
        item.action = <div className='flex items-center gap-5'>
          <DashOutlined className='hover:scale-[2] duration-300 cursor-pointer hover:text-blue-500'/>
          <EditOutlined className='hover:scale-[2] duration-300 cursor-pointer hover:text-green-500'/>
          <DeleteOutlined className='hover:scale-[2] duration-300 cursor-pointer hover:text-red-500'/>
        </div>
        item.status = <Switch defaultChecked={JSON.parse(item.status)}/>
        return item
      }))
    })
  }, [refresh])

  return (
    <div className='p-5'>
      <PageInfo btnTitle={"Qo'shish"} title={"Tahskilotlar"} subtitle={"tahskilotlar"} count={5}/>
      <div className='my-5 flex items-center gap-5'>
        <Input onChange={handleSearchOrganization} className='w-[300px] ' allowClear placeholder='Qidirish...' type='text' size='large'/>
        <Select
        className='w-[300px]'
        showSearch
        placeholder="INN bo'yicha tanlang"
        size='large'
        optionFilterProp='label'
        options={[
          {
            value: 'jack',
            label: 'Jack',
          }
        ]}
        />
      </div>
      <CustomTable isLoading={isLoading} tHead={tHeadData} tBody={tBodyData}/>
    </div>
  )
}

export default Organization