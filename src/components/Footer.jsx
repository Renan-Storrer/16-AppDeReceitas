import { Link } from 'react-router-dom';
import imgDrink from '../images/drinkIcon.svg';
import imgMeal from '../images/mealIcon.svg';
import '../style/FooterStyle.css';

function Footer() {
  return (
    <footer
      className="footer-container"
      data-testid="footer"
    >
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ imgDrink }
          alt="ToDrink"
        />
      </Link>
      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          src={ imgMeal }
          alt="ToMeal"
        />
      </Link>
    </footer>
  );
}

export default Footer;
