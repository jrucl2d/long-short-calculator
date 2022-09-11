import React, { useState, useEffect } from "react";
import "./App.css";
import bgLong from "./bg_long.png";
import bgShort from "./bg_short.png";
import tanguPic from "./tangu.png";
import html2canvas from "html2canvas";
import Draggable from "react-draggable";

function App() {
  const [coin, setCoin] = useState("BTCUSDT");
  const [entryPrice, setEntryPrice] = useState(22898.0);
  const [closingPrice, setClosingPrice] = useState(23000.0);
  const [isLong, setIsLong] = useState(true);
  const [coinLoc, setCoinLoc] = useState({ x: 43, y: 140 });
  const [levLoc, setLevLoc] = useState({ x: 300, y: 200 });
  const [entryLoc, setEntryLoc] = useState({ x: 300, y: 220 });
  const [CloseLoc, setCloseLoc] = useState({ x: 300, y: 240 });
  const [percentLoc, setPercentLoc] = useState({ x: 43, y: 160 });
  const [numsLoc, setNumsLoc] = useState([250, 306, 349]);
  const [numLocLR, setNumLocLR] = useState(290);
  const [leverage, setLeverage] = useState(75);
  const [fontSize, setFontSize] = useState(0);
  const [result, setResult] = useState(
    ((closingPrice / entryPrice - 1) * 75 * 100).toFixed(2)
  );
  const [tangu, setTangu] = useState(false);

  useEffect(() => {
    console.log(coinLoc, levLoc, entryLoc, CloseLoc, percentLoc);
}, [coin]);

  useEffect(() => {
    const calculated = (
      (closingPrice / entryPrice - 1) *
      leverage *
      100
    ).toFixed(2);
    if (!isLong && calculated < 0) {
      setResult(-calculated);
    } else {
      setResult(calculated);
    }
  }, [entryPrice, closingPrice, coin, isLong, leverage]);

  function downLoad() {
    console.log("download started!");
    const name =
      (isLong ? "Long-" : "Short-") +
      coin +
      "-" +
      entryPrice +
      "-" +
      closingPrice;

    const image = document.getElementById("image");
    html2canvas(image).then((canvas) => {
      onSaveAs(canvas.toDataURL("image/png"), name + ".png");
    });
  }

  function down() {
    const one = numsLoc[0] + 1;
    const two = numsLoc[1] + 1;
    const three = numsLoc[2] + 1;
    setNumsLoc([one, two, three]);
  }
  function up() {
    const one = numsLoc[0] - 1;
    const two = numsLoc[1] - 1;
    const three = numsLoc[2] - 1;
    setNumsLoc([one, two, three]);
  }
  function left() {
    setNumLocLR(numLocLR + 1);
  }
  function right() {
    setNumLocLR(numLocLR - 1);
  }
  function fontUp() {
    setFontSize(fontSize + 1)
  }
  function fontDown() {
    setFontSize(fontSize - 1)
  }

  const onSaveAs = (uri, filename) => {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <span>
        롱(체크)/숏(미체크) &nbsp;
        <input
          type="checkbox"
          checked={isLong}
          onChange={(e) => setIsLong(!isLong)}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        코인종류 &nbsp;
        <input value={coin} onChange={(e) => setCoin(e.target.value)} />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        Leverage &nbsp;
        <input value={leverage} onChange={(e) => setLeverage(e.target.value)} />
      </span>
      <br />
      <br />
      <span>
        매수금액 &nbsp;
        <input
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        매도금액 &nbsp;
        <input
          value={closingPrice}
          onChange={(e) => setClosingPrice(e.target.value)}
        />
      </span>
      <br />
      <br />
      <button onClick={up}>숫자 위로</button>
      <br />
      <br />
      <button onClick={left}>숫자 좌로</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={right}>숫자 우로</button>
      <br />
      <br />
      <button onClick={down}>숫자 아래로</button>
      <br />
      <br />
      <button onClick={fontDown}>폰트 작게</button>
      &nbsp;&nbsp;&nbsp;
      <button onClick={fontUp}>폰트 크게</button>
      &nbsp;&nbsp;&nbsp;
      <button onClick={downLoad}>다운로드</button>
      <br />
      <br />
      <div
        id="image"
        style={{
          backgroundImage: `url(${tangu ? tanguPic : (isLong ? bgLong : bgShort)})`,
          backgroundSize: "cover",
          height: "570px",
          width: "570px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <Draggable onDrag={(e, data) => setCoinLoc({ x: data.x, y: data.y })}>
          <div
            style={{
              position: "absolute",
              left: "47px",
              top: "140px",
              fontSize: fontSize + 20 + "px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            {coin}
          </div>
        </Draggable>
        <Draggable onDrag={(e, data) => setLevLoc({ x: data.x, y: data.y })}>
          <div
            style={{
              position: "absolute",
              right: numLocLR + "px",
              top: numsLoc[0] + "px",
              fontSize: fontSize + 20 + "px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            {leverage}X
          </div>
        </Draggable>
        <Draggable onDrag={(e, data) => setEntryLoc({ x: data.x, y: data.y })}>
          <div
            style={{
              position: "absolute",
              right: numLocLR + "px",
              top: numsLoc[1] + "px",
              fontSize: fontSize + 20 + "px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            ₮{entryPrice}
          </div>
        </Draggable>

        <Draggable onDrag={(e, data) => setCloseLoc({ x: data.x, y: data.y })}>
          <div
            style={{
              position: "absolute",
              right: numLocLR + "px",
              top: numsLoc[2] + "px",
              fontSize: fontSize + 20 + "px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            ₮{closingPrice}
          </div>
        </Draggable>
        <Draggable
          onDrag={(e, data) => setPercentLoc({ x: data.x, y: data.y })}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "40px",
                top: "192px",
                fontSize: fontSize + 38 + "px",
                color: "rgb(31, 163, 178)",
                fontFamily: "HarmonyOS Sans",
                fontWeight: "500",
                cursor: "pointer"
              }}
            >
              {result > 0 ? (
                <span
                  style={{
                    fontSize: fontSize + 38 + "px",
                    fontWeight: "400",
                  }}
                >
                  +
                </span>
              ) : (
                ""
              )}
              {result}
              <span
                style={{
                  fontSize: fontSize + 24 + "px",
                  fontWeight: "500",
                }}
              >
                %
              </span>
            </div>
          </div>
        </Draggable>
      </div>
      <br />
      <br />
      <div>
        <i>Made By</i> <b>Jung Ji </b><span onClick={() => setTangu(!tangu)}><b>Ho</b></span>
      </div>
    </div>
  );
}

export default App;
