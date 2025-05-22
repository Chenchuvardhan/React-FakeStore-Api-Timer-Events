import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
export function FakeStore() {
    const [product, setProduct] = useState({
        "id": 0,
        "title": null,
        "price": 0.0,
        "description": null,
        "category": null,
        "image": null
    });
    let id = useRef(1);
    let thread = useRef(null);
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/1`)
            .then(response => {
                setProduct(response.data)
            })
    }, [])
    function getProduct() {
        axios.get(`https://fakestoreapi.com/products/${id.current}`)
            .then(res => { setProduct(res.data) })
    }
    function handleLeftClick() {
        if (id.current > 1) {
            id.current = --id.current;
            getProduct();
        }
    }
    function hanRightClick() {
        if (id.current < 20) {
            id.current = ++id.current;
            getProduct();
        }
    }
    function manageStartClick() {
        if(id.current==20){
            id.current=1;
            axios.get(`https://fakestoreapi.com/products/${id.current}`)
            .then(res=>{
                setProduct(res.data);
            })
        }
        if(id.current>=1&&id.current<20){
        id.current=id.current+1;
       axios.get(`https://fakestoreapi.com/products/${id.current}`)
            .then(res=>{
                setProduct(res.data);
            })
        }
    }
    function handleStartClick() {
        thread.current = setInterval(manageStartClick, 1000);
    }
    function handleStopClick(){
        clearInterval(thread.current);
    }
    return (
        <div className='container-fluid'>
            <div className='card d-flex justify-content-center'>
                <div className='card-header text-center fw-bold'>
                    {product.title}
                </div>
                <div className='card-body text-center'>
                    <button className='btn btn-dark h-25' onClick={handleLeftClick}><span className='bi bi-chevron-left'></span></button>
                    <img src={product.image} height={400} width={500} />
                    <button className='btn btn-dark h-25' onClick={hanRightClick}><span className='bi bi-chevron-right'></span></button>

                </div>
                <div className='card-footer text-center text-dark'>
                    {product.description}
                </div>
                <div className='text-center'>
                    <button className='btn btn-warning mx-2' onClick={handleStartClick}>Start</button>
                    <button className='btn btn-dark' onClick={handleStopClick}>Stop</button>
                </div>
            </div>
        </div>
    );
}