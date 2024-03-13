import React, { useCallback, useEffect, useState } from 'react';


const Roomcopy = () => {
  /*   const socket = useSocket();
    const [remoteID, setremoteID] = useState(null)
    const [mystream, setmystream] = useState(null)
    const [remoteStream, setremoteStream] = useState(null)

    const handleUserJoined = useCallback(({ username, id }) => {
        console.log(`User ${username} joined room`);
        setremoteID(id);
    }, []);

    const handlecall = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            const offer = await peer.getOffer();
            socket.emit('user:call', { to: remoteID, offer })
            setmystream(stream);
        } catch (error) {
            console.error('Error accessing camera and/or microphone:', error);
            handlecall();
        }
    }, [remoteID, socket]);

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
    }, [socket, handleUserJoined, handleincomingcall, handlecallaccepted, handlenegoneededfinal, handlenegoincoming]); */

    return (
        <div className='flex flex-col p-3 bg-[#2b2a2b] text-white h-screen justify-center items-center text-center'>
         


        </div> 
    );
};

export default Roomcopy;