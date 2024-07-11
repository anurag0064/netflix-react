import React, { useEffect, useState } from 'react';
import Axios from '../../../../../config/axios.config';

const Reviews = ({ movie_id }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      const response = await Axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}/reviews?language=en-US&page=1`,
        {
          headers: { accept: 'application/json' },
        }
      );
      setReviews(response.data.results);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [movie_id]);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-[#f44336] mt-3">Movie Reviews</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{review.author}</h2>
            <p className="text-gray-700 mt-2">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Reviews;
