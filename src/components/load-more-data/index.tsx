import { useEffect, useState } from "react"
import "./styles.css"

interface LoadMoreDataProps {
  step?: number;
  max?: number;
}

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

const LoadMoreData = ({ step = 10, max = 50 }: LoadMoreDataProps) => {

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState("");

  let abortController: AbortController

  async function fetchData() {
    try {
      setError("");
      setLoading(true);
      let limit = step;
      if (count >= max) throw new Error("Max products reached!");
      else if (count + step > max) limit = max - count;
      
      const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${count}`, {
        signal: abortController.signal,
      });
      const result = await response.json();

      if (result && result.products && result.products.length) {
        setProducts((prev) => [...prev, ...result.products]);
        setCount(count + result.products.length);
        setLoading(false);
      }

      console.log(result);
      

    } catch (error) {
      setLoading(false);
      //error treatment
      if (typeof error === "string") {
        setError(error.toUpperCase());
      } else if (error instanceof Error) {
        if (error.name !== "AbortError") setError(error.message);
        else console.log("Abort error: " +error.message);
      }
    }
  }

  function handleClick() {
    abortController = new AbortController();
    fetchData();
  }

  useEffect(() => {
    abortController = new AbortController();
    setProducts([]);
    setCount(0);
    fetchData();

    return () => {
      if (abortController) abortController.abort();
    };
  }, []);
  
  

  if (error !== "") {
    console.log(error);
  }

  if (loading) return (
    <p className="loading-message">Loading data...</p>
  )

  if (products === null || products.length == 0) return (
    <p className="loading-message">No data to show!</p>
  )

  return (
    <>
      {error !== ""? <p className="error-message">{error}</p> : null}
      <div className="loader-container">
        {
          products.map( product => <div className="product-card" key={product.id}>
            <img src={product.thumbnail} alt={product.title + " thumbnail"} />
            <p className="product-title">{product.title}</p>
          </div>)
        }
        {
          count >= max? null : <button className="product-card" key="load-more" onClick={handleClick}>
            <div className="plus-button">+</div>
            <div className="more-button">Load More</div>
          </button>
        }
      </div>
      <p> Showing {count}/{max} products </p>
    </>
  )
}

export default LoadMoreData