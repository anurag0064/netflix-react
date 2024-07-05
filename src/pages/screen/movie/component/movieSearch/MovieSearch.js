import React, { useState, useEffect } from 'react';
import DefaultInput from '../../../../layout/header/components/defaultInput/DefaultInput';
import Button from '../../../../../components/buttons/Button';
import { IMAGE_BASE_URL } from '../../../../../config/constants';
import { fetchDefaultMovies, fetchMovies } from '../../../../../services/search.service';

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [defaultMovies, setDefaultMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadDefaultMovies = async () => {
        try {
            const data = await fetchDefaultMovies();
            setDefaultMovies(data.results);
        } catch (error) {
            console.error('Error fetching default movies from TMDB', error);
        }
    };

    useEffect(() => {
        loadDefaultMovies();
    }, []);

    const loadMovies = async () => {
        try {
            const data = await fetchMovies(query, page);
            setMovies(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error('Error fetching data from TMDB', error);
        }
    };

    useEffect(() => {
        if (query) {
            loadMovies();
        }
    }, [query, page]);

    const handleSearch = (event) => {
        event.preventDefault();
        setPage(1);
        fetchMovies(query, 1)
            .then(data => {
                setMovies(data.results);
                setTotalPages(data.total_pages);
            })
            .catch(error => console.error('Error fetching data from TMDB', error));
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const moviesToShow = query ? movies : defaultMovies;

    return (
        <div className="bg-[#262626] w-full h-[calc(100vh-5rem)] overflow-y-auto px-4 py-4">
            <form onSubmit={handleSearch} className="flex items-center gap-5">
                <div className='flex w-full justify-between items-center p-2'>
                    <div className='flex'>
                        <h1 className='text-2xl text-[#f44336]'>Movies</h1>
                    </div>
                    <div className='flex'>
                        <DefaultInput
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for a movie..."
                            className="border p-2"
                        />
                    </div>
                </div>
            </form>
            {moviesToShow.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {moviesToShow.map((movie) => (
                        <div key={movie.id} className="p-2 rounded">
                            {movie.poster_path && (
                                <img
                                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                    alt={`${movie.title} poster`}
                                    className="w-full h-auto rounded-lg mb-2 hover:scale-105 hover:shadow-lg transition duration-300"
                                />
                            )}
                            <div className='flex flex-col gap-2'>
                                <h2 className="text-sm font-bold text-white">{movie.title}</h2>
                                <p className="text-white text-sm">{movie.release_date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
               
                <div className="flex items-center justify-center w-100 h-4/5 text-center text-white text-3xl">No data found</div>
            
            )}
            <div className="flex justify-between items-center mt-4">
                <Button
                    onClick={handlePreviousPage}
                    className="bg-[#f44336] text-white p-2 rounded"
                    disabled={page === 1}
                    text="Previous"
                />
                <div className="flex text-white">
                    Page {page} of {totalPages}
                </div>
                <Button
                    onClick={handleNextPage}
                    className="bg-[#f44336] text-white p-2 rounded"
                    disabled={page === totalPages}
                    text="Next"
                />
            </div>
        </div>
    );
};

export default MovieSearch;
