import React, { Fragment ,useState} from 'react'
import './Search.css'

export default function Search({history}) {

    const [keyword,setKeyword] = useState("")
// Search is not working..
    const searchSubmitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/products/${keyword}`)
        }else{
            history.push("/products");
        }
    };

  return (
    <Fragment>
      <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input type='text' placeholder='Search A Product' onChange={(e)=>setKeyword(e.target.value)}/>
        <input type='submit' value="Search"/>
      </form>
    </Fragment>
  )
}
