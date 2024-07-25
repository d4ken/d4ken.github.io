import { useState, useEffect } from "react";
import sound from "./assets/sounds/hato_se.mp3";

const App = () => {
  const se = new Audio(sound, {
    interop: true,
  });

  const [count, setCount] = useState(0);
  const [autoClickersCount, setAutoClickersCount] = useState(0);
  const [autoClickerCost, setAutoClickerCost] = useState(10);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + autoClickersCount);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [autoClickersCount]);

  function playAudioWaitEnd(audio) {
    return new Promise((res) => {
      audio.play();
      audio.onended = res;
    });
  }

  async function handleClick(audio) {
    setIsClicked(true);
    setCount(count + 1);
    await playAudioWaitEnd(audio);
    setIsClicked(false);
  }

  const buyAutoClicker = () => {
    if (count >= autoClickerCost) {
      setCount(count - autoClickerCost);
      setAutoClickersCount(autoClickersCount + 1);
      setAutoClickerCost(Math.floor(autoClickerCost * 1.2));
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>クリッカーゲーム</h1>
      <p>カウント: {count}</p>
      <button
        disabled={isClicked}
        onClick={async () => await handleClick(se)}
        style={{ fontSize: "20px", padding: "10px 20px", marginBottom: "10px" }}
      >
        クリック!
      </button>
      <br />
      <button
        onClick={buyAutoClicker}
        style={{ fontSize: "16px", padding: "5px 10px" }}
      >
        自動クリッカーを購入 (コスト: {autoClickerCost})
      </button>
      <p>自動クリッカー: {autoClickersCount}</p>
    </div>
  );
};
export default App;
