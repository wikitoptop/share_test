import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Card } from 'antd';
import 'antd/dist/reset.css';
import { Context } from "../../context/Context";
import { useContext } from "react";
import moment from "moment";
import { Link,useLocation } from "react-router-dom";
const Profile = () => {
  const { user } = useContext(Context);
  const [usernow, setUser] = useState({});
  const [cash, setCash] = useState();
  const [posts, setPosts] = useState([]);
  const [records, setRecords] = useState([]);
  const [device, setDevice] = useState("");
  const [pays, setPays] = useState([]);
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const handleDeposit = async (e) => {
    e.preventDefault();
      const newUser = {
        userId: usernow._id,
        username:usernow.username,
        useraddress:usernow.useraddress,
        cash:usernow.cash+~~cash,
      };
      try {
        await axios.put(`http://101.43.5.148:5000/api/users/this/${usernow._id}`, newUser);
        window.location.reload();             
      } catch (err) {}
  };
  const handleUse = async (e) => {
    e.preventDefault();
      const newUser = {
        userId: usernow._id,
        username:usernow.username,
        useraddress:usernow.useraddress,
        cash:usernow.cash-~~cash,
        device:"",
      };
      try {
        await axios.delete(`http://101.43.5.148:5000/api/records/${device}`);
        await axios.put(`http://101.43.5.148:5000/api/users/this/${usernow._id}`, newUser);
        window.location.reload();            
      } catch (err) {}
  };
  const [activeTabKey2, setActiveTabKey2] = useState('addcash');
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  const tabListNoTitle = [
    {
        key: 'addcash',
        tab: '充值',
    },
    {
      key: 'pay',
      tab: '支付',
    },
    {
      key: 'log',
      tab: '发帖记录',
    },
  ];
  const contentListNoTitle = {
    addcash:<p>
    <p>{usernow.username}选择的设备:{usernow.device} 余额：{usernow.cash}</p>
      {user.isAdmin===true ? (
    <>
    <input
        type="text"
        style={{
            width: '100%',
          }} 
        className="writeInput"
        placeholder="充值多少"
        onChange={(e) => setCash(e.target.value)} />
    <button onClick={handleDeposit}
            className="settingsSubmit"
            style={{
              width: '100%',
            }}>
        充值
    </button>            
    
    </>
      ) : (
        <span>你不是管理员</span>
      )}
 

    </p>,
    pay:<p>
    <p>{usernow.username}选择的设备:{usernow.device} 余额：{usernow.cash}</p>
    {records.map((record) => (
      <p> {record.username}使用{record.device}设备，已经{moment(record.createdAt).fromNow()}前运行,需支付{(moment().diff(record.createdAt,'minutes'))*pays.fee}元</p>                    
    ))}
      {user.isAdmin===true ? (
        <>
    <input 
        type="text"
        style={{
            width: '100%',
          }} 
        className="writeInput"
        placeholder="取整支付,忽略小数部分"
        onChange={(e) => setCash(e.target.value)} />
    <input 
        type="text"
        style={{
            width: '100%',
          }} 
        className="writeInput"
        placeholder="同步删除的设备"
        onChange={(e) => setDevice(e.target.value)} />
    <button onClick={handleUse} 
            className="settingsSubmit"
            style={{
              width: '100%',
            }}>
        支付
    </button>           
        </>
      ) : (
        <span>你不是管理员</span>
      )}
    </p>,
    log:<p>
      {user.isAdmin===true ? (
        <>
            {posts.map((post) => (
                <div key={post.id}>
                    <p>{post.username}:</p>
                    <Link to={`/post/${post._id}`}>
                        <b>{post.title}</b>
                    </Link>
                </div>
            ))}   
        </>
      ) : (
        <span>你不是管理员</span>
      )}

    </p>,
  };

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://101.43.5.148:5000/api/records`);
      setRecords(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://101.43.5.148:5000/api/pays`);
      setPays(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  fetchData();
}, []);
  useEffect(() => {
    const fetchPosts = async () => {
    const res = await axios.get(`http://101.43.5.148:5000/api/posts`);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://101.43.5.148:5000/api/users/${userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [userId,usernow.cash]);

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

export default Profile;
