import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'

export default function Product({product}) {

    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth < 600 ? 20:25,
        value:product.ratings,
        isHalf:true
    }
  return (
    <Link className='productCard' to={`/product/${product._id}`} >
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} /><span>({product.ratings}Reviews)</span>
      </div>
      <span>{` RS: ${product.price}`}</span>
    </Link>
  )
}
