import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Apis() {
  const [globaldata, setGlobaladata] = useState([]);
  useEffect(() => {
    axios
      .get("https://corona.lmao.ninja/v2/all")
      .then((Response) => {
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return <></>;
}
