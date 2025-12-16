import React, { useEffect, useState } from 'react';
import { MyContext } from '../provider/ContextProvider';
import useAxios from '../hooks/useAxios';

const PendingRequest = () => {
    const [pendingRequest,setPendingRequest] = useState([]);
    const axiosInstance = useAxios();
    useEffect(()=>{
        axiosInstance.get("/pendingRequest")
        .then(data=>{setPendingRequest([...data.data])});
    },[axiosInstance])
    console.log(pendingRequest);
    return (
        <div>
            pending request
        </div>
    );
};

export default PendingRequest;