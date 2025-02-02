import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataByGenre, fetchMovies, getGenres, getUserLikedMovies } from '../store';
import Slider from '../components/Slider';
import styled from 'styled-components';
import NotAvailable from './NotAvailable';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import Navbar from '../components/Navbar';
import SelectGenre from '../components/SelectGenre';
import Card from '../components/Card';

export default function UserLiked() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);
    const [email, setEmail] = useState(undefined);
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            // console.log('check user',currentUser);
            setEmail(currentUser.email);

        } else {
            navigate("/login");
        }

    })


    useEffect(() => {
        if (email) {
            dispatch(getUserLikedMovies(email));
        }
    }, [email])
    console.log('check movie', movies);
    // useEffect(() => {
    //     if (genresLoaded) {
    //         dispatch(fetchMovies({ genres, type: "movie" }))
    //     };
    // }, [genresLoaded])
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }


    return (
        <Container>
            <Navbar isScrolled={isScrolled} />
            <div className='content flex column'>
                <h1>My List</h1>
                <div className='grid flex'>
                    {movies.map((movie, index) => {
                        return <Card movieData={movie} index={index} key={movie.id} isLiked={true} />
                    })}
                </div>
            </div>
        </Container>
    )
}
const Container = styled.div`
    .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;