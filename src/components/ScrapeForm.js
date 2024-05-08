import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ScrapeForm = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await axios.post('/product_scrapers', { product_url: url });
      setSuccessMessage(response.data.success);
      navigate(`/products/${response.data.product_id}`);
    } catch (error) {
      console.error('Error scraping product:', error);
      setError('Error scraping product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Scrape Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="url">Product URL:</label>
          <input
            type="text"
            className="form-control"
            id="url"
            value={url}
            placeholder='Enter Product Url Like `https://www.flipkart.com/flokestone-analog-watch-men/p/itm34cb62239620f`'
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {loading && <div className="alert alert-info">Scraping...</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Scraping...' : 'Scrape'}
        </button>
      </form>
    </div>
  );
};

export default ScrapeForm;
