import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../redux/slices/productSlice'

const Home = () => {
  const dispatch=useDispatch()
  const [currentPage,setcurrentPage]=useState(1)
  const productPerPage =8

  const{allProducts,loading,error}=useSelector(state=>state.productReducer)
const currentaPageLastIndex= currentPage * productPerPage
const  currentaPageFirstIndex = currentaPageLastIndex - productPerPage
const visibleproductcards =allProducts?.slice(currentaPageFirstIndex,currentaPageLastIndex)


  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[])
  
  const totalPage = Math.ceil(allProducts?.length/productPerPage)
const navigateToNextPage=()=>{
  if(currentPage!=totalPage){
    setcurrentPage(currentPage+1)
  }
}
const navigateToPrevPage=()=>{
  if(currentPage!=1){
    setcurrentPage(currentPage-1)
  }
}

  return (
    <>
    <Header insideHome={true}/>
    <div style={{paddingTop:'100px'}} className='container px-4 auto'>
      {
        loading?
          <div className='flex justify-center items-center my-5 text-lg'>
                <img width={'70px'} height={'70pxs'} className='me-2' src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW1vMXoyenZ0MXJjNWFycWg3eXJuem53eGtqd2t2YWJicnJjeHFtYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.webp" alt="" />Loading...
          </div>
        :
        
        <>
        <div className="grid grid-cols-4 gap-4">
       {
        allProducts?.length>0?
        visibleproductcards.map(products=>( <div key={products?.id} className="rounded border p-2 shadow">

          <img width={'100%'} height={'200px'} src={products?.thumbnail}alt="" />
          <div className='text-center'>
                  <h3 className='text-xl font-bold'>{products?.title}</h3>
                  <Link className='bg-yellow-500 rounded p-1 mt-3 text-white inline-block'  to={`${products?.id}/view`}>View More</Link>

          </div>
        </div>))
        :
        <div className='flex justify-center items-center my-5 text-lg'>No products found</div>
       }

        </div>
      <div className="text-center font-bold text-2xl">
       <span className='cursor-pointer' onClick={navigateToPrevPage}><i class="fa-solid fa-backward me-5"></i></span>
       <span>{currentPage} of {totalPage}</span>
       <span className='cursor-pointer' onClick={navigateToNextPage}><i className="fa-solid fa-forward ms-5"></i></span>


      </div>
      </>}
    </div>
    </>
  )
}

export default Home
