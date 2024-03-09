import React, { useState, useEffect } from 'react';
import doodle1 from '../assets/doodle1.png';
import '../index.css';

const DuoSpace = () => {
  const DuoandGroupstyle = {
    fontFamily: '"Madimi One", sans-serif',
    fontWeight: "600",
    fontStyle: "normal",
  };
  const [username, setusername] = useState('');
  const [errorOnSubmit, seterrorOnSubmit] = useState(false);
  const [shakeOnError, setShakeOnError] = useState(false);

  const handleHostSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === '') {
      seterrorOnSubmit(true);
      setShakeOnError((prev) => !prev); 
      return;
    }

    console.log("host", username);
    seterrorOnSubmit(false);
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === '') {
      seterrorOnSubmit(true);
      setShakeOnError((prev) => !prev); 
      return;
    }

    console.log("join", username);
    seterrorOnSubmit(false);
  };

  useEffect(() => {
    if (shakeOnError) {
      const timeoutId = setTimeout(() => {
        setShakeOnError(false);
      }, 500); 
      return () => clearTimeout(timeoutId);
    }
  }, [shakeOnError]);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(2, 8, 19, 0.7), rgba(2, 8, 19, 0.7)), url(${doodle1})`,
        backgroundSize: 'contain',
      }}
      className='text-white flex h-screen flex-col justify-center items-center'>
      <div style={DuoandGroupstyle} className="text-6xl mt-5">
        Duo space
      </div>
      <div className="">
        <form className={`text-center m-5 p-5 ${shakeOnError ? 'shake-animation' : ''}`} action="">
          <input
            className={`bg-[#020813] p-5 m-10 outline-none rounded-md border-[1px] ${errorOnSubmit ? 'border-[#e62525]' : 'border-[#f8ecec]'} `}
            onChange={(e) => { setusername(e.target.value); seterrorOnSubmit(false) }}
            placeholder='Enter a Username'
            type='text'
            required
          />
          <br />
        </form>

        <div className="flex justify-around m-5 p-5">
          <button
            className="uppercase p-5 px-6 rounded-xl bg-[#c7b405]"
            onClick={handleHostSubmit}
          >
            host
          </button>
          <button
            className="bg-[#188ab8]  p-5  px-6 rounded-xl uppercase"
            onClick={handleJoinSubmit}
          >
            join
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuoSpace;
