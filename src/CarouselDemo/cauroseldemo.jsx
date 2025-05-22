import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
export function CauroselDemo() {
  const [product, setProducts] = useState({
    id: 0,
    title: null,
    price: 0.1,
    description: null,
    category: null,
    image: null
  });
  let thread = useRef(0);
  let period = useRef(null);
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/1`)
      .then(response => {
        setProducts(response.data);
        thread.current = product.id;
        console.log(thread.current);
      });
  }, []);
  function getProducts() {
    axios.get(`https://fakestoreapi.com/products/${thread.current}`)
      .then(response => { setProducts(response.data) });
    console.log(thread.current);
  }
  function handleRightClick() {
    if (thread.current < 20) {
      thread.current = thread.current + 1;
      getProducts();
    }
  }
  function handleLeftClick() {
    if (thread.current > 1) {
      thread.current = thread.current - 1;
      getProducts();
    }
  }
  function handlePlayInterval() {
    if (thread.current == 21) {
      thread.current = 1;
      getProducts();
    }
    if (thread.current <= 20 && thread.current >= 0) {
      console.log(thread.current);
      thread.current = thread.current + 1;
      getProducts();
    }
  }
  function handlePlayClick() {
    period.current = setInterval(handlePlayInterval, 1500);
  }
  function handlePauseClick() {
    clearInterval(period.current);
  }
  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className='card mt-4 w-50'>
        <div className='card-header text-center'>
          <div>{product.title}</div>
          <div></div>
        </div>
        <div className='card-body'>
         <div className='text-end'><button className='btn btn-danger text-white rounded rounded-circle'><span>{product.price.toLocaleString('en-us', { style: 'currency', currency: 'USD' })}</span></button></div>
          <div className='d-flex justify-content-center align-items-center'>
            <button className='bi bi-chevron-left h-25 btn btn-dark' onClick={handleLeftClick}></button>
            <img src={product.image} height={400} width='100%' />
            <button className='bi bi-chevron-right h-25 btn btn-dark' onClick={handleRightClick}></button>
          </div>
        </div>
        <div className='card-footer text-center'>
        </div>
        <div className='d-flex justify-content-center text-center'>
          <button className='bi bi-play btn btn-warning mx-2' onClick={handlePlayClick}></button>
          <button className='bi bi-pause btn btn-dark' onClick={handlePauseClick}></button>
        </div>
      </div>

    </div>
  );
}