import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";

interface Product {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  stock: number;
  rating: number;
  discountPercentage?: number;
  totalPrice?: number;
}

function HomePage() {
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('https://dummyjson.com/products')
      .then(res => {
        const products = res.data.products.map((product: Product) => ({
          ...product,
          totalPrice: product.price * product.stock
        }));
        setData(products);
        setFilteredData(products);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const debounce = (func: Function, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return function(...args: any) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = useCallback(debounce((term: string) => {
    if (term) {
      setFilteredData(data.filter(product => 
        product.title.toLowerCase().includes(term.toLowerCase())
      ));
    } else {
      applyFilter(filter);
    }
  }, 1000), [data, filter]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  const applyFilter = (filter: string) => {
    let filtered = data;
    if (filter === 'over1000') {
      filtered = data.filter(product => product.price > 1000 && product.discountPercentage! > 0);
    } else if (filter === 'totalPrice') {
      filtered = data.map(product => ({
        ...product,
        totalPrice: product.price * product.stock
      }));
    } else if (filter === 'sortRating') {
      filtered = [...data].sort((a, b) => b.rating - a.rating || a.price - b.price);
    }
    setFilteredData(filtered);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    applyFilter(newFilter);
  };

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
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleInputChange}
          className="form-control mb-3"
        />
        <select value={filter} onChange={handleFilterChange} className="form-select mb-3">
          <option value="all">ทั้งหมด</option>
          <option value="over1000">กรองราคามากว่า 1000</option>
          <option value="totalPrice">แสดงราคารวมต่อชิ้น</option>
          <option value="sortRating">เรียงเรตติ้ง</option>
        </select>
        <div className="row">
          {filteredData.map(product => (
            <div key={product.id} className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <img src={product.thumbnail} alt={product.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Price: ${product.price}</p>
                  <p className="card-text">Stock: {product.stock}</p>
                  <p className="card-text">Rating: {product.rating}</p>
                  {filter === 'totalPrice' && <p className="card-text">Total Price: ${product.totalPrice}</p>}
                  <button onClick={() => navigate(`/detail/${product.id}`)} className="btn btn-primary">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
