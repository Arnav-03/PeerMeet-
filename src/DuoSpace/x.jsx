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