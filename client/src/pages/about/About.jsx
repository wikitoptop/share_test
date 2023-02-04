import "./about.css";

export default function About() {
    const PF = "http://101.43.5.148:5000/images/";
  return (
    <div className="header">
      <img
        className="headerImg"
        src={PF + "about.jpg"}
        alt=""
      />
    </div>
  );
}
