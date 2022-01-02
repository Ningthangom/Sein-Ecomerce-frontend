import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import {Modal, Button} from 'antd';

import {toast } from 'react-toastify';
import {useSelector} from 'react-redux';
import { StarOutlined } from '@ant-design/icons';



const RatingModal = ({children}) => {


    const {user} = useSelector((state) => ({...state}));
    const [showModal, setShowModel] = useState(false);
    const navigate = useNavigate();
    const {slug} = useParams();

    const handleModal = () => {
        if(user &&  user.token) {
            setShowModel(true)
        }else{
            navigate('/login');
        }
    }

    return (
        <>
        <div onClick={handleModal}>
            <StarOutlined className="text-danger" /> <br/> {" "}
            {user ? "Leave rating": "Please login to rate the product"}
        </div>
        <Modal 
         title="Leave your rating"
         centered
         visible={showModal}
         onOk={() => {
            setShowModel(false);
           toast.success("Thanks for your review. It will apper soon");
         }}
         onCancel={() => setShowModel(false)}
        > 
      {children}
        </Modal>
        </>
    )

}

export default RatingModal;