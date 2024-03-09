import React from 'react';
import { useNavigate } from 'react-router-dom';
import micLogo from './assets/mic.png';
import callLogo from './assets/call.png';
import videoLogo from './assets/video.png';
import arrow3 from './assets/arrow3.png';
import doodle1 from './assets/doodle1.png';
import './index.css';

const Intro = () => {
  const navigate = useNavigate();
 
  const style = {
    fontFamily: '"Madimi One", sans-serif',
    fontWeight: "600",
    fontStyle: "normal",
  }
  const Taglinestyle = {
    fontFamily: '"Julius Sans One", sans-serif',
    fontStyle: "normal",
  };
  
  const clickstyle = {
    fontFamily: '"Waiting for the Sunrise", cursive',
    fontWeight: "400",
    fontStyle: "normal",
  }
  const introToRoom = () => {
    navigate('/choiceOfroom');
  };
  

  return (
    <div   className='bg-[#020813] h-screen flex flex-col justify-center items-center'>
      <div style={{ 
      backgroundImage: `linear-gradient(rgba(2, 8, 19, 0.7), rgba(2, 8, 19, 0.7)), url(${doodle1})`,
      backgroundSize: 'contain',
       

    }} className="bg-cover flex flex-col justify-center items-center border-[6px] border-[#474953] h-5/6 w-5/6 relative rounded-xl">
        <div className='text-[#ffffff] text-6xl md:text-7xl lg:text-8xl mt-[-100px] m-2' style={style} >
          PeerMeet</div>
        <div style={Taglinestyle} className=" text-[#b9ac36]  text-[18px] md:text-[25px] lg:text-[30px] mt-10 tracking-[4px] text-center  wave-text font-extrabold	"> Where Every Pixel Holds a Conversation,<br /> and Every Frame Weaves a Story of Connectivity.</div>{/* text-[#c4acac]  */}



        <div className="h-[100px] bg-[#474953] w-full absolute bottom-0 ">
          <div className="flex flex-row justify-center  mt-5 ">
            <div className="flex flex-row items-center">
              <div className="bg-[#1a1919] rounded-full p-2"><img className='h-10 w-10 object-cover' src={micLogo} alt="" /></div>
              <div onClick={introToRoom} className="bg-[#ff0a0a] mx-4 rounded-full p-2 animation-call cursor-pointer"><img className=' h-14 w-14  object-cover' src={callLogo} alt="" /></div>
              <div className="bg-[#1a1919] rounded-full p-2"><img className='h-10 w-10 object-cover' src={videoLogo} alt="" /></div>
            </div>

          </div>


        </div>
      </div>

      <div className="text-[#cdcfab] ml-[130px]  flex flex-row ">
        <img className='h-12 w-12 ml-[35px]  rotate-[-70deg]' src={arrow3} alt=""  />

        <div  style={clickstyle} className="text-4xl uppercase mt-[30px] ">Get Started</div>
      </div>


    </div>

  )
}

export default Intro
