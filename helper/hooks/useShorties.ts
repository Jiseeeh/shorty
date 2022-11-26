import { useState, useEffect } from "react";
import axios from "axios";

import IShorty from "../../interfaces/IShorty";
import IUser from "../../interfaces/IUser";

export const useUserShorties = () => {
  const [shorties, setShorties] = useState<IShorty[]>([]);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  const fetchUserShorties = async () => {
    const userSessionInfo = sessionStorage.getItem("userInfo");
    if (userSessionInfo === null) return;

    const response = await axios.get("/api/shorties", {
      params: {
        id: JSON.parse(userSessionInfo).id,
      },
    });
    setShorties(response.data.shorties);
  };

  useEffect(() => {
    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo !== null) setUserInfo(JSON.parse(userInfo));

    fetchUserShorties();
  }, []);

  return { userInfo, shorties, setShorties };
};
