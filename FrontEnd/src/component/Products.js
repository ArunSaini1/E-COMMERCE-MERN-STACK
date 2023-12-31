import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../actions/productAction";
import Loader from "./layout/Loader";
import ProductCard from "./Product"; // ye file ka 6pp ne rename naam krke productcark kar diya hai
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider  from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";


export default function Products() {

  const categories = [
    "Laptop","Footwear","Bottom","Tops","Attire","SmartPhones"
  ];


  const params = useParams();
  const dispatch = useDispatch()

  const [price, setPrice] = useState([0, 25000]);

  const [currentPage, setCurrentPage] = useState(1);
  const [ category, setCategory ] = useState("")
  const [ ratings, setRatings ] = useState(0)

  const { products, loading, productsCount, resultPerPage, filterProductCount } = useSelector(
    (state) => state.products
  );

  const keyword = params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };


  const priceHandler = (event,newPrice) =>{
    setPrice(newPrice);
  }

  useEffect(() => {
    dispatch(getProduct(keyword,currentPage,price,category,ratings));
  }, [dispatch, keyword,currentPage,price,category,ratings]);


  let count = filterProductCount;
  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>


<div className="filterBox">
  <Typography>Price</Typography>

  <Slider value={price}
  onChange={priceHandler}
valueLabelDisplay="auto" 
aria-labelledby="range-slider"
min={0}
max={25000}
 ></Slider>

 <Typography>Categories</Typography>
 <ul className="categoryBox">
  {categories.map((category)=>(
    <li className="category-link" key={category} onClick={()=>setCategory(category)}>
{category}

    </li>
  ))}
 </ul>

 <fieldset>
  <Typography component="legend">Rating Above</Typography>
  <Slider value={ratings} onChange={(e,newRating)=>{setRatings(newRating)}} aria-labelledby="continuous-slider" min={0} max={5} valueLabelDisplay="auto" ></Slider>
 </fieldset>
</div>

{resultPerPage <productsCount && (
          <div className="paginationBox">
          <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
          </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
