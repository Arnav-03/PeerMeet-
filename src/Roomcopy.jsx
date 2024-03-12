import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import micLogo from './assets/mic.png';
import callLogo from './assets/call.png';
import videoLogo from './assets/video.png';


const Roomcopy = () => {
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
    return (
        <div className='text-white flex flex-col items-center h-screen'>

            <div className='text-[#ffffff] text-3xl   m-2' style={style} >
                PeerMeet</div>
            <div style={titlestyle} className="text-2xl text-[#3da0ad] mt-[-10px] mb-2">Duo Space</div>

            <div className="flex flex-col lg:flex-row h-5/6 w-full gap-4 justify-center items-center">

                <div className="h-5/6 w-5/6  flex flex-col items-center text-xl border-[2px] border-[#c5c3ba]">
                    <div style={usernamestyle} className="">Arnav</div>

                    <div className="h-full  w-full bg-[#1d1a1a] flex flex-col  items-center ">

                        <div className="h-full "></div>

                        <div className="flex items-end gap-6 m-2">
                            <div className="h-12 w-12 bg-gray-950 rounded-full">
                                <img className='h-12 w-12 p-2' src={videoLogo} alt="" />
                            </div>
                            <div className="h-14 w-14 bg-red-700 rounded-full">
                                <img className='h-14 w-14 p-2' src={callLogo} alt="" />
                            </div>
                            <div className="h-12 w-12 bg-gray-950 rounded-full">
                                <img className='h-12 w-12 p-2' src={micLogo} alt="" />
                            </div>

                        </div>
                    </div>

                </div>
                <div className="h-5/6 w-5/6  flex flex-col items-center text-xl border-[2px] border-[#c5c3ba]">
                    <div style={usernamestyle} className="">Arnav</div>
                    <div className="h-full  w-full bg-[#1d1a1a] flex flex-col  items-center ">

                        <div className="h-full flex justify-end items-center ">
                            <div className="text-lg">
                            waiting for someone to join...

                            </div>
                        </div>

                        <div className="flex items-end gap-6 m-2">
                            <div className="h-12 w-12 bg-gray-950 rounded-full">
                                <img className='h-12 w-12 p-2' src={videoLogo} alt="" />
                            </div>
                            <div className="h-14 w-14 bg-red-700 rounded-full">
                                <img className='h-14 w-14 p-2' src={callLogo} alt="" />
                            </div>
                            <div className="h-12 w-12 bg-gray-950 rounded-full">
                                <img className='h-12 w-12 p-2' src={micLogo} alt="" />
                            </div>

                        </div>
                    </div>
                </div>




            </div>



        </div>
    )
}

export default Roomcopy
