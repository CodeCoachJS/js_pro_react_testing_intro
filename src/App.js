import './App.css';
import WelcomeBanner from './components/WelcomeBanner';
import ProductList from './components/ProductList';

function App() {
    const user = JSON.parse(localStorage.getItem('user')) || {};

    return (
        <div className="App">
            <WelcomeBanner
                firstName={user.firstName}
                isReturning={user.logins >= 1}
            />
            <ProductList />
        </div>
    );
}

export default App;
