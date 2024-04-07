import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import MovieLogo from '../assets/homeTitle.webp';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from "react-icons/ai";
import backgroundImage from '../assets/home.jpg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store';
import Slider from '../components/Slider';
import { toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';

export default React.memo(function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate()
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.netflix.movies);
  useEffect(() => {
    dispatch(getGenres())

  }, [])
  // 
  useEffect(() => {
    if (genresLoaded) { dispatch(fetchMovies({ type: "all" })) };
  }, [genresLoaded])
  // console.log('check selected', genresLoaded);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) { navigate("/login") }
    else {
      // toast.success('Login Sucessfully', {
      //   position: "top-right", // Optional: Toast position
      //   autoClose: 5000,  // Optional: Auto-close in milliseconds
      //   hideProgressBar: false, // Optional: Hide progress bar
      //   closeOnClick: true,   // Optional: Close on click
      //   pauseOnHover: true,   // Optional: Pause on hover
      //   draggable: true,     // Optional: Make toast draggable
      //   theme: "light",    // Optional: Theme (light or dark)
      // });
    };
  });
  // console.log('check api:', movies);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img src={backgroundImage} alt="background" className="background-image" />

        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className='buttons flex'>
            <button className='flex j-center a-center' onClick={() => navigate('/player')}>
              <FaPlay />Play
            </button>
            <button className='flex j-center a-center'>
              <AiOutlineInfoCircle />More Info
            </button>

          </div>
        </div>

      </div>
      <Slider movies={movies} />


    </Container>
  )
})
const Container = styled.div`
  background-color: black;
  .hero{
    position: relative;
    .background-image{
      filter: brightness(60%);

    }
    img{
      height: 100vh;
      width: 100vw;

    }
    .container{
      position: absolute;
      bottom: 5rem;
      .logo{
        img{
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons{
          margin: 5rem;
          gap: 2rem;
          button{
            font-size: 1.4rem;
            gap: 1rem;
            border-radius: 0.2rem;
            padding: 0.5rem;
            padding-left: 2rem;
            padding-right: 2.4rem;
            border: none;
            &:hover{
              opacity:0.8;
            }
            &:nth-of-type(2){
              background-color: rgba(109,109,110,0.7);
              color:white;
              svg{
                font-size: 1.8rem;
              }
            }

        }
      }
    }
  }

`;