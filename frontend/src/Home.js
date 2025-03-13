import {useState, useEffect} from 'react'; //useState and useEffect are hooks needed to hold state and re-render components based on circumstances
import StockTable from './StockTable';
import AddStock from './AddStock';
import "./styles.css";

function Home() {
    const [stocks, setStocks] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };
    

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

    const handleDelete = (date, trade_code) => {
        fetch(`http://127.0.0.1:5000/api/stocks/${date}/${trade_code}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setStocks(prevStocks => prevStocks.filter(stock => !(stock.date === date && stock.trade_code === trade_code)));
        })
    }

    const addStock = (newStock) => {
        fetch("http://127.0.0.1:5000/api/stocks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStock),
        })
        .then(res => res.json())
        .then(data => {
            setStocks(prevStocks => [newStock, ...prevStocks]);
        })
        .catch(error => console.error("Error adding stock:", error));
    };
    

    return (
        <div className="home">  
            {isPending && (
            <div className="loader-container">
                <div className="loader"></div>
                <div className="loader-text">Loading...</div>
            </div>
            )}
            <button onClick={toggleForm} className="toggleButton">
                {showForm ? "Hide Add Stock Form" : "Show Add Stock Form"}
            </button>
            {showForm && <AddStock addStock={addStock} />}
            {stocks && <StockTable stocks={stocks} handleDelete={handleDelete}/>}
        </div>
    );
}

export default Home;