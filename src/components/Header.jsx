import { AppleOutlined, BellOutlined } from '@ant-design/icons'
import { Badge, Button, Modal, Spin } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogOut = () => {
    setIsOpenModal(true)
  }

  const handleSureLogOut = () => {
    setIsLoading(true)
    localStorage.clear()

    setTimeout(() => {
      setIsLoading(false)
      setIsOpenModal(false)
      window.location.pathname = "/"
    }, 1000)
  }

  return (
    <div className='bg-[#001529] border-b-[1px] border-white flex items-center justify-between p-5'>
      <Link className='pl-2 flex items-center' to={'/'}>
        <AppleOutlined className='text-white scale-[2]' />
        <span className='text-white text-[25px] pl-5'>Apple</span>
      </Link>
      <div className='flex items-center gap-5'>
        <Badge count={5} size='small'>
          <BellOutlined className='text-white scale-[2]' />
        </Badge>
        <Button onClick={handleLogOut} size='large' type='primary'>Log Out</Button>
      </div>
      <Modal open={isOpenModal} onOk={handleSureLogOut} onCancel={() => setIsOpenModal(false)}> {isLoading ? ( <Spin /> ) : ( <p>Bu foydalanuvchidan chiqmoxchimisiz?</p> )} </Modal>
    </div>
  );
}

export default Header;
