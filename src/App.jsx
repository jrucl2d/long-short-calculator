import React, { useState, useEffect } from "react";
import "./App.css";
import bgLong from "./bg_long.png";
import bgShort from "./bg_short.png";
import tanguPic from "./tangu.png";
import html2canvas from "html2canvas";

function App() {
  const [coin, setCoin] = useState("BTCUSDT");
  const [entryPrice, setEntryPrice] = useState(22898.0);
  const [closingPrice, setClosingPrice] = useState(23000.0);
  const [isLong, setIsLong] = useState(true);
  const [numsLoc, setNumsLoc] = useState([248, 285, 321]);
  const [numLocLR, setNumLocLR] = useState(315);
  const [leverage, setLeverage] = useState(75);
  const [result, setResult] = useState(
    ((closingPrice / entryPrice - 1) * 75 * 100).toFixed(2)
  );
  const [tangu, setTangu] = useState(false);

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
        ???(??????)/???(?????????) &nbsp;
        <input
          type="checkbox"
          checked={isLong}
          onChange={(e) => setIsLong(!isLong)}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        ???????????? &nbsp;
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
        ???????????? &nbsp;
        <input
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        ???????????? &nbsp;
        <input
          value={closingPrice}
          onChange={(e) => setClosingPrice(e.target.value)}
        />
      </span>
      <br />
      <br />
      <button onClick={up}>?????? ??????</button>
      <br />
      <br />
      <button onClick={left}>?????? ??????</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={right}>?????? ??????</button>
      <br />
      <br />
      <button onClick={down}>?????? ?????????</button>
      <br />
      <br />
      <button onClick={downLoad}>????????????</button>
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

          <div
            style={{
              position: "absolute",
              left: "43px",
              top: "132px",
              fontSize: 19 + "px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            {coin}
          </div>
         
          <div
            style={{
              position: "absolute",
              right: numLocLR + "px",
              top: numsLoc[0] + "px",
              fontSize: 18 + "px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            {leverage}X
          </div>
          <div
            style={{
              position: "absolute",
              right: numLocLR + "px",
              top: numsLoc[1] + "px",
              fontSize: 18 + "px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            ???{entryPrice}
          </div>
          <div
            style={{
              position: "absolute",
              right: numLocLR + "px",
              top: numsLoc[2] + "px",
              fontSize: 18 + "px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            ???{closingPrice}
          </div>

          <div
            style={{
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "40px",
                top: "170px",
                fontSize: 40 + "px",
                color: "rgb(31, 163, 178)",
                fontFamily: "HarmonyOS Sans",
                fontWeight: "500",

              }}
            >
              {result > 0 ? (
                <span
                  style={{
                    fontSize: 40 + "px",
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
                  fontSize: 20 + "px",
                  fontWeight: "500",
                }}
              >
                %
              </span>
            </div>
          </div> 
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
