"use client";
import { useEffect, useRef, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import gsap from "gsap";
import ProfileCard from "./components/profile";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";

const Button = styled.button`
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #352b1e;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform-origin: left;
    transform: scaleX(1);
  }
`;

export default function Page() {
    const [jsonData, setJsonData] = useState({});
    const [allMembers, setAllMembers] = useState([]);
    const [activeButton, setActiveButton] = useState(0);
    const navRef = useRef(null);
    const buttonsRef = useRef([]);
    const headingRef = useRef(null);
    const [verticals, setVerticals] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const underlineRefs = useRef([]);
    const cardsContainerRef = useRef(null);

    const animateCardsOut = () => {
        return gsap.to(".profile-card", {
            opacity: 0,
            y: 50,
            stagger: {
                amount: 0.3,
                from: "random",
            },
            duration: 0.4,
            ease: "power2.out",
        });
    };

    const animateHeadingOut = () => {
        return gsap.to(headingRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const animateHeadingIn = () => {
        return gsap.fromTo(
            headingRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
    };

    const animateCardsIn = () => {
        const cards = document.querySelectorAll(".profile-card");
        const tl = gsap.timeline();

        gsap.set(cards, {
            opacity: 0,
            y: 50,
        });

        tl.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
        });

        return tl;
    };

    const handleVerticalChange = async (newIndex) => {
        if (isAnimating) return;
        setIsAnimating(true);

        animateHeadingOut();
        await animateCardsOut();

        setActiveButton(newIndex);

        await new Promise((resolve) => setTimeout(resolve, 50));

        animateCardsIn();
        await animateHeadingIn();

        setIsAnimating(false);
    };

    const handlePrev = () => {
        if (activeButton > 0) {
            handleVerticalChange(activeButton - 1);

            gsap.to(buttonsRef.current[activeButton - 1], {
                backgroundColor: "#fde6a8",
                color: "#000",
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out",
            });

            buttonsRef.current.forEach((button, idx) => {
                if (idx !== activeButton - 1) {
                    gsap.to(button, {
                        backgroundColor: "rgba(253, 230, 168, 0.5)",
                        color: "#000",
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                }
            });
        }
    };

    const handleNext = () => {
        if (activeButton < verticals.length - 1) {
            handleVerticalChange(activeButton + 1);

            gsap.to(buttonsRef.current[activeButton + 1], {
                backgroundColor: "#fde6a8",
                color: "#000",
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out",
            });

            buttonsRef.current.forEach((button, idx) => {
                if (idx !== activeButton + 1) {
                    gsap.to(button, {
                        backgroundColor: "rgba(253, 230, 168, 0.5)",
                        color: "#000",
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                }
            });
        }
    };

    const handleButtonClick = (index) => {
        if (index !== activeButton) {
            handleVerticalChange(index);

            gsap.to(buttonsRef.current[index], {
                backgroundColor: "#fde6a8",
                color: "#000",
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            });

            gsap.to(underlineRefs.current[index], {
                scaleX: 1,
                backgroundColor: "#000",
                duration: 0.3,
                ease: "power3.out",
            });

            buttonsRef.current.forEach((button, idx) => {
                if (idx !== index) {
                    gsap.to(button, {
                        backgroundColor: "rgba(253, 230, 168, 0.5)",
                        color: "#000",
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                    
                    gsap.to(underlineRefs.current[idx], {
                        scaleX: 0,
                        duration: 0.3,
                        ease: "power3.out",
                    });
                }
            });
        }
    };

    const handleButtonHover = (index) => {
        if (index !== activeButton) {
            gsap.to(buttonsRef.current[index], {
                scale: 1.2,
                duration: 0.2,
                ease: "power2.out",
            });

            gsap.to(underlineRefs.current[index], {
                scaleX: 1,
                backgroundColor: "#352b1e",
                duration: 0.3,
                ease: "power3.out",
            });
        }
    };

    const handleButtonLeave = (index) => {
        if (index !== activeButton) {
            gsap.to(buttonsRef.current[index], {
                scale: 1,
                duration: 0.2,
                ease: "power2.out",
            });

            gsap.to(underlineRefs.current[index], {
                scaleX: 0,
                duration: 0.3,
                ease: "power3.out",
            });
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrev,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/Assets/team.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                const allMembersList = Object.values(data).reduce((acc, team) => {
                    return acc.concat(team.data);
                }, []);

                const dataWithAll = {
                    ALL: {
                        name: "Our",
                        data: allMembersList
                    },
                    ...data
                };

                setJsonData(dataWithAll);
                setAllMembers(allMembersList);
                setVerticals(Object.keys(dataWithAll));

                animateCardsIn();
                animateHeadingIn();
            } catch (error) {
                console.error("Error fetching the JSON data:", error);
            }
        };

        fetchData();

        gsap.fromTo(
            navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
        );

        gsap.fromTo(
            buttonsRef.current,
            { y: -100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.2)",
            }
        );
    }, []);

    if (!jsonData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pt-5 bg-black bg-opacity-50 min-h-screen flex flex-col">
            <h1 className="text-white mt-10 text-[2rem] pt-5 md:text-[3rem] text-center">
                Team PRAGATI 25'
            </h1>

            <nav ref={navRef} className="w-full text-white transition-all duration-300 z-50 my-5 h-auto">
                <div className="h-full max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="lg:hidden h-full flex items-center justify-between gap-2">
                        <button
                            onClick={handlePrev}
                            disabled={activeButton === 0}
                            className="p-2 rounded-full hover:bg-yellow-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-3xl"
                            aria-label="Previous"
                        >
                            <IoArrowBack size={20} />
                        </button>

                        <div className="flex-1 text-center">
                            <h2 className="text-2xl font-large">
                                {`${jsonData[verticals[activeButton]]?.name} ${verticals[activeButton] === 'FACULTY' ? '' : 'TEAM'}`}
                            </h2>
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={activeButton === verticals.length - 1}
                            className="text-3xl p-2 rounded-full hover:bg-yellow-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Next"
                        >
                            <IoArrowForward size={20} />
                        </button>
                    </div>

                    <div className="hidden lg:flex h-full items-center justify-between">
                        <button
                            onClick={handlePrev}
                            disabled={activeButton === 0}
                            className="p-2 rounded-full transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Previous"
                        >
                            <IoArrowBack size={20} />
                        </button>

                        <div className="flex-1 flex items-center justify-center h-full">
                            {verticals.map((name, index) => (
                                <div
                                    key={index}
                                    className="relative h-full flex items-center px-2 group"
                                >
                                    <button
                                        ref={(el) => (buttonsRef.current[index] = el)}
                                        onClick={() => handleButtonClick(index)}
                                        onMouseEnter={() => handleButtonHover(index)}
                                        onMouseLeave={() => handleButtonLeave(index)}
                                        className={`
                                            px-6 py-2 rounded-md text-md
                                            transition-all duration-300 ease-out
                                            [font-family:var(--font-montserrat)]
                                            focus:outline-none focus:ring-2 focus:ring-[#fde6a8]/50
                                            ${
                                                activeButton === index
                                                    ? "bg-[#fde6a8] text-black"
                                                    : "bg-[#fde6a8]/50 text-black hover:bg-[#fde6a8]/80"
                                            }
                                        `}
                                    >
                                        {name}
                                    </button>
                                    <div
                                        ref={(el) => (underlineRefs.current[index] = el)}
                                        className="absolute bottom-0 left-0 w-full h-0.5 transform origin-left scale-x-0"
                                    ></div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={activeButton === verticals.length - 1}
                            className="p-2 rounded-full hover:bg-yellow-500/20 transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Next"
                        >
                            <IoArrowForward size={20} />
                        </button>
                    </div>
                </div>
            </nav>

            <div className="w-full py-4 flex flex-col items-center">
                <h1 ref={headingRef} className="hidden lg:block text-4xl text-white mb-8">
                    {`${jsonData[verticals[activeButton]]?.name} TEAM`}</h1>
                <section className="w-full max-w-screen-lg mx-auto mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {jsonData[verticals[activeButton]]?.data.map((member, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center profile-card"
                            >
                                <ProfileCard
                                    name={member.Name}
                                    dept={member.Dept}
                                    year={member.Year}
                                    contactEmail={member.ContactEmail}
                                    instagram={member.Instagram}
                                    linkedin={member.Linkedin}
                                    github={member.Github}
                                    image={member.Image}
                                    role={member.Role}
                                    GreekSymbol={member.GreekSymbol}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
