import { useState, useEffect } from "react";

import Form from "../components/Form";
import NotLoggedIn from "../components/NotLoggedIn";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const userSessionInfo = sessionStorage.getItem("userInfo");
    if (userSessionInfo !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) return <NotLoggedIn />;

  return (
    <main>
      <Form />
    </main>
  );
}
