import { Link } from "react-router";
import "./Home.css"

const Home = () => {
    return (
        <div className="home">
            <div className="home-container">
                <h1>GoDaddy Assignment</h1>
                <Link to="/repositories">
                    <button className="home-button">Go to Repositories</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;