import "./about.css";
import { useContext,useState,useEffect } from "react";
import { Context } from "../../context/Context";
import 'antd/dist/reset.css';
import { Card } from 'antd';
import axios from "axios";
import moment from "moment";
export default function About() {
    const { user } = useContext(Context);
    const [pays, setPays] = useState([]);
    const [device, setDevice] = useState("");
    const [activeTabKey2, setActiveTabKey2] = useState('admin');
    const handleRecord = async (e) => {
      e.preventDefault();
      const newRecord = {
        username:user.username,
        device:device,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      };
      try {
        await axios.post("http://101.43.5.148:5000/api/records", newRecord)
        window.location.reload();                    
      } catch (err) {}
    };
    const checkFee = async (e) => {
      e.preventDefault();
      window.location.href = `http://101.43.5.148:3000/#/profile/${user._id}`;

    };
    const onTab2Change = (key) => {
      setActiveTabKey2(key);
    };
    const tabListNoTitle = [
      {
        key: 'admin',
        tab: '管理员',
      },
      {
        key: 'despoit',
        tab: '充值',
      },
      {
        key: 'device',
        tab: '选择设备',
      },
      {
        key: 'money',
        tab: '消费',
      }
    ];
    const contentListNoTitle = {
      admin:<p>{user.isAdmin===true ? (
        <a href="#/admin"><span>点击进入管理员页面</span></a>
      ) : (
        <span>你不是管理员</span>
      )}</p>,
      despoit:pays.map((pay) => ( <img
      style={{
        width: '100%',
      }}
      src={`http://101.43.5.148:5000/images/${pay.photo}`}
      alt=""
      />)),
      device:<p>
      <input 
        type="text"
        style={{
          width: '100%',
        }} 
        className="writeInput"
        placeholder="选择自己使用的设备"
        onChange={(e) => setDevice(e.target.value)} />
      <button 
        className="settingsSubmit"
        style={{
          width: '100%',
        }}
        onClick={handleRecord}>
        设备信息卡上的设备名
      </button>   
      </p>,
      money:<p>
        <button onClick={checkFee}>查看费用</button>
     </p>,
    };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://101.43.5.148:5000/api/pays`);
          setPays(res.data);
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
