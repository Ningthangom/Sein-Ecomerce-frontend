import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {useSelector} from 'react-redux'
const { Meta } = Card;

const AdminProductCard = ({product, handleRemove, handleUpdate}) => {

 // destructure
 const { title, description, images, slug, measurement,price } = product;
 const {user } = useSelector((state) => ({ ...state}));

    return (
        <Card
        cover={
        <img
          src={images && images.length ? images[0].url : ""}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
          alt="https://user-images.githubusercontent.com/40008894/41419171-a584fa76-6ff1-11e8-879c-5b1fefe7cddd.png"
        />
      }
     /*  {user.role === 'admin' ? (  actions={[
        <EditOutlined className="text-warning" onClick={()=> handleUpdate(slug)} />,
        <DeleteOutlined className="text-danger" onClick={()=> handleRemove(slug)} />,
      ]}) : null} */
      actions={[
       
        <EditOutlined className="text-warning" onClick={()=> handleUpdate(slug)} />,
        <DeleteOutlined className="text-danger" onClick={()=> handleRemove(slug)} />,
        
      ]}
     
      className="mt-2"
    >
      <Meta 
      title={title} 
       description={`${description && description.substring(0, 40)}...`} />
        <Meta
         className="text-danger"
         title={`$ ${price}  ${measurement && measurement !== "other" ? ` per  ${measurement} `: ``}`}
        
       />
    </Card>
    )

}


export default AdminProductCard;