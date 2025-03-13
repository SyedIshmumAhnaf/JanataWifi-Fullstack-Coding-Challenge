import {useState, useEffect} from 'react'; //useState and useEffect are hooks needed to hold state and re-render components based on circumstances
import StockTable from './StockTable';
import AddStock from './AddStock';
import StockGraph from './StockGraph';
import StockAnalytics from './StockAnalytics';
import "./styles.css";

function Home() {
    const [stocks, setStocks] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showGraphs, setShowGraphs] = useState(false);
    const [limit] = useState(20);
    const [offset, setOffset] = useState(0);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const toggleGraphs = () => {
        setShowGraphs(!showGraphs);
    };

    //reference Net Ninja YouTube
    const fetchStocks = (newOffset = 0) => {
        setIsPending(true);
        fetch(`http://127.0.0.1:5000/api/stocks?limit=${limit}&offset=${newOffset}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setIsPending(false);
            setStocks(data);
        });
    };
    
    useEffect(() => {
        fetchStocks(offset);
    }, [offset]);    

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
            {stocks && <h1 className="tableTitle">Stock Market Data</h1>}
            {stocks && <StockGraph stocks={stocks}/>}
            {stocks && <button onClick={toggleGraphs} className="toggleButton">
                {showGraphs ? "Hide Stock Visualizations" : "Show More Stock Visualizations"}
            </button>}
            {showGraphs && <StockAnalytics stocks={stocks} />}
            {stocks && <button onClick={toggleForm} className="toggleButton">
                {showForm ? "Cancel" : "Add Stock"}
            </button>}
            {showForm && <AddStock addStock={addStock} />}
            {stocks && <StockTable stocks={stocks} handleDelete={handleDelete}/>}
            <div className="paginationControls">
                <button onClick={() => { if (offset > 0) setOffset(offset - limit); fetchStocks(offset - limit); }} disabled={offset === 0}>
                    Previous
                </button>
                <button onClick={() => { setOffset(offset + limit); fetchStocks(offset + limit); }}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Home;