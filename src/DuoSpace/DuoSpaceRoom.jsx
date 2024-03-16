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
            if (rolee === "Host") { // Check if the user is the host
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                const offer = await peer.getOffer();
                socket.emit('user:call', { to: remoteID, offer });
                setmystream(stream);
            }
        } catch (error) {
            console.error('Error accessing camera and/or microphone:', error);
            handlecall();
        }
    }, [remoteID, socket, rolee]);
    const handleUserJoined = useCallback(({ username, id, Role }) => {
        console.log(`User ${username} joined room as ${Role}`);
        setremoteID(id);
    }, []);

    useEffect(() => {
        handlecall();
    }, [bothjoined,setbothjoined])




    /*     const handlecall = useCallback(async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                const offer = await peer.getOffer();
                socket.emit('user:call', { to: remoteID, offer })
                setmystream(stream);
            } catch (error) {
                console.error('Error accessing camera and/or microphone:', error);
                handlecall();
            }
        }, [remoteID, socket]); */

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
    const [closevideobutton, setclosevideobutton] = useState(true);

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

            <div className='text-[#ffffff] text-sm md:text-xl   m-2' style={style} >
                PeerMeet
            </div>
            <div style={titlestyle} className="text-sm text-[#3da0ad] mt-[-10px] mb-[55px] md:mb-[10px] md:text-xl">Duo Space</div>
            {rolee === "Host" && (
                <div className="text-white mt-[-10px] *:">Room ID: <span className='text-[#4cdfd2]'>{roomid}
                </span> </div>
            )}

            <div style={usernamestyle} className="text-[#c7b405] mt-[-5px] uppercase ">{rolee}</div>


            <div className="flex flex-col md:flex-row h-5/6 w-full gap-4 justify-center items-center">


                <div className="h-5/6 w-5/6  flex flex-col items-center text-lg mb-0 ">


                    <div className={`h-full  w-full flex flex-col  items-center ${mystream ? "" : "bg-[#242121] "} py-1
                    `}>
                        {!mystream &&
                            (
                                <div className=" h-full flex justify-center items-center ">
                                    <div className="bg-gray-950
                                    h-[150px] w-[150px] rounded-full
                                   mt-[40px]
                                    md:h-[260px] md:w-[260px]
                                     md:mt-[80px]
                                    lg:h-[300px] lg:w-[300px]
                                     lg:mt-[60px] flex justify-center items-center ">
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

{/* 
                        <div className="flex items-end gap-6 mt-[-60px]  ">
                            <div onClick={() => {
                                handlecall();
                                setclosevideobutton(false);
                            }}
                                className="h-10 w-10 bg-gray-950 rounded-full">
                                <img className='h-10 w-10 p-1.5' src={closevideobutton ? closevLogo : videoLogo} alt="" />
                            </div>
                            <div className=" cursor-pointer h-12 w-12 bg-red-700 rounded-full">
                                <img className='h-12 w-12 p-2' src={callLogo} alt="" />
                            </div>
                            <div className="h-10 w-10 bg-gray-950 rounded-full">
                                <img className='h-10 w-10 p-2' src={closemLogo} alt="" />
                            </div>

                        </div> */}
                    </div>

                </div>



                <div className="h-5/6 w-5/6  flex flex-col items-center text-lg mb-0 ">


                    <div className={`h-full  w-full flex flex-col  items-center ${remoteStream ? "" : "bg-[#242121] "} py-1
                    `}>
                        {!remoteStream &&
                            (
                                <div className=" h-full flex justify-center items-center ">
                                    <div className="bg-gray-950
                                    h-[150px] w-[150px] rounded-full
                                   mt-[40px]
                                    md:h-[260px] md:w-[260px]
                                     md:mt-[80px]
                                    lg:h-[300px] lg:w-[300px]
                                     lg:mt-[60px] flex justify-center items-center ">
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

                </div>




            </div>

            {(rolee !== "Host" && RenderComponent) && (
                <div className="flex items-end gap-6   ">
                    <div onClick={() => { sendStreams() }} className=" cursor-pointer font-light capitalize bg-red-700  rounded-2xl 
                     p-2 m-2">
                        start sharing
                    </div>


                </div>
            )}

        </div>
    )
}
export default DuoSpaceRoom