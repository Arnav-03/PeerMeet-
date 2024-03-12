import React, { useState, useEffect,useCallback } from 'react';
import doodle1 from '../assets/doodle1.png';
import '../index.css';
import { useSocket } from '../context/SocketProvider'
import { useNavigate } from "react-router-dom"

const DuoSpace = () => {
  const socket = useSocket();
  const navigate = useNavigate();

  const DuoandGroupstyle = {
    fontFamily: '"Madimi One", sans-serif',
    fontWeight: "600",
    fontStyle: "normal",
  };

  const [username, setusername] = useState('');
  const [errorOnSubmit, seterrorOnSubmit] = useState(false);
  const [shakeOnError, setShakeOnError] = useState(false);

  const createRoomId = () => {
    const randomFourDigitNumber = Math.floor(1000 + Math.random() * 9000);
    const roomId = randomFourDigitNumber.toString();
      return roomId;
  };
  
  const handleHostSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '') {
        seterrorOnSubmit(true);
        setShakeOnError((prev) => !prev);
        return;
    }
    console.log("host", username);
    seterrorOnSubmit(false);
    if (socket) {
        const roomHostId = createRoomId();
        socket.emit("room:join", { user: username, roomId: roomHostId });
        console.log(' data:', { username, roomHostId });
    } else {
        console.error("Socket is null or undefined.");
    }
};

const handleJoinRoom = useCallback(({ username, roomId }) => {
  console.log(username)
  const Naame = username;
  const RooomId = roomId;
  console.log(Naame, RooomId);
  navigate(`/DuoSpaceRoom/${RooomId}`);
}, [navigate]);


  useEffect(() => {
      socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket]);

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '') {
        seterrorOnSubmit(true);
        setShakeOnError((prev) => !prev);
        return;
    }
    console.log("join", username);
    seterrorOnSubmit(false);

    if (socket) {
        const roomId = prompt('Enter Room ID:'); // Prompt the user to enter the room ID
        if (roomId) {
            socket.emit("room:join", { user: username, roomId: roomId });
            console.log(' data:', { username, roomId });
        } else {
            // Handle case where the user cancels or enters an empty room ID
            console.log('Room ID not provided or invalid');
        }
    } else {
        console.error("Socket is null or undefined.");
    }
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
            className={`bg-[#020813] text-xl p-5 m-10 outline-none rounded-md border-[1px] ${errorOnSubmit ? 'border-[#e62525]' : 'border-[#f8ecec]'} `}
            onChange={(e) => { setusername(e.target.value); seterrorOnSubmit(false) }}
            placeholder='Enter a Username'
            type='text'
            required
          />
          <br />
        </form>

        <div className="flex justify-around m-5 p-5">
          <button
            className="uppercase  p-5 px-6 rounded-xl bg-[#c7b405]"
            onClick={handleHostSubmit}
            style={DuoandGroupstyle}
          >
            host
          </button>
          <button
            className="bg-[#188ab8]  p-5  px-6 rounded-xl uppercase"
            onClick={handleJoinSubmit}
            style={DuoandGroupstyle}
          >
            join
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuoSpace;
