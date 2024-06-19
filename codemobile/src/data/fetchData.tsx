import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

interface Product {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  stock: number;
  rating: number;
  totalPrice?: number;
}

function FetchData() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => {
        setData(res.data.products); // Store the fetched products in the state
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <div className="mt-3">
        <h3>All Products</h3>
        <div className="row">
          {data.map(product => (
            <div key={product.id} className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <img src={product.thumbnail} alt={product.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Price: ${product.price}</p>
                  <p className="card-text">Stock: {product.stock}</p>
                  <p className="card-text">Rating: {product.rating}</p>
                  <button>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FetchData;
