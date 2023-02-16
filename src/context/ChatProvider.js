import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children } ) => {
    const [user, setUser] = useState();
    // const navigate = useNavigate();
    // const location = useLocation();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        // if (!userInfo) {
        //     navigate('/', {replace: true});
        // }
    }, []);

    return (
        <ChatProvider.Provider value={{ user, setUser }}>
            {children}
        </ChatProvider.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;