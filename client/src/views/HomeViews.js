import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
export default function HomeViews() {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);



  return (
    <>
      <div className="container mx-auto p-5">
        <Navbar></Navbar>
      </div>

      <div className="container py-16 mx-auto">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden text-justify">
          <ul>
            {products.map((product) => (
              <li className="mb-5">
                <div className="flex flex-row gap-2">
                  <div className="bg-blue-500">
                    <p>for pic</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold">
                      <Link to={`details/${product.id}`} href="details">{product.product_name}</Link>
                    </div>
                    <div className="text-sm line-through">Rp.99.000</div>
                    <div className="text-md">
                      Rp.{product.price.toLocaleString("id-ID")},00
                    </div>
                  </div>
                  <div
                    className="ml-auto
             "
                  >
                    <Link to={`checkout/${product.id}`} className=" border border-gray-300 text-gray px-8 py-2 font-medium rounded uppercase bg-blue-500 flex items-center gap-2 hover:text-white transition">
                      Buy
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="ml-48 mt-12">
            <button className=" border border-gray-300 text-white px-8 py-2 font-medium rounded uppercase bg-blue-500 flex items-center gap-2 hover:text-slate-500 transition">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
