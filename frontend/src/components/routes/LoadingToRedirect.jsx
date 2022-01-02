
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';


const LoadingToRedirect = () => {

    const [count, setCount] = useState(5);
    let history = useNavigate();

    useEffect(() => {
        const interval = setInterval (() => {
            //decrement count
            setCount((currentCount) => --currentCount);
        },1000);
        count === 0 && history('/');

        return () => clearInterval(interval);
    }, [count, history])

    return (
        <div className = "container p-5 text-center" >
            <p>Redirecting you in {count} seconds</p>
        </div>
    )
}

export default LoadingToRedirect;
