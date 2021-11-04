import { createContext, useState } from 'react';

const store = createStore;

export const StoreContext = createContext(store);

const createStore = () => {
    const [isAuthenticated, setIsAuthenticated] = useState({accessToken: null, authenticated: false});
    const [isPost, setIsPost] = useState({subreddit: null, post: false})
    const [isDarkMode, setIsDarkMode] = useState(false);

    return ({
        isAuthenticated,
        setIsAuthenticated,
        isDarkMode,
        setIsDarkMode,
        isPost,
        setIsPost,
    });
}

export default createStore;
