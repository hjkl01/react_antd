import { CheckCard } from "@ant-design/pro-components";
import React from "react";
import axios from "axios";

export default function Shop() {
  const [shop, setShop] = React.useState(null);

  React.useEffect(() => {
    let baseUrl = "https://me.hjkl01.cn:19001/api/meituan/reload/";
    axios.get(baseUrl).then((response) => {
      setShop(response.data);
    });
  }, []);
  if (!shop) return null;

  console.log("shop", shop);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
      }}
    >
      {shop.map((sp, index: number) => (
        <div>
          <CheckCard
            avatar={sp.frontImg}
            title={sp.name}
            onChange={() => {
              alert("checked");
            }}
          />
        </div>
      ))}
    </div>
  );
}
