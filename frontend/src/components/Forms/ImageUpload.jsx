import React, {useState} from 'react';
import Resizer from "react-image-file-resizer";
import axios from 'axios';
import {useSelector } from 'react-redux';

import { Avatar, Badge } from 'antd';

import { toast } from "react-toastify";

import LoadingOutlined from '@ant-design/icons'

const ImageUpload= ({values, setValues, setLoading}) => {

    const {user} = useSelector((state) => ({...state}))
    const [imageloading, setImageloading] = useState(false)

    const fileResizeAndUpload = (e) => {

        setImageloading(true);

        // resize images
        let files = e.target.files;// to get one file use e.target.file[0]
        // this is an array
        let allUploadedIimages = values.images;
        if(files){
            setLoading(true)
            for(let i = 0; i<files.length; i++){
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        console.log(`${process.env.REACT_APP_API}`)
                        axios.post(`${process.env.REACT_APP_API}/uploadimages`, {image: uri}, {
                            headers: {
                                authtoken: user ? user.token : ''
                            }
                        })
                        .then( (res) => {
                            console.log("response in posting image ", res);
                            allUploadedIimages.push(res.data)
                            setValues({...values, images: allUploadedIimages});
                            setImageloading(false)
                            setLoading(false);
                        })
                        .catch( (err) => {

                            if(err.response.status === 401) {
                                toast.error("please logout and login again")
                            }else{
                                console.log("error posting images to backend", err)
                                setLoading(false);
                                setImageloading(false)
                            }
                            
                        }    
                        )
                    },
                    'base64'
                )
            }
        }

    }

    const removeImage = (public_id) => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_API}/removeimage`, {public_id},{
            headers: {
                authtoken: user ? user.token : ''
            }
        })
        .then((res) => {
            console.log("image was successfully removed")
            setLoading(false);
            // remove image from the state 
            const {images} = values;
            let filteredImages = images.filter((image) => {
                // if image's public_id is the same as prop public_id 
                // then filter that (return the ones that are not the same as props public_id)
                return image.public_id !== public_id;
            })
            setValues({...values, images: filteredImages});
        })
        .catch((err)=> {
            console.log("there were error in removing image");
            setLoading(false);
        })
    }

    return (
      <>
        <div className="col">
          {values.images &&
            values.images.map((image) => (
              <Badge
                count="X"
                key={image.public_id}
                onClick={() => removeImage(image.public_id)}
                style={{ cursor: "pointer" }}
              >
                <Avatar
                  src={image.url}
                  size={100}
                  className="ml-3 mt-2"
                  shape="square"
                />
              </Badge>
            ))}
        </div>

        <div className="row mt-2">
          <label className="btn  btn-primary" style={{width: '15%'}}>
            Choose Image
            <input
              type="file"
              multiple
              accept="iamges/*"
              hidden
              onChange={fileResizeAndUpload}
            />
          </label>
        </div>
      </>
    );

}

export default ImageUpload;