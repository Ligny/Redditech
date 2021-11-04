import React, { useContext } from 'react';

import { StoreContext } from './../utils/Store';
import PostPicker from './PostPicker';
import NavBar from './NavBar';

const Redirect = () => {
    const { isPost } = useContext(StoreContext);
    return (
        <>
            {!isPost.post ? <NavBar/>: <PostPicker/> }
        </>
    );
}

export default Redirect;