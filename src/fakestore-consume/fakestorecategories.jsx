import axios from "axios";
import { useEffect, useRef, useState } from "react"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
export const Categories = () => {
    const [products, setProducts] = useState([]);
    var ctry = useRef(null);
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/categories`).then(res => { setCategories(res.data) });
        axios.get(`https://fakestoreapi.com/products`).then(resp => { setProducts(resp.data); console.log(products); });
    }, [])
    const [categories, setCategories] = useState([]);
    function handleCategories(eve) {
        ctry.current = eve.target.value;
        if (!(ctry.current === "all")) {
            axios.get(`https://fakestoreapi.com/products/category/${ctry.current}`).then(resp => { setProducts(resp.data); console.log(products); });
        }
        else {
            axios.get(`https://fakestoreapi.com/products`).then(resp => { setProducts(resp.data); console.log(products); });
        }
    }
    return (
        <div>
            <h1 className="text-center bg-success text-white">Store-Shop <span className="position-relative" style={{left:'500px'}}><span className="bi bi-cart "></span></span></h1>
            <div className="row">
                <div className="col-2 my-2 d-flex flex-column gap-2 border border-2 " style={{ paddingBottom: '400px', paddingTop: '15px' }}>

                    <button className="btn btn-success" value="all" onClick={handleCategories}>all</button>
                    {
                        categories.map((cat, i) => <button className="btn btn-success " key={i} value={cat} onClick={handleCategories}>
                            {cat.substring(0, 1).toUpperCase() + cat.substring(1)}

                        </button>
                        )
                    }

                </div>
                <div className="col-10 ">
                    <div className="row mx-4">
                        {
                            products.map((p, i) => <div className="card col-3 m-2 ">
                                <div className="card-header fw-bold">
                                    {p.title}
                                </div>
                                <div className="card-body">
                                    <img src={p.image} height='100px' width='100px' />
                                </div>
                                <div className="card-footer">
                                    <h6 className="bi bi-currency-dollar">{p.price}</h6>

                                    <button type="submit" className=" btn btn-success w-50">Buy</button>
                                    <button className=" mx-2 btn btn-danger bi bi-cart"> Cart</button>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}