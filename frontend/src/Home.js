import {useState, useEffect} from 'react'; //useState and useEffect are hooks needed to hold state and re-render components based on circumstances
import StockTable from './StockTable';
import "./styles.css";

function Home() {
    const [stocks, setStocks] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/stocks") //reference Net Ninja YouTube
        .then(res => {
          return res.json();
        })
        .then(data => {
          setIsPending(false);
          setStocks(data);
        });
    }, []);

    const handleDelete = (date) => {
        fetch(`http://127.0.0.1:5000/api/stocks/${date}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Stock deleted:', data);
            setStocks(prevStocks => prevStocks.filter(stock => stock.date !== date));
        })
    }

    return (
        <div className="home">  
            {isPending && (
            <div className="loader-container">
                <div className="loader"></div>
                <div className="loader-text">Loading...</div>
            </div>
            )}
            {stocks && <StockTable stocks={stocks} handleDelete={handleDelete}/>}
        </div>
    );
}

export default Home;