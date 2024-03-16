import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import micLogo from '../assets/mic.png';
import callLogo from '../assets/call.png';
import videoLogo from '../assets/video.png';
import userLogo from '../assets/user.png';
import closevLogo from '../assets/videoclose.png';
import closemLogo from '../assets/micclose.png';

import peer from './PeerService/peer';
import { useSocket } from '../context/SocketProvider';

const DuoSpaceRoom = () => {
    const socket = useSocket();
    const roomIdFromUrl = window.location.pathname.split('/').pop();

    const [remoteID, setremoteID] = useState(null)
    const [mystream, setmystream] = useState(null)
    const [remoteStream, setremoteStream] = useState(null)
    const [roomid, setRoomid] = useState(roomIdFromUrl);
    const [rolee, setrolee] = useState("")
    const [bothjoined, setbothjoined] = useState(false)
    const [RenderComponent, setRenderComponent] = useState(false)
    const [closevideobutton, setclosevideobutton] = useState(true);
    const [facingMode, setFacingMode] = useState('user'); // 'user' for front camera, 'environment' for back camera
    const toggleFacingMode = () => {
        setFacingMode(facingMode === 'user' ? 'environment' : 'user');
        console.log("hehe");
    };

    const handleRole = useCallback(({ role }) => {
        if (rolee === "") {
            setrolee(role);
            console.log("host joined")
        }
        else if (rolee === "Host") {
            console.log("participant joined")
            setbothjoined(true);
        }
    }, [rolee]);

   
    const handlecall = useCallback(async () => {
        try {
            if (rolee === "Host") {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: {
                        facingMode: { exact: facingMode }
                    }
                });
                const offer = await peer.getOffer();
                socket.emit('user:call', { to: remoteID, offer });
                setmystream(stream);
            }
        } catch (error) {
            console.error('Error accessing camera and/or microphone:', error);
            handlecall();
        }
    }, [remoteID, socket, rolee, facingMode]);
    const handleUserJoined = useCallback(({ username, id, Role }) => {
        console.log(`User ${username} joined room as ${Role}`);
        setremoteID(id);
    }, []);

     useEffect(() => {
             handlecall();
         }, [bothjoined,setbothjoined])   

    const handleincomingcall = useCallback(async ({ from, offer }) => {
        setremoteID(from);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setmystream(stream);
        console.log('incoming call ', from, offer)
        const ans = await peer.getAnswer(offer);
        socket.emit('call:accepted', { to: from, ans })

    }, [socket])

    const sendStreams = useCallback(() => {
        for (const track of mystream.getTracks()) {
            peer.peer.addTrack(track, mystream);
        }
    }, [mystream]);

    const handlecallaccepted = useCallback(({ from, ans }) => {
        peer.setLocalDescription(ans);
        console.log("call accepted");
        sendStreams();
    }, [sendStreams]);

    const handlenegoneeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit("peer:nego:needed", { offer, to: remoteID })
    }, [remoteID, socket])

    useEffect(() => {
        peer.peer.addEventListener("negotiationneeded", handlenegoneeded);
        return () => {
            peer.peer.removeEventListener("negotiationneeded", handlenegoneeded);
        }
    }, [handlenegoneeded])

    const handlenegoincoming = useCallback(async ({ from, offer }) => {
        const ans = await peer.getAnswer(offer);
        socket.emit("peer:nego:done", { to: from, ans })
    }, [socket])

    const handlenegoneededfinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans);
    }, [])

    useEffect(() => {
        peer.peer.addEventListener('track', async e => {
            const remoteStream = e.streams;
            setremoteStream(remoteStream[0]);
        })

    }, [])
    const handleRoomJoin = useCallback(({ username, roomId }) => {
        console.log(`${username} joined room ${roomId}`);
    }, []);

    useEffect(() => {
        socket.on('room:join', handleRoomJoin);

        return () => {
            socket.off('room:join', handleRoomJoin);
        };
    }, [socket, handleRoomJoin]);


    useEffect(() => {
        socket.on('user:joined', handleUserJoined);
        socket.on('role', handleRole);
        socket.on('incoming:call', handleincomingcall);
        socket.on('call:accepted', handlecallaccepted);
        socket.on('peer:nego:needed', handlenegoincoming);
        socket.on('peer:nego:final', handlenegoneededfinal);
        return () => {
            socket.off('user:joined', handleUserJoined);
            socket.off('role', handleRole);
            socket.off('incoming:call', handleincomingcall);
            socket.off('call:accepted', handlecallaccepted);
            socket.off('peer:nego:needed', handlenegoincoming);
            socket.off('peer:nego:final', handlenegoneededfinal);
        };
    }, [socket, handleRole, handleUserJoined, handleincomingcall, handlecallaccepted, handlenegoneededfinal, handlenegoincoming]);

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
    const usernamestyle = {
        fontFamily: '"Balsamiq Sans", sans-serif',
        fontWeight: "600",
        fontStyle: "normal",
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRenderComponent(true);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);
    useEffect(() => {
        let timeout;
        if (rolee !== "Host" && RenderComponent && mystream) {
            timeout = setTimeout(() => {
                sendStreams();
            }, 2000);
        }

        return () => clearTimeout(timeout);
    }, [rolee, RenderComponent, mystream]);


    return (
        <div className='text-white flex flex-col items-center h-screen'>
            <div className='text-[#ffffff] text-sm md:text-xl   m-2 mb-0' style={style} >
                PeerMeet
            </div>
            <div style={titlestyle} className="text-sm text-[#3da0ad]  md:mb-[10px] md:text-xl">
                Duo Space</div>
            <div className="text-white ">Room ID: <span className='text-[#4cdfd2]'>{roomid}
            </span> </div>


            <div className="flex flex-col h-5/6 w-full  ">
                <div className="h-full w-full relative">
                    <div className="h-full flex items-center justify-center w-full px-2">
                        <div className={`h-full w-full flex flex-col justify-center items-center ${remoteStream ? "" : "bg-gray-950"} `}>
                            {!remoteStream && (
                                <div className="flex justify-center items-center w-full h-full ">
                                    <div className="bg-gray-950 h-[250px] w-[250px]
                                        md:h-[270px] md:w-[270px] 
                                        lg:h-[300px] lg:w-[300px]
                                     rounded-full flex justify-center items-center neon-shadow mt-[-100px]">
                                        <img className="h-5/6 w-5/6" src={userLogo} alt="" />
                                    </div>
                                </div>
                            )}

                            {remoteStream &&
                                <ReactPlayer
                                    playing
                                    height="100%"
                                    width="100%"
                                    style={{ pointerEvents: 'none' }}
                                    muted
                                    url={remoteStream} />}
                        </div>
                    </div>

                    <div className="absolute bottom-0 right-0 mr-4 md:mb-4 md:mr-4 h-[150px] w-[220px]  md:h-[190px] md:w-[300px] 
                                    lg:h-[230px] lg:w-[350px]">

                        <div className={`h-full  w-full items-center ${mystream ? "" : " bg-gray-950"} cursor-pointer rounded-xl
                    `}>
                            {!mystream && (
                                <div className=" h-full flex justify-center items-center border-[1px] rounded-xl">
                                    <div className="bg-gray-950
                                    h-[100px] w-[100px] 
                                    md:h-[150px] md:w-[150px] 
                                    lg:h-[170px] lg:w-[170px] rounded-full                           
                                   flex justify-center items-center neon-shadow ">
                                        <img className='h-5/6 w-5/6'
                                            src={userLogo} alt="" />
                                    </div>
                                </div>
                            )}

                            {mystream &&
                                <ReactPlayer
                                    playing
                                    height="100%"
                                    width="100%"
                                    style={{ pointerEvents: 'none' }}
                                    muted
                                    url={mystream} />}
                        </div>
                    </div>
                </div>




                {/* 
                <div className="h-5/6 w-5/6  flex flex-col items-center text-lg mb-0 ">


                    <div className={`h-full  w-full flex flex-col  items-center ${mystream ? "" : "bg-gray-950 "} py-1
                    `}>
                        {!mystream &&(
                                <div className=" h-full flex justify-center items-center ">
                                    <div className="bg-gray-950
                                    h-[150px] w-[150px] rounded-full
                                   mt-[40px]
                                    md:h-[260px] md:w-[260px]
                                     md:mt-[80px]
                                    lg:h-[300px] lg:w-[300px]
                                     lg:mt-[60px] flex justify-center items-center neon-shadow ">
                                        <img className='h-5/6 w-5/6'
                                            src={userLogo} alt="" />
                                    </div>
                                </div>
                            )}

                        <div className="h-full ">
                            {mystream &&
                                <ReactPlayer
                                    playing
                                    height="100%"
                                    width="100%"
                                    style={{ pointerEvents: 'none' }}
                                    muted
                                    url={mystream} />}
                        </div>
                    </div>
                </div>



                <div className="h-5/6 w-5/6  flex flex-col items-center text-lg mb-0 ">
                    <div className={`h-full  w-full flex flex-col  items-center ${remoteStream ? "" : "bg-gray-950 "} py-1
                    `}>
                        {!remoteStream && (
                                <div className=" h-full flex justify-center items-center ">
                                    <div className="bg-gray-950
                                    h-[150px] w-[150px] rounded-full
                                   mt-[40px]
                                    md:h-[260px] md:w-[260px]
                                     md:mt-[80px]
                                    lg:h-[300px] lg:w-[300px]
                                     lg:mt-[60px] flex justify-center items-center neon-shadow ">
                                        <img className='h-5/6 w-5/6'
                                            src={userLogo} alt="" />
                                    </div>
                                </div>
                            )}

                        <div className="h-full ">
                            {remoteStream &&
                                <ReactPlayer
                                    playing
                                    height="100%"
                                    width="100%"
                                    style={{ pointerEvents: 'none' }}
                                    muted
                                    url={remoteStream} />}
                        </div>
                    </div>
                </div> */}
                <div className=" flex flex-row justify-center items-center w-full  gap-8 mt-[-50px] z-10">

                    <div className="h-10 w-10 md:h-14 bg-gray-950   md:w-14 rounded-full p-1 md:p-2 border-[1px]">
                        <img className='h-8 w-8 md:h-10 md:w-10' src={videoLogo} alt="" />
                    </div>
                    <div className="bg-red-600 h-12 w-12 md:h-14 md:w-14 rounded-full p-0.5 md:p-1">
                        <img className='h-12 w-12' src={callLogo} alt="" />
                    </div> 
                    <div                      onClick={toggleFacingMode}
                    className="h-10 w-10 md:h-14 bg-gray-950   md:w-14 rounded-full p-1 md:p-2 border-[1px]">
                        <img className='h-8 w-8 md:h-10 md:w-10' src={micLogo} alt="" />
                    </div>
                </div>

            </div>
        </div>
    )
}
export default DuoSpaceRoom

