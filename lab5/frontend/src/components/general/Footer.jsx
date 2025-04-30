import React from 'react';
import locationIcon from '../../assets/images/location.png';
import emailIcon from '../../assets/images/email.png';
import phoneIcon from '../../assets/images/phone.png';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <section>
          <h5>Про нас</h5>
          <p>У Селесті ми поєднуємо традиції та інновації, щоб запропонувати унікальні страви.
            Від свіжих продуктів від ферми до столу до затишної атмосфери - ми гарантуємо, що кожен візит буде особливим.</p>
        </section>

        <section>
          <h5>Контакти</h5>
          <p><img src={locationIcon} alt="location" /> 109 Hanover St, Edinburgh EH2 1DJ, Scotland</p>
          <p><img src={emailIcon} alt="email" /> info@example.com</p>
          <p><img src={phoneIcon} alt="phone" /> + 01 234 567 88</p>
        </section>

        <section>
          <h5>Години роботи</h5>
          <p>Понеділок - Четвер: 8 ранку - 9 вечора</p>
          <p>П'ятниця - Субота: 8 ранку - 1 ночі</p>
          <p>Неділя: 9 ранку - 10 вечора</p>
        </section>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Всі права захищені</p>
      </div>
    </footer>
  );
}

export default Footer;