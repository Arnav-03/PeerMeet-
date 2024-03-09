import React from 'react'
import doodle1 from './assets/doodle1.png';
import p2proom from './assets/p2plogo.png'
import grpproom from './assets/grpplogo.png'

const RoomChoice = () => {
  const style = {
    fontFamily: '"Madimi One", sans-serif',
    fontWeight: "600",
    fontStyle: "normal",
  }
  const titlestyle = {
    fontFamily: '"Rock Salt", cursive',
    fontWeight: "400",
    fontStyle: "normal",
  }
  const Tagline2style = {
    fontFamily: '"Julius Sans One", sans-serif',
    fontStyle: "normal",
  };
  const buttonstyle = {
    fontFamily: '"Madimi One", sans-serif',
    fontStyle: "normal",
  };
  
  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(2, 8, 19, 0.7), rgba(2, 8, 19, 0.7)), url(${doodle1})`,
      backgroundSize: 'contain',


    }} className='text-[#ffffff] h-screen flex flex-col justify-center items-center'>
      <div className='text-[#ffffff] text-6xl md:text-7xl lg:text-8xl m-1 mt-12 mb-6 ' style={style} >
        PeerMeet</div>

      <div className="flex flex-col md:flex-row">

        <div className="h-[300px] lg:h-[350px] lg:w-[400px] w-[350px] border-2 rounded-3xl border-[#abb8c0] text-center justify-center items-center flex flex-col m-2 p-5 mb-7">

          <div className="bg-[#abb8c0] mt-[-80px] lg:mt-[-130px]  rounded-full border-2 border-[#abb8c0] max-w-20 max-h-20 ">
            <img className='h-20 w-20 p-3' src={p2proom} alt="" srcset="" />
          </div>

          <div style={titlestyle} className="text-2xl text-[#3da0ad] m-3">Duo Space</div>
          <div style={Tagline2style} className="text-xl wave-text font-bold ">A Hub for Collaborations, <br/>Where Two Voices Echo in Unity.
          </div>
          <div className="">
            <button style={buttonstyle} className='bg-[#0d4a63]  p-3 rounded-xl m-2'>Join Duo Space</button>
          </div>

        </div>

        <div className="h-[300px] lg:h-[350px] lg:w-[400px] w-[350px] border-2 rounded-3xl border-[#abb8c0] text-center justify-center items-center flex flex-col m-2 p-5">
          <div className="bg-[#abb8c0] mt-[-80px] rounded-full border-2 border-[#abb8c0] max-w-20 max-h-20 lg:mt-[-130px] ">
            <img className='h-20 w-20 p-2 ' src={grpproom} alt="" srcset="" />
          </div>
          <div style={titlestyle} className="text-2xl text-[#3da0ad] m-3">Group Space</div>
          <div  style={Tagline2style} className=" wave-text  text-xl font-bold">Where Ideas Soar,<br/> Elevate Your Team in the <br/>Collaborative Space.
          </div>
          <div className="">
            <button style={buttonstyle} className='bg-[#0d4a63] p-3 rounded-xl m-2 '>Join Group Space</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomChoice
