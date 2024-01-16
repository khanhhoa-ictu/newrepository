import { Button, Form, Input, Modal, Select, notification } from 'antd';
import { getAllUser } from 'api/home';
import TableCustom from 'components/TableCustom';
import Loading from 'components/loading';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styles from './style.module.scss';
import { useForm } from 'antd/lib/form/Form';
import { addUser, deleteUser, editUser } from 'api/manager';
import { handleErrorMessage } from 'helper';

const { Option } = Select;

function Home() {
  const { data, isFetching, refetch } = useQuery('listUser', () => getAllUser());
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [form] = useForm()
  const [id, setId] = useState('')
  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      refetch();
    } catch (error) {
      handleErrorMessage(error);
    }
  };
  const columns = [
    {
      title: 'username',
      dataIndex: 'username',
      key: 'username',
    },

    {
      title: 'role',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      render: (action: any, record: any) => {
        return (
          <div key={record?._id} className="color-blue font-medium cursor-pointer break-word">
            {record?.isAdmin ? "admin" : "user"}
          </div>
        );
      },
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (action: any, record: any) => {
        return (
          <div key={record?._id} className="color-blue font-medium cursor-pointer break-word">
            <Button onClick={()=>handleUpdate(record)}>Sửa</Button>
            <Button onClick={() => handleDeleteUser(record?._id)}>Xóa</Button>
          </div>
        );
      },
    },
  ];

  if (isFetching) {
    return <Loading />;
  }
  const handleUpdate = async(record:any) =>{
    setIsOpenModal(true)
    form.setFieldsValue({
      username: record?.username,
      role: record?.isAdmin ? 'admin' : 'user'
    });
    setId(record?._id)
  }

  const  handleCancel =() =>{
    setIsOpenModal(false);
    form.resetFields()
    setId("")
  }
  const handleSubmit = async(values:any) =>{
    if(!values.username){
      return notification.error({message: "please enter name"})
    }
    if(id){
      try {
        await editUser(values, id);
        refetch()
        handleCancel()
      } catch (error) {
        handleErrorMessage(error);
      }
      return
    }
    
    try {
      await addUser(values);
      refetch()
      handleCancel()
    } catch (error) {
      handleErrorMessage(error);
    }
  }
  return (
    <div className="manager">
      <div className="container-manager">
        <div className={styles.postContainer}>
          <div className={styles.addUser}>
            <Button className={styles.add} onClick={()=>setIsOpenModal(true)}>Thêm người dùng</Button>
          </div>
          <TableCustom dataSource={data} columns={columns} />
        </div>
      </div>
      <Modal title={id ? "update user" :"Add user"} open={isOpenModal} onOk={()=>form.submit()} onCancel={handleCancel}>
      <Form form={form} onFinish={handleSubmit} className={styles.formContainerItem}>
              <Form.Item
                name="username"
                wrapperCol={{ span: 24 }}
              >
                <Input className={styles.customInputLogin} placeholder="Tên tài khoản" maxLength={50} />
              </Form.Item>
              {
                !id &&  <Form.Item
                name="password"
                wrapperCol={{ span: 24 }}
              >
                <Input type='password' className={styles.customInputLogin} placeholder="password" maxLength={50} />
              </Form.Item>
              }
              
              <Form.Item
                name="role"
                wrapperCol={{ span: 24 }}
                initialValue="user"
              >
                <Select>
                  <Option value={"user"}>user</Option>
                  <Option value={"admin"}>admin</Option>
                </Select>
              </Form.Item>
             
              
            </Form>
      </Modal>
      
    </div>
  );
}

export default Home;
