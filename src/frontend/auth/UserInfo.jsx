import UserContext from "./UserContext";
import { useState } from "react";

const UserInfo = ({children}) => {
    const [uid, setUID] = useState('');
    return (
    <UserContext.Provider value={{ uid, setUID}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserInfo;