import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import micLogo from '../assets/mic.png';
import callLogo from '../assets/call.png';
import videoLogo from '../assets/video.png';
import { useSocket } from '../context/SocketProvider';
import peer from './PeerService/peer';
const DuoSpaceRoom = () => {

    const [mystream, setmystream] = useState(null);
    const [remoteStream, setremoteStream] = useState(null);
    const [remoteID, setremoteID] = useState(null);
    const [remoteUsername, setremoteUsername] = useState(null);

    const socket = useSocket();

    const handleUserJoined = useCallback(({ username, id }) => {
        console.log(`User ${username} joined room`);
        setremoteID(id);
        setremoteUsername(username);
    }, []);

    const generateOffer = useCallback(async (remoteID) => {
        try {
            const offer = await peer.getOffer();//returns offer
            socket.emit('user:call', { to: remoteID, offer })
        } catch (error) {
            console.error('Error in sending offer', error);
        }
    }, [remoteID, socket]);
    useEffect(() => {
        generateOffer(remoteID);
    }, [remoteID])
    
    const handleincomingcall = useCallback(async ({ from, offer }) => {
        setremoteID(from);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setmystream(stream);
        console.log('incoming call ', from, offer)
        const ans = await peer.getAnswer(offer);
        socket.emit('call:accepted', { to: from, ans })

    }, [socket])

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


    useEffect(() => {
        const getCameraStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setmystream(stream);
            } catch (error) {
                console.error('Error accessing camera:', error);
            }
        };

        getCameraStream();

        return () => {
            if (mystream) {
                mystream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);
    useEffect(() => {
        socket.on('user:joined', handleUserJoined);
       socket.on('incoming:call', handleincomingcall);
        socket.on('call:accepted', handlecallaccepted);
       socket.on('peer:nego:needed', handlenegoincoming);
        socket.on('peer:nego:final', handlenegoneededfinal);


        return () => {
            socket.off('user:joined', handleUserJoined);
           socket.off('incoming:call', handleincomingcall);
          socket.off('call:accepted', handlecallaccepted);
         socket.off('peer:nego:needed', handlenegoincoming);
            socket.off('peer:nego:final', handlenegoneededfinal);


        };
    }, [socket, handleUserJoined, handleincomingcall, handlecallaccepted,handlenegoneededfinal, handlenegoincoming ]);


    return (
        <div className='text-white flex flex-col items-center h-screen'>

            <div className='text-[#ffffff] text-sm md:text-xl   m-2' style={style} >
                PeerMeet</div>
            <div style={titlestyle} className="text-sm text-[#3da0ad] mt-[-10px] mb-[55px] md:mb-[10px] md:text-xl">Duo Space</div>

            <div className="flex flex-col md:flex-row h-5/6 w-full gap-4 justify-center items-center">

                <div className="h-5/6 w-5/6  flex flex-col items-center text-lg mb-0 ">

                    <div style={usernamestyle} className="text-[13px]">You</div>

                    <div className="h-full  w-full flex flex-col  items-center
                    ">

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

                        <div className="flex items-end gap-6 mt-[-60px]  ">
                            <div className="h-10 w-10 bg-gray-950 rounded-full">
                                <img className='h-10 w-10 p-2' src={videoLogo} alt="" />
                            </div>
                            <div onClick={() => { console.log("hello") }} className=" cursor-pointer h-12 w-12 bg-red-700 rounded-full">
                                <img className='h-12 w-12 p-2' src={callLogo} alt="" />
                            </div>
                            <div className="h-10 w-10 bg-gray-950 rounded-full">
                                <img className='h-10 w-10 p-2' src={micLogo} alt="" />
                            </div>

                        </div>
                    </div>

                </div>

                <div className="h-5/6 w-5/6  flex flex-col items-center text-lg mb-0 ">
                    <div style={usernamestyle} className="m-0 p-0 text-[13px]">{remoteUsername? remoteUsername:"OTHER"}</div>

                    <div className="h-full  w-full flex flex-col  items-center
                    ">

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


                        <div className="flex items-end gap-6 mt-[-60px]  ">
                            <div className="h-10 w-10 bg-gray-950 rounded-full">
                                <img className='h-10 w-10 p-2' src={videoLogo} alt="" />
                            </div>
                            <div onClick={() => { console.log("hello") }} className=" cursor-pointer h-12 w-12 bg-red-700 rounded-full">
                                <img className='h-12 w-12 p-2' src={callLogo} alt="" />
                            </div>
                            <div className="h-10 w-10 bg-gray-950 rounded-full">
                                <img className='h-10 w-10 p-2' src={micLogo} alt="" />
                            </div>

                        </div>
                    </div>

                </div>




            </div>



        </div>
    )
}

export default DuoSpaceRoom
