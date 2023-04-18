import "./header.css";

export default function Header() {
  const PF = "http://101.43.5.148:5000/images/";
  return (
    <div className="header">
      <div className="headerTitles">
          Share it !
      </div>
      <img
        className="headerImg"
        src={PF + "bg.jpg"}
        alt=""
      />
    </div>
  );
}
