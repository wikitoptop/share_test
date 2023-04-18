import 'antd/dist/reset.css';
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { Card } from 'antd';
export default function Prebook() {
  const { user } = useContext(Context);
  const [books, setBooks] = useState([]);
  const [devices, setDevices] = useState([]);
  const [times, setTimes] = useState([]);
  const [records, setRecords] = useState([]);
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [device, setDevice] = useState("");
  const [activeTabKey2, setActiveTabKey2] = useState('log');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
        userId: user._id,
        username:user.username,
        time:time,
        day:day,
        device:device,
      };
      try {   
        await axios.post("http://101.43.5.148:5000/api/books", newBook)
        window.location.reload();             
      } catch (err) {}
  };
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  const tabListNoTitle = [
    {
      key: 'device',
      tab: '查看设备',
    },
    {
      key: 'time',
      tab: '查看时间',
    },
    {
      key: 'prebook',
      tab: '进行预约',
    },
    {
      key: 'log',
      tab: '预约记录',
    },
  ];
  const contentListNoTitle = {
    device:<p>
      <p>所有设备</p>
      {devices.map((device) => (
        <p>{device.device}</p>                       
      ))}
      <p>正在使用的设备</p>
      {records.map((record) => (
        <p>{record.device}</p>                       
      ))}
    </p>,
    time:<p>
      <p>可供选择的时间段</p>
      {times.map((time) => (
        <p>{time.time}</p>                         
      ))}
    </p>,
    prebook:<p>
    <input 
        type="text"
        style={{
            width: '100%',
          }} 
        className="writeInput"
        placeholder="选择日期(2023.1.1)"
        onChange={(e) => setDay(e.target.value)} />
    <input 
        type="text"
        style={{
            width: '100%',
          }} 
        className="writeInput"
        placeholder="选择时间段ex.(9:00-11:00)"
        onChange={(e) => setTime(e.target.value)} />
    <input 
        type="text"
        style={{
            width: '100%',
          }} 
        className="writeInput"
        placeholder="选择设备"
        onChange={(e) => setDevice(e.target.value)} />
    <button onClick={handleSubmit} 
            className="settingsSubmit"
            style={{
              width: '100%',
            }}>
        预约
    </button>       
    </p>,
    log:<p>
      <p>收到的预约-时间优先原则后续预约无效-请提前30分钟不然失效</p>
      {books.map((book) => (
        <p>{book.username}在{book.day}这天{book.time}这个时间段预约了{book.device}设备,预约于 {moment(book.createdAt).fromNow()}前。</p>                         
      ))}
  </p>,
  };
  useEffect(() => {
    const fetchBooks = async () => {
    const res = await axios.get("http://101.43.5.148:5000/api/books/thisuser/" + user._id)
    setBooks(
        res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
    );
    };
    fetchBooks();
}, [user._id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://101.43.5.148:5000/api/devices`);
        setDevices(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://101.43.5.148:5000/api/times`);
        setTimes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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
  }