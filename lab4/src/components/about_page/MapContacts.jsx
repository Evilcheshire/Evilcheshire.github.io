import locationIcon from '../../assets/images/location.png';
import emailIcon from '../../assets/images/email.png';
import phoneIcon from '../../assets/images/phone.png';

function MapContacts() {
  return (
    <section className="map-contacts">
      <div className="map">
        <h3>Ви можете знайти нас тут</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d558.4235764034001!2d-3.1980717703711115!3d55.95467011404459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4887c7916a04019b%3A0xb6699d7bd5f80a6!2sChez%20Jules!5e0!3m2!1suk!2sua!4v1741563541071!5m2!1suk!2sua"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>
      <div className="contacts">
        <h3>Наші контакти</h3>
        <p><img src={locationIcon} alt="Location" />109 Hanover St, Edinburgh EH2 1DJ, Scotland</p>
        <p><img src={emailIcon} alt="Email" />info@example.com</p>
        <p><img src={phoneIcon} alt="Phone" />+ 01 234 567 88</p>

        <h3>Години роботи</h3>
        <p>Понеділок - Четвер: 8 ранку - 9 вечора</p>
        <p>П'ятниця - Субота: 8 ранку - 1 ночі</p>
        <p>Неділя: 9 ранку - 10 вечора</p>
      </div>
    </section>
  );
}

export default MapContacts;
