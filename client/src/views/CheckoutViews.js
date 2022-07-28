import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from 'axios'
export default function CheckoutViews() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3000/products/${params.id}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, [params.id]);

  async function transaction() {
    try {
      const data = {
        quantity,
      };
      const response = await axios({
        method: "POST",
        url: `http://localhost:3000/transaction/${params.id}`,
        headers: {
            access_token: localStorage.getItem("access_token"),
          },
        data: data,
      });
      
      navigate("/reports")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="container mx-auto p-5">
        <Navbar></Navbar>
      </div>

      <div className="container py-16 mx-auto">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden text-justify">
          <ul>
            <li className="mb-5">
              <div className="flex flex-row gap-2">
                <div className="bg-blue-500">
                  <p>for pic</p>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    <a href="details">{products.product_name}</a>
                  </div>
                  <div className="pt-2">
                    <form onChange={(e) => setQuantity(e.target.value)}>
                      <label for="quantity" className="mr-2">
                        Quantity:
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        max="1000"
                        className="border border-lg border-black"
                        value={quantity}
                      ></input>
                    </form>
                  </div>
                  <div className="text-md">
                    Subtotal:Rp.
                    {products.price * quantity.toLocaleString("id-ID")},00
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <div className="ml-48 mt-12">
            <button
              onClick={transaction}
              className=" border border-gray-300 text-white px-8 py-2 font-medium rounded uppercase bg-blue-500 flex items-center gap-2 hover:text-slate-500 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
