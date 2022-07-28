import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
export default function DetailsViews() {

    const [products, setProducts] = useState([]);
    const params = useParams();
   
    useEffect(() => {
      fetch(`http://localhost:3000/products/${params.id}`)
        .then((response) => response.json())
        .then((data) => setProducts(data));
    }, [params.id]);

  return (
    <>
      <div className="container mx-auto p-5">
        <Navbar></Navbar>
      </div>

      <div className="container py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden text-justify">
          <div>
            <h1 className="text-center font-bold uppercase text-lg ">Product Detail</h1>
          </div>
       
          <div className="flex flex-col">
        
            <div className="bg-blue-500 object-fill float-left w-full h-1/2" >

              <img src="https://assets.klikindomaret.com/products/20099414/20099414_1.jpg" alt="productimg"></img>
            </div>
            
            <div className="ml-32 mt-14">
              <h1 className="font-bold text-xl">{products.product_name}</h1>
              <div className="text-sm line-through">Rp99.000</div>
              <div className="text-md"> Rp.{products.price},00</div>
              <div className="text-md">{products.dimension}</div>
              <div className="text-md">Price unit: {products.unit}</div>
            </div>
          </div>

          <div className="ml-40 mt-12">
            <button className=" border border-gray-300 text-white px-8 py-2 font-medium rounded uppercase bg-blue-500 flex items-center gap-2 hover:text-slate-500 transition">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
