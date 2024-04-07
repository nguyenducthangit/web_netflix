import React, { useRef, useState } from 'react'
import Card from './Card';
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';


export default React.memo(function
    CardSlider({ data, title }) {
    const [showControls, setShowControls] = useState(false);
    const listRef = useRef();
    const [sliderPosition, setSliderPosition] = useState(0);

    const handleDirection = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x - 70;
        // console.log('check sliderPosition: ', sliderPosition);
        // console.log('check distance: ', distance);

        if (direction === "left" && sliderPosition > 0) {
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
            setSliderPosition(sliderPosition - 1);
        }
        if (direction === "right" && sliderPosition < 4) {
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
            setSliderPosition(sliderPosition + 1);
        }
    };
    // console.log('check list ref: ', listRef);
    return (
        <Container
            className='flex column'
            showControls={showControls}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}

        >
            <h1>{title}</h1>
            <div className='wrapper'>
                <div
                    className={`slider-action left flex j-center a-center ${!showControls ? "none" : ""
                        } `}>

                    <AiOutlineLeft className='btn-left' onClick={() => handleDirection("left")} />


                </div>
                <div className='flex slider' ref={listRef}>
                    {
                        data.map((movie, index) => {
                            return <Card movieData={movie} index={index} key={movie.id}></Card>
                        })
                    }
                </div>
                <div className={`slider-action right ${!showControls ? "none" : ""} flex j-center a-center`}>

                    <AiOutlineRight className='btn-right' onClick={() => handleDirection("right")} />


                </div>


            </div>
        </Container>
    )
})
const Container = styled.div`
    gap:1rem;
    position: relative;
    padding: 2rem 0;
    h1{
        margin-left: 50px;
    }
    .wrapper{
        .slider{
            width: max-content;
            gap: 1rem;
            transform: translateX(0px);
            transition: 0.3s ease-in-out;
            margin-left: 50px;

        }
        .slider-action{
            position: absolute;
            z-index: 99;
            height: 100%;
            top: 0;
            bottom: 0;
            width: 50px;
            transition: 0.3s ease-in-out
            svg{
                font-size: 2rem;

            }
        }
        .none{
            /* display: none; */
        }
        .left{
            left: 0;
            /* .btn-left{
                margin-left: 5px;
                font-size: 35px;
                width: 50px;
                border-radius: 3px;
                background-color: #a6a6a6;
                height: 40px;
                color: #e7e7e7;
                &:hover{
                    background-color: #e8e8e8;
                    outline: none;
                    color:black;
                }

            } */
            
        }
        .right{
            right:0;
            /* .btn-right{
                margin-right: 5px;

                font-size: 35px;
                width: 50px;
                border-radius: 3px;
                background-color: #a6a6a6;
                height: 40px;
                color: #e7e7e7;
                &:hover{
                    background-color: #e8e8e8;
                    outline: none;
                    color:black;
                }

            } */

        }
    }



`
