import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="HomePage">
      <h1>Yodlr Design Challenge</h1>
      <div className="buttons-group">
        <Link to={"/signup"} className="btn btn-primary">Sign Up</Link>
        <Link to={"/admin"} className="btn btn-secondary">Admin</Link>
      </div>
    </div>
  )
}