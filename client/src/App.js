import { useEffect, useState } from "react";
import logo from "./images/logo.png";
import tele from "./images/tele.png";
import down from "./images/down.svg";

function App() {
  const [dataList, setDataList] = useState([]);
  
  const retrieveData = async () => {
    try {
      const response = await fetch("/api/v1/tasks");
      const result = await response.json();
      if (result) {
        setDataList(result.tasks);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <>
      <header className="header">
        <div className="header-main">
          <img src={logo} alt="Logo" width="260px" />
        </div>
        <div className="dropdown dropdown1">
          <button className="dropbtn">
            INR <img src={down} alt="Dropdown" width="10px" />
          </button>
          <div className="dropdown-content">
            <a href="#">INR</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            BTC <img src={down} alt="Dropdown" width="10px" />
          </button>
          <div className="dropdown-content">
            <a href="#">BTC</a>
            <a href="#">ETH</a>
            <a href="#">USDT</a>
            <a href="#">XRP</a>
            <a href="#">TRX</a>
            <a href="#">DASH</a>
            <a href="#">ZEC</a>
            <a href="#">XEM</a>
            <a href="#">IOST</a>
            <a href="#">WIN</a>
            <a href="#">BIT</a>
            <a href="#">WRX</a>
          </div>
        </div>
        <div className="number">
          <div className="number-circle">
            <p>58</p>
          </div>
        </div>
        <div className="join-btn">
          <a href="https://hodlinfo.com/connect/telegram" target="_blank" rel="noopener noreferrer">
            <button>
              <img src={tele} alt="Telegram" width="20px" /> Connect Telegram
            </button>
          </a>
        </div>
      </header>
      
      <section className="power">
        Powered By <span className="fin">Finstreet</span>
      </section>
      
      <div className="final-data">
        <ul>
          <li>
            <span className="space"></span> # <span className="space"></span> name{" "}
            <span className="space"></span> Last <span className="space"></span>{" "}
            Buy / Sell Price <span className="space"></span> volume{" "}
            <span className="space"></span> base_unit
          </li>
          {dataList.map((item, idx) => (
            <div className="list" key={item._id}>
              <div className="listIndex">{idx + 1}</div>
              <div className="listName">{item.name}</div>
              <div className="listPrice">₹{item.last}</div>
              <div className="listTrade">₹{item.buy} / ₹{item.sell}</div>
              <div className="listVolume">{item.volume}</div>
              <div className="listUnit">{item.base_unit}</div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
