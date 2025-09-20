import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { IconBook } from '@tabler/icons-react';

const BookCycler = ({ books, title, description }) => {
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (books.length > 1) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Create new interval
      intervalRef.current = setInterval(() => {
        setCurrentBookIndex((prevIndex) => (prevIndex + 1) % books.length);
      }, 3000); // Change book every 3 seconds

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [books.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentBook = books[currentBookIndex] || {};

  return (
    <div className="flex flex-col h-full">
      {/* Book Cover Container - matching map window size */}
      <div className="relative w-full h-40 sm:h-44 lg:h-48 mb-3 sm:mb-4 rounded-lg overflow-hidden shadow-lg bg-neutral-800/50">
        {currentBook.image ? (
          <img
            key={`book-${currentBookIndex}`}
            src={currentBook.image}
            alt={currentBook.title}
            className="w-full h-full object-cover object-top transition-all duration-700 ease-in-out transform"
            style={{
              animation: 'fadeIn 0.7s ease-in-out',
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <IconBook className="w-8 h-8 text-white/50" />
          </div>
        )}

        {/* Book counter dots */}
        {books.length > 1 && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {books.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentBookIndex ? 'bg-blue-400' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="flex flex-col items-center text-center flex-grow justify-center">
        <h3 className="text-lg sm:text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm sm:text-base text-white/70 mb-2">{description}</p>
        <div
          key={`title-${currentBookIndex}`}
          className="text-lg sm:text-xl font-bold text-blue-400 mb-1"
          style={{
            animation: 'fadeIn 0.7s ease-in-out',
          }}
        >
          {currentBook.title}
        </div>
        {currentBook.author && (
          <div
            key={`author-${currentBookIndex}`}
            className="text-sm text-white/60"
            style={{
              animation: 'fadeIn 0.7s ease-in-out',
            }}
          >
            by {currentBook.author}
          </div>
        )}
      </div>
    </div>
  );
};

BookCycler.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default BookCycler;
