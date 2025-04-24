import React, { useState } from 'react';
import chef1 from '../../assets/images/chef1.jpg';
import chef2 from '../../assets/images/chef2.jpg';
import chef3 from '../../assets/images/chef3.jpg';
import chef4 from '../../assets/images/chef4.jpg';
import chef5 from '../../assets/images/chef5.jpg';
import chef6 from '../../assets/images/chef6.jpg';

const chefsData = [
  {
    img: chef1,
    alt: 'Emma Richardson',
    name: 'Емма Річардсон',
    desc: 'Справжній майстер, що спеціалізується на французькій кухні з досвідом понад 15 років.',
  },
  {
    img: chef2,
    alt: 'Liam Johnson',
    name: 'Ліам Джонсон',
    desc: 'Відомий своїм знанням італійських страв і пристрастю до традиційних рецептів.',
  },
  {
    img: chef3,
    alt: 'Sophia Martinez',
    name: 'Софія Мартінез',
    desc: 'Шеф-кондитер, відомий своїми вишуканими десертами та інноваційними солодощами.',
  },
  {
    img: chef4,
    alt: 'James Wilson',
    name: 'Джеймс Вілсон',
    desc: 'Експерт з грилю, який створює ідеальне поєднання димних смаків у кожній страві.',
  },
  {
    img: chef5,
    alt: 'Olivia Bennett',
    name: 'Олівія Беннетт',
    desc: 'Спеціаліст з морепродуктів, який готує свіжі та ароматні страви, натхненні океаном.',
  },
  {
    img: chef6,
    alt: 'Daniel Carter',
    name: 'Деніел Картер',
    desc: 'Шеф-кухар ф’южн, який поєднує смаки різних культур в одній гармонійній тарілці.',
  },
];

const ChefsSection = () => {
  const [flippedCards, setFlippedCards] = useState(Array(chefsData.length).fill(false));

  const handleFlip = (index) => {
    setFlippedCards((prev) =>
      prev.map((flipped, i) => (i === index ? !flipped : flipped))
    );
  };

  return (
    <main>
      <section className="chefs">
        <h2>Познайомтесь з нашими шефами</h2>
        <div className="chefs-container">
          {chefsData.map((chef, index) => (
            <div
              className={`chef ${flippedCards[index] ? 'flipped' : ''}`}
              key={index}
              onClick={() => handleFlip(index)}
            >
              <div className="chef-inner">
                <div className="chef-front">
                  <img src={chef.img} alt={chef.alt} />
                  <h3>{chef.name}</h3>
                </div>
                <div className="chef-back">
                  <h3>{chef.name}</h3>
                  <p>{chef.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ChefsSection;
