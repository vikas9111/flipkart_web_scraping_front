import React, { useEffect, useState } from 'react';
import { fetchProducts } from './api';
import { Link } from 'react-router-dom';
import _debounce from 'lodash/debounce';
import { Card, CardContent, Typography, Button, TextField, Grid, Select, MenuItem } from '@mui/material';

const ProductsList = () => {
  const [categories, setCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [order, setOrder] = useState('asc');

  const debouncedFetchData = _debounce(async (searchKeyword, minPrice, maxPrice, sortBy, order) => {
    const data = await fetchProducts({ search_keyword: searchKeyword, min_price: minPrice, max_price: maxPrice, sort_by: sortBy, order: order });
    setCategories(data);
  }, 500);

  useEffect(() => {
    debouncedFetchData(searchKeyword, minPrice, maxPrice, sortBy, order);

    return () => {
      debouncedFetchData.cancel();
    };
  }, [searchKeyword, minPrice, maxPrice, sortBy, order]);

  return (
    <div className="container products">
      <h1 className="mt-4 mb-4">Product Categories</h1>
      <form className="mb-4">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Search keywords"
              fullWidth
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              type="number"
              label="Min price"
              fullWidth
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              type="number"
              label="Max price"
              fullWidth
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Select
              value={`${sortBy}:${order}`}
              fullWidth
              onChange={(e) => {
                const [sortByValue, orderValue] = e.target.value.split(':');
                setSortBy(sortByValue);
                setOrder(orderValue);
              }}
            >
              <MenuItem value="price:asc">Price: Low to high</MenuItem>
              <MenuItem value="price:desc">Price: High to low</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={2}>
            <Link to="/scrape" className="btn btn-primary mb-4 p-3">Start Scraping</Link>
          </Grid>
        </Grid>
      </form>
      {categories.map(category => (
        <div key={category.id}>
          <h2>{category.title}</h2>
          <div className="card-group products-group">
            {category.products.map(product => (
              <Link to={`/products/${product.id}`} className='text-decoration-none'>
                <Card key={product.id} sx={{ maxWidth: 345 }} className='m-2'>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${product.price}
                    </Typography>
                    {/* Add product details here */}
                    
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )|| <div>No Product Found</div>)}
    </div>
  );
};

export default ProductsList;
