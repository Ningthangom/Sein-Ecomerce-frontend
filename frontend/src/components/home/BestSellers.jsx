import React, {useState, useEffect, useRef} from 'react';
import {sortProducts, productCount} from '../../connectBackend/product';
import { toast } from "react-toastify";

import ProductCard from '../Cards/ProductCard';
import LoadingCard from '../Cards/LoadingCard';

import {Pagination} from 'antd';

const BestSellers = () => {
    const [products , setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalProductCount, setTotalProductCount] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    const pageSizeRef = useRef(10)

    useEffect(() => {
        mostSold()
        console.log("page Num changed is called", pageNum)
    }, [pageNum])

    useEffect(() => {
        productCount().then((res) => 
           { 
            setTotalProductCount(res.data)
            console.log(res.data);
        }
        )
    },[])

    const mostSold = () => {
        setLoading(true)
        sortProducts("sold", "desc", pageNum)
        .then((res) => {
            setProducts(res.data);
            setLoading(false)
        })
        .catch((err)=> {
            toast.error("best sellers could not be loaded")
        })
    }

    

    return (
        <>
        <div className="container">
          {loading ? (
            <LoadingCard count={3} />
          ) : (
            <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-md-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={pageNum}
            total={(totalProductCount / 2) * 10}
            onChange={(value) => setPageNum(value)}
          /*  onChange={(newCurrent, newPageSize) => {
            const pageSizeChange = pageSizeRef.current !== newPageSize;
            if (pageSizeChange) {
              setPageNum(1);
            } else {
              setPageNum(newCurrent);
            }
            pageSizeRef.current = newPageSize;
          }}
          showSizeChanger={true} */
          />
        </nav>
      </div>
      </>
    )
}

export default BestSellers;

