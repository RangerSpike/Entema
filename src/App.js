// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import MainApp from "./MainApp";
import ScaleLoader from "react-spinners/ScaleLoader";

function App() {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#33ccff");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const style = { textAlign: "center" };

  const loader = (
    <ScaleLoader
      loading={loading}
      size={250}
      height={90}
      width={15}
      radius={6}
      margin={2}
      color={color}
    />
  );

  return (
    <div className="App1">
      {loading && <div className="zee"> {loader}</div>}

      {!loading && <MainApp />}
    </div>
  );
}

export default App;
