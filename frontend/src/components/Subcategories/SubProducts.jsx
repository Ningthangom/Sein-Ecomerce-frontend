import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
import { getAsubcategory } from "../../connectBackend/subcategory";
import ProductCard from "../../components/Cards/ProductCard";

const SubProducts = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
      console.log("subProducts is called")
    setLoading(true);
    getAsubcategory(slug).then((res) => {
      /* console.log(JSON.stringify(res.data, null, 4)); */
      setSub(res.data.subcategory);
      console.log("this is response in subproducts: ", res.data)
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
          <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} Products in "{sub.name}" sub category
            </h4>
          )}
          </div>
         
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-4" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubProducts;
