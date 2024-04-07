import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataByGenre, fetchMovies, getGenres } from '../store';
import Slider from '../components/Slider';
import styled from 'styled-components';
import NotAvailable from './NotAvailable';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import Navbar from '../components/Navbar';
import SelectGenre from '../components/SelectGenre';

export default function Movies() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate()
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);
    useEffect(() => {
        dispatch(getGenres())
    }, [genresLoaded])

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ genres, type: "movie" }))
        };
    }, [genresLoaded])
    // console.log('check selected', genresLoaded);
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) {
            console.log('check user', currentUser);
            navigate("/");
        }
    })


    // console.log('check genres:', genres);
    // console.log('check movies:', movies);

    return (
        <Container>
            <div className='navbar'>
                <Navbar isScrolled={isScrolled} />

            </div>
            <div className='data'>
                <SelectGenre genres={genres} type="movie" />
                {movies.length ? <Slider movies={movies} /> : <NotAvailable />}

            </div>


        </Container>


    )
}
const Container = styled.div`
    .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
  
`;