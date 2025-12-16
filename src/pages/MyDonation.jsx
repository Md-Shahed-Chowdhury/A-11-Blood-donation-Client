import React, { use, useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import { MyContext } from '../provider/ContextProvider';

const MyDonation = () => {
    const {user} = use(MyContext);
    const axiosInstance = useAxios();
    useEffect(()=>{
        axiosInstance.get("/my-blood-request")
        .then(data=>{console.log(data.data)});
    },[axiosInstance,user])
    return (
        <div>
            my donation
        </div>
    );
};

export default MyDonation;