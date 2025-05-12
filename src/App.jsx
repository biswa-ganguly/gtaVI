import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const secondSectionRef = useRef(null);
  
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const scrollToNextSection = () => {
    if (secondSectionRef.current) {
      secondSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  let [showContent, setShowContent] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg")?.remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1,
      x: "-50%",
      bottom: "-50%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    // Only apply mouse move animations on devices that aren't touch-based
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
      main?.addEventListener("mousemove", function (e) {
        const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
        gsap.to(".main .text", {
          x: `${xMove * 0.4}%`,
        });
        gsap.to(".sky", {
          x: xMove,
        });
        gsap.to(".bg", {
          x: xMove * 1.7,
        });
      });
    }
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full h-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-5 md:py-10 px-5 md:px-10">
              <div className="logo flex gap-3 md:gap-7">
                <div className="lines flex flex-col gap-[3px] md:gap-[5px]">
                  <div className="line w-10 md:w-15 h-1 md:h-2 bg-white"></div>
                  <div className="line w-6 md:w-8 h-1 md:h-2 bg-white"></div>
                  <div className="line w-3 md:w-5 h-1 md:h-2 bg-white"></div>
                </div>
                <h3 className="text-2xl md:text-4xl -mt-[4px] md:-mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
                <audio ref={audioRef} src="./bgm.mp3" loop />
              </div>
            </div>

            <div className="absolute top-5 right-5 z-50">
              <button
                onClick={toggleMusic}
                className="bg-white text-black px-2 py-1 md:px-4 md:py-2 rounded-full shadow-lg flex items-center gap-1 md:gap-2 text-sm md:text-base"
              >
                <i className={`ri-${isPlaying ? "pause" : "play"}-line text-md md:text-xl`}></i>
                <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"} Music</span>
              </button>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />
              <div className="text text-white flex flex-col gap-1 md:gap-3 absolute top-20 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
                <h1 className="text-5xl sm:text-8xl md:text-[12rem] leading-none -ml-10 sm:-ml-20 md:-ml-40">grand</h1>
                <h1 className="text-5xl sm:text-8xl md:text-[12rem] leading-none ml-5 sm:ml-10 md:ml-20">theft</h1>
                <h1 className="text-5xl sm:text-8xl md:text-[12rem] leading-none -ml-10 sm:-ml-20 md:-ml-40">auto</h1>
              </div>
              <img
                className="absolute character -bottom-[150%] left-1/2 -translate-x-1/2 scale-[] rotate-[-20deg]"
                src="./girlbg.png"
                alt=""
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-8 md:py-15 px-5 md:px-10 bg-gradient-to-t from-black to-transparent">
              <div onClick={scrollToNextSection} className="flex gap-2 md:gap-4 z-50 absolute items-center cursor-pointer">
                <i className="text-2xl md:text-4xl ri-arrow-down-line"></i>
                <h3 className="text-sm md:text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute h-[30px] md:h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>
          <div ref={secondSectionRef} className="w-full h-screen  flex items-center justify-center bg-black">
            <div className="cntnr  flex flex-col md:flex-row text-white w-full h-full md:h-[80%] px-5 md:px-0 py-16 md:py-0">
              <div className="limg  relative w-full md:w-1/2 h-1/2 md:h-full mb-8 md:mb-0">
                <img
                  className="absolute scale-[1.1] md:scale-[1.3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-full md:w-[30%] ">
                <h1 className="text-4xl sm:text-6xl md:text-8xl">Still Running,</h1>
                <h1 className="text-4xl sm:text-6xl md:text-8xl">Not Hunting</h1>
                <p className="mt-5 md:mt-10 text-sm sm:text-lg md:text-xl">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Distinctio possimus, asperiores nam, omnis inventore nesciunt
                  a architecto eveniet saepe, ducimus necessitatibus at
                  voluptate.
                </p>
                <p className="mt-2 md:mt-3 text-sm sm:text-lg md:text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <div className="bg-black w-full text-center flex justify-center items-center">
        <button className="bg-yellow-500 px-6 py-4 mt-6  text-black text-xl sm:text-2xl md:text-4xl rounded-lg hover:bg-yellow-400 transition-colors duration-300">
          Download Now
        </button>
      </div>
                
              </div>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
}

export default App;