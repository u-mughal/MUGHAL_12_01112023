import yoga from "@/Icones/yoga.svg";
import swim from "@/Icones/swim.svg";
import bike from "@/Icones/bike.svg";
import barbell from "@/Icones/barbell.svg";

function Sidebar() {
  return (
    <div className="side-bar__main">
      <div className="main__icones-container">
        <img className="svg" src={yoga} alt="Yoga Icon" />
        <img className="svg" src={swim} alt="Swim Icon" />
        <img className="svg" src={bike} alt="Bike Icon" />
        <img className="svg" src={barbell} alt="Barbell Icon" />
      </div>
      <div className="main__copyright-container">
        <p>Copyright, SportSee 2023</p>
      </div>
    </div>
  );
}

export default Sidebar;
