"use client";
import { FaLinkedin, FaInstagram, FaEnvelope, FaGithub } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ProfileCard = ({
    name,
    role,
    dept,
    year,
    contactEmail,
    instagram,
    linkedin,
    github,
    image,
    GreekSymbol
}) => {
    const cardRef = useRef(null);
    const textRef = useRef(null);
    const socialsRef = useRef(null);
    const loadingRef = useRef(null);
    const imageRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    const numberToRoman = (num) => {
        const romanNumerals = {
            1: 'I',
            2: 'II',
            3: 'III',
            4: 'IV',
            5: 'V'
        };
        return romanNumerals[num] || String(num || "");
    };

    
    let details = `B.Tech ${dept} ${numberToRoman(year)} Year`;


    useEffect(() => {
        setImageLoaded(false);
        const img = new Image();
        img.src = image;

        img.onload = () => {
            if (imageRef.current) {
                imageRef.current.src = image;
                setImageLoaded(true);
            }
        };

        return () => {
            img.onload = null;
        };
    }, [image]);

    useEffect(() => {
        if (!imageLoaded && loadingRef.current) {
            gsap.to(loadingRef.current.children, {
                opacity: 0.5,
                stagger: {
                    each: 0.2,
                    repeat: -1,
                    yoyo: true
                },
                duration: 0.5
            });
        }
    }, [imageLoaded]);

    useEffect(() => {
        if (imageLoaded && loadingRef.current) {
            gsap.to(loadingRef.current, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    gsap.fromTo(imageRef.current,
                        {
                            opacity: 0,
                            scale: 0.8
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.5,
                            ease: "back.out(1.2)"
                        }
                    );
                }
            });
        }
    }, [imageLoaded]);

    useEffect(() => {
        gsap.set(socialsRef.current, { opacity: 0, y: "30%" });
      
        const handleHover = () => {
          gsap.to(textRef.current, { y: "250%", duration: 1, ease: "power2.inOut" });
          gsap.to(socialsRef.current, { y: "-250%", opacity: 1, duration: 1, ease: "power2.inOut" });
        };
      
        const handleLeave = () => {
          gsap.to(textRef.current, { y: "0%", duration: 0.8, ease: "power2.inOut" });
          gsap.to(socialsRef.current, { y: "30%", opacity: 0, duration: 0.5, ease: "power2.inOut" });
        };
      
        const card = cardRef.current;
      
        card.addEventListener("mouseenter", handleHover);
        card.addEventListener("mouseleave", handleLeave);
      
        return () => {
          card.removeEventListener("mouseenter", handleHover);
          card.removeEventListener("mouseleave", handleLeave);
          gsap.killTweensOf([textRef.current, socialsRef.current]); // Kill GSAP animations
        };
      }, []);
      
    

    console.log("Icons Imported:", FaLinkedin, FaInstagram, FaEnvelope, FaGithub);

    return (
        <div className="flex items-center justify-center h-screen w-screen ">
            <div
                ref={cardRef}
                className="rounded-2xl bg-[#352b1e] aspect-[1/1.5] w-full max-w-xs flex flex-col justify-center items-center p-6 relative overflow-hidden border-2 border-[#E5C14E]"
            >
                <div  className="absolute top-1 right-1 text-[#E5C14E] font-bold text-lg px-3 py-1 rounded-full [0_0_15px_#E5C14E] animate-pulse">
                    {GreekSymbol}
                </div>
                <div className="h-60 w-50 aspect-square flex justify-center items-center relative top-5">
                    {!imageLoaded && (
                        <div
                            ref={loadingRef}
                            className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-2xl"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-[#E5C14E] rounded-full"></div>
                                <div className="w-2 h-2 bg-[#E5C14E] rounded-full"></div>
                                <div className="w-2 h-2 bg-[#E5C14E] rounded-full"></div>
                            </div>
                        </div>
                    )}
                    <img
                        ref={imageRef}
                        alt={`${name}'s Profile Picture`}
                        className={`w-full h-full rounded-2xl transition-opacity duration-300 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
                    />
                </div>

                <div className="w-full flex-1 relative flex flex-col justify-center items-center mt-12">
                    <div ref={textRef} className="text-center space-y-2 w-full px-2 md:transform">
                        <h2 className="text-white text-xl font-bold">{name}</h2>
                        {role && (
                            <p className="text-[#E5C14E] text-base font-bold">{role}</p>
                        )}
                        <p className={`text-gray-300 'text-md`}>
                            {details}
                        </p>
                    </div>

                    <div ref={socialsRef} className="absolute flex justify-center items-center space-x-6 opacity-100">
                        {linkedin && (
                            <a href={linkedin} target="_blank" rel="noopener noreferrer"
                                className="text-white text-3xl hover:text-[#E5C14E] transition-colors duration-300">
                                <FaLinkedin />
                            </a>
                        )}
                        {instagram && instagram !== "-" && instagram !== "_" && (
                            <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer"
                                className="text-white text-3xl hover:text-[#E5C14E] transition-colors duration-300">
                                <FaInstagram />
                            </a>
                        )}
                        {contactEmail && (
                            <a href={`mailto:${contactEmail}`} target="_blank" rel="noopener noreferrer"
                                className="text-white text-3xl hover:text-[#E5C14E] transition-colors duration-300">
                                <FaEnvelope />
                            </a>
                        )}
                        {github && (
                            <a href={github} target="_blank" rel="noopener noreferrer"
                                className="text-white text-3xl hover:text-[#E5C14E] transition-colors duration-300">
                                <FaGithub />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
