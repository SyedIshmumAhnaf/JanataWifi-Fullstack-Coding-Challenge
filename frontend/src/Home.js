import {useState, useEffect} from 'react'; //useState and useEffect are hooks needed to hold state and re-render components based on circumstances
import StockTable from './StockTable';

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
    }, [])

    return (
        <div className="home">
            { isPending && <div>Loading...</div> }
            {stocks && <StockTable stocks={stocks} />}
        </div>
    );
}

export default Home;