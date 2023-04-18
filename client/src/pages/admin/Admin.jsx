import React from "react";
import { Card } from 'antd';
import 'antd/dist/reset.css';
import "./admin.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Context } from "../../context/Context";
import { useContext } from "react";
const Admin = () => {
  const { user } = useContext(Context);
  const [time, setTime] = useState("");
  const [deleteTime, setdeleteTime] = useState("");
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);
  const [fee, setFee] = useState(0.2);
  const [device, setDevice] = useState("");
  const [books, setBooks] = useState([]);
  const [deleteDevice, setdeleteDevice] = useState("");
  const [activeTabKey2, setActiveTabKey2] = useState('userInfo');
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDevice = {
        device:device,
      };
      try {
        await axios.post("http://101.43.5.148:5000/api/devices", newDevice)
        window.location.reload();                
      } catch (err) {}
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://101.43.5.148:5000/api/devices/${deleteDevice}`);
      window.location.reload();
    } catch (err) {}
  };
  const handleDeleteTime = async () => {
    try {
      await axios.delete(`http://101.43.5.148:5000/api/times/${deleteTime}`);
      window.location.reload();
    } catch (err) {}
  };
  const handleTime = async (e) => {
    e.preventDefault();
    const newTime = {
      userId: user._id,
      time,
      };
      try {
        await axios.post("http://101.43.5.148:5000/api/times", newTime)
        window.location.reload();                
      } catch (err) {}
  };
  const tabListNoTitle = [
    {
      key: 'payset',
      tab: '支付方式',
    },
    {
      key: 'userInfo',
      tab: '用户信息',
    },
    {
      key: 'device',
      tab: '设备设置',
    },
    {
      key: 'time',
      tab: '放号时间',
    },
    {
      key: 'prebook',
      tab: '预约信息',
    },
  ];
  const handlePay = async (e) => {
    e.preventDefault();
    const newPay = {
        username:user.username,
        fee:fee,
      };
      if (file) {
        const data =new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPay.photo = filename;
        try {
          await axios.post("http://101.43.5.148:5000/api/upload", data);
        } catch (err) {}
      }
      try {
        await axios.post("http://101.43.5.148:5000/api/pays", newPay)
        window.location.reload();                
      } catch (err) {}
  };
  const handleDeletePay = async () => {
    try {
      await axios.delete(`http://101.43.5.148:5000/api/pays/${user.username}`);
      window.location.replace("/");
    } catch (err) {}
  };
  const contentListNoTitle = {
    payset: <p>
    <input
      style={{
        width: '100%',
      }}     
      className="writeInput"
      type="file"
      id="file"
      name=""
      onChange={(e) => setFile(e.target.files[0])}
        />    
    <input 
      style={{
        width: '100%',
      }}
      className="writeInput"
      type="text"
      placeholder="每分钟计费"
      onChange={(e) => setFee(e.target.value)} />
    <button className="settingsSubmit"       
      style={{
        width: '100%',
      }} 
      onClick={handlePay}>
      设置支付方式
    </button>   
    <button className="settingsSubmit"
    style={{
      width: '100%',
    }} 
     onClick={handleDeletePay}>
      重置支付方式
    </button></p>,
    userInfo: <p>{users.map((user2) => (
      <div key={user2._id}>
        <p>{user2.username}:{user2.cash}元</p>
        <Link to={`/profile/${user._id}`}>
          查看信息
        </Link>
      </div>
    ))}</p>,
    device:<p>
          <input 
        type="text"
        style={{
            width: '100%',
          }} 
        className="writeInput"
        placeholder="添加设备"
        onChange={(e) => setDevice(e.target.value)} />
    <button onClick={handleSubmit} 
            className="settingsSubmit"
            style={{
              width: '100%',
            }}>
        添加设备
    </button> 
    <input 
        type="text"
        style={{
            width: '100%',
          }} 
        className="writeInput"
        placeholder="删除设备"
        onChange={(e) => setdeleteDevice(e.target.value)} />
    <button onClick={handleDelete} 
            className="settingsSubmit"
            style={{
              width: '100%',
            }}>
        删除故障设备
    </button> 
    </p>,
    time:<p>
        <input 
      type="text"
      style={{
          width: '100%',
        }} 
      className="writeInput"
      placeholder="添加时间段"
      onChange={(e) => setTime(e.target.value)} />
    <button onClick={handleTime} 
          className="settingsSubmit"
          style={{
            width: '100%',
          }}>
      添加时间段
    </button> 
    <input 
      type="text"
      style={{
          width: '100%',
        }} 
      className="writeInput"
      placeholder="取消"
      onChange={(e) => setdeleteTime(e.target.value)} />
    <button onClick={handleDeleteTime} 
          className="settingsSubmit"
          style={{
            width: '100%',
          }}>
      取消时间段
    </button> 
    </p>,
    prebook:<p>
      <p>收到的预约：</p>
      {books.map((book) => (
        <p>{book.username}在{book.day}这天{book.time}这个时间段预约了{book.device}设备。</p>                         
      ))}
    </p>
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://101.43.5.148:5000/api/users`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://101.43.5.148:5000/api/books`);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <br />
    <Card
      style={{
        width: '100%',
      }}
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey2}
      tabBarExtraContent={<a href="/">首页</a>}
      onTabChange={onTab2Change}
    >
      {contentListNoTitle[activeTabKey2]}
    </Card>
  </>
  );
};

export default Admin;

