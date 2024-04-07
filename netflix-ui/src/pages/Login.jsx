import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BackgroundImage from './../components/BackgroundImage';
import Header from '../components/Header';
import { firebaseAuth } from './../utils/firebase-config';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  })
  // const handleClick = () => {
  //   toast.success('Your data has been saved successfully!', {
  //     position: "top-right", // Optional: Toast position
  //     autoClose: 5000,  // Optional: Auto-close in milliseconds
  //     hideProgressBar: false, // Optional: Hide progress bar
  //     closeOnClick: true,   // Optional: Close on click
  //     pauseOnHover: true,   // Optional: Pause on hover
  //     draggable: true,     // Optional: Make toast draggable
  //     theme: "light",    // Optional: Theme (light or dark)
  //   });
  // };
  const handleLogin = async () => {
    try {

      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password)



    } catch (err) {
      toast.error("Username or Password Invalid");
      console.log(err);
    }
  }
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      // console.log('check user',currentUser);
      navigate("/");

    }



  })
  return (
    <Container >
      <BackgroundImage />
      <div className='content'>
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
              <div>
                {/* <button onClick={handleClick}>Show Toast</button> */}
              </div>
            </div>
            <div className="container flex column">

              <input
                type='email'
                placeholder='Email Address'
                name='email'
                value={formValues.email}
                onChange={(e) => setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })}

              />

              <input
                type='password'
                placeholder='Password'
                name='password'
                value={formValues.password}
                onChange={(e) => setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })}

              />

              <button onClick={handleLogin} >Log In</button>

            </div>

          </div>

        </div>

      </div>
    </Container>
  )
}
const Container = styled.div`
    position: relative ;
    .content{
        position : absolute;
        top:0;
        left:0;
        background-color: rgb(0,0,0,0.5);
        height: 100vh;
        width: 100vw;
        display: grid;
        grid-template-rows:15vh 85vh;
    }
    .form-container{
      gap:2rem;
      height: 85vh;
      .form{
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap:2rem;
        color:white;
        .container{
          gap:2rem;
          input{
            padding: 0.5rem 1rem;
            width: 15rem;

          }
          button{
            padding: 0.5rem 1rem;
            background-color:#e50914;
            border: none;
            cursor: pointer;
            color:white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  
    

`;