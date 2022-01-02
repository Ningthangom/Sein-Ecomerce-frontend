import React, {useState, useEffect} from 'react';
import {getAllProducts} from '../connectBackend/product';


import Jumbotron from '../components/Cards/Jumbotron'



import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'
import CategoryList from '../components/Category/CategoryList'
import SubCategoryHome from '../components/Subcategories/SubCategoryHome';
import {useSelector} from 'react-redux'

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const {user}= useSelector((state) => ({...state}));


    useEffect(() =>{
        loadProducts()
    },[])

    const loadProducts = () => {
        setLoading(true);
        getAllProducts(100) 
        .then((res) => {
            setProducts(res.data);
            setLoading(false);
        })
    }

    const jumbotron = [
        "Latest Products",
         "New Arrivals",
          "Best Sellers",
          "Fash Sales"
    ]
    return (
      <>
       <div
          className="text-green h6  text-center m-4 "
          
        >
        Ph:087525412 A  ddress: 123 admin road, city, sa, postcode
        </div>
        <div className="jumbotron text-danger h1 font-weight-bold text-center">
          <Jumbotron text={jumbotron} />
        </div>
        <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
          Best sellers
        </h4>
        <BestSellers />
        <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
          New Arrivals
        </h4>
        <NewArrivals />
        <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
          categories
        </h4>
        <CategoryList />
        <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
          Subcategories
        </h4>
        <SubCategoryHome />
       
      </>
    );
}

export default Home;