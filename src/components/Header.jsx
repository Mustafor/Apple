import { AppleOutlined, BellOutlined } from '@ant-design/icons'
import { Badge, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='bg-[#001529] border-b-[1px] border-white flex items-center justify-between p-5'>
      <Link className='pl-2 flex items-center' to={'/'}>
        <AppleOutlined className='text-white scale-[2]'/>
        <span className='text-white text-[25px] pl-5'>Apple</span>
      </Link>
      <div className='flex items-center gap-5'>
        <Badge count={5} size='small'>
          <BellOutlined className='text-white scale-[2]'/>
        </Badge>
        <Button size='large' type='primary'>Log Out</Button>
      </div>
    </div>
  )
}

export default Header