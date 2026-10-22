import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CardMedia, CardText, CardHighlight } from './CardParts';

// Cycles through book covers every 3 seconds, fading each one in
const BooksCard = ({ item }) => {
  const { books } = item;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (books.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % books.length);
    }, 3000);
    return () => clearInterval(id);
  }, [books.length]);

  const book = books[index];

  return (
    <div className="flex flex-col h-full">
      <CardMedia className="shadow-lg bg-neutral-800/50">
        <img
          key={`cover-${index}`}
          src={book.image}
          alt={book.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top animate-fade-in"
        />

        {/* Position dots */}
        {books.length > 1 && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {books.map((b, i) => (
              <div
                key={b.title}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  i === index ? 'bg-blue-400' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </CardMedia>

      <CardText title={item.title} description={item.description}>
        <CardHighlight key={`title-${index}`} className="mb-1 animate-fade-in">
          {book.title}
        </CardHighlight>
        <div
          key={`author-${index}`}
          className="text-sm text-white/60 animate-fade-in"
        >
          by {book.author}
        </div>
      </CardText>
    </div>
  );
};

BooksCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default BooksCard;
