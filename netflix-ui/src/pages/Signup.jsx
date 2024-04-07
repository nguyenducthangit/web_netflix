import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BackgroundImage from './../components/BackgroundImage';
import Header from '../components/Header';
import { firebaseAuth } from './../utils/firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  })
  const handleSignIn = async () => {
    try {

      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
      toast("Success");
    } catch (err) {
      console.log(err);
    }
  }
  // onAuthStateChanged(firebaseAuth,(currentUser)=>{
  //   if(currentUser){
  //     console.log('check user',currentUser);
  //     navigate("/");
  //   } 

  // })
  return (
    <Container >
      <BackgroundImage showPassword={showPassword} />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited Movies, TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime</h4>
            <h6>Ready to watch? Enter your email to create or restart membership </h6>
          </div>
          <div className='form'>
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
            {showPassword && (
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

            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)} >Get Started</button>
            )}

          </div>
          <button onClick={() => handleSignIn()}>Log In</button>
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
    .body{
      gap: 1rem;
      .text{
        gap:1rem;
        text-align: center;
        font-size:2rem;
        h1{
          padding: 0 25rem
        }
      }
      .form{
        display: grid;
        width:60%;
        grid-template-columns: ${({ showPassword }) => showPassword ? "1fr 1fr" : "1fr 1fr"};

        input{
          color: black; 
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus{
            outline: none;
          }
        }
        button{
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
        } 
      }
      button{
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        font-weight: bolder;
        font-size: 1.05rem;
    }
    }

`;