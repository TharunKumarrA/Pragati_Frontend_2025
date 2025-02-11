"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const About = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Select all desktop content sections except the first one.
    const details = gsap.utils.toArray(
      ".desktopContentSection:not(:first-child)"
    );
    // All desktop photos except the first one.
    const photos = gsap.utils.toArray(".desktopPhoto:not(:first-child)");
    // All photos (used to fade them out after the transition).
    const allPhotos = gsap.utils.toArray(".desktopPhoto");

    // Initially, set image parameters:
    gsap.set(allPhotos, { autoAlpha: 1, scale: 1 });
    gsap.set(photos, { autoAlpha: 0, scale: 1.05 });
    gsap.set(".blackOverlay", { autoAlpha: 0 });

    let mm = gsap.matchMedia();

    // Function to create animations for both desktop and mobile
    const createAnimations = (isMobile) => {
      // Pin the right section during scroll.
      ScrollTrigger.create({
        trigger: ".gallery",
        start: "top top",
        end: "bottom bottom",
        pin: ".right",
      });

      // For each subsequent content section, animate text and image transitions.
      details.forEach((detail, index) => {
        const headline = detail.querySelector("h1");
        const paragraph = detail.querySelector("p");

        let tl = gsap.timeline();

        tl.from(headline, {
          opacity: 0,
          clipPath: "inset(0 100% 0 0)",
          duration: 0.7,
          ease: "power3.out",
        })
          .from(
            paragraph,
            {
              opacity: 0,
              clipPath: "inset(0 100% 0 0)",
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.5"
          )
          .to(
            `.blackOverlay-${index}`,
            {
              autoAlpha: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            isMobile ? 0.3 : 0 // Adjust starting time for mobile
          )
          .to(
            allPhotos[index],
            {
              autoAlpha: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            isMobile ? 0.3 : 0 // Adjust starting time for mobile
          )
          .to(
            photos[index],
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            isMobile ? 0.3 : 0 // Adjust starting time for mobile
          )
          .to(
            `.blackOverlay-${index}`,
            {
              autoAlpha: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            isMobile ? 0.8 : 0.5 // Adjust ending time for mobile
          );

        ScrollTrigger.create({
          trigger: detail,
          start: isMobile ? "top 60%" : "top 50%",
          end: isMobile ? "top 40%" : "top 30%",
          animation: tl,
          scrub: isMobile ? 1 : 1.4,
        });
      });
    };

    // Desktop animations (min-width: 600px)
    mm.add("(min-width: 600px)", () => {
      createAnimations(false);
    });

    // Mobile animations (max-width: 599px)
    mm.add("(max-width: 599px)", () => {
      // Adjust the scaling and clipping for mobile devices
      gsap.set(allPhotos, { scale: 1 });
      gsap.set(photos, { scale: 1.05 });
      createAnimations(true);
    });

    return () => {
      mm.revert();
    };
  }, []);

  const pragati =
    "Pragati is the National-level B-Fest hosted by Amrita School of Business every year. The B-Fest comprises of management games crafted for each domain of business administration including Marketing, Finance, Operations, HR and Systems. And year-on-year Pragati has proven its mettle by attracting talents from many leading management institutes in the country, to challenge each other across all domains and aim at achieving the overall championship award.";

  const asb =
    "Nestled at the foothills of the Western Ghats, Amrita School of Business, Coimbatore, is more than an institution—it’s a canvas where dreams are painted and leaders are born. Established in 1996 by Mata Amritanandamayi Devi, ASB blends cutting-edge academics with timeless values, inspiring students to lead not just with intellect but with heart. It is a space where challenges become opportunities, innovation thrives, and careers are built with resilience, character, and vision. Ranked among India’s top 27 B-schools, ASB is proudly AACSB-accredited and holds NAAC’s prestigious A++ grade for academic rigor and impact.\n\nAt ASB, education is a transformative journey that unlocks true potential. With dynamic MBA and PhD programs designed to shape the leaders of tomorrow, it goes beyond knowledge to instill excellence with purpose. Every moment here is a step toward brilliance, where passion meets innovation and the future of business leadership takes flight. Welcome to the heart and soul behind Pragati—where ordinary ends, and extraordinary begins!";

  const pragati24 =
    "Pragati 2024, National Level B Fest concludes The Amrita School of Business, Coimbatore, celebrated another successful edition of Pragati in February 2024, under the theme ‘Multiple Universes, One Extravaganza’. The fest attracted a wide array of participants from numerous business schools, engaging them in a series of management and non-management challenges aimed at sharpening their business skills. A highlight of the event was an inspiring address by Swami Amritaswarupananda Puri, the President of Amrita University, who shared valuable insights and encouragement with the students, further enriching the experience of Pragati 2024. This fest continues to be a pivotal event for fostering innovation, networking, and collaboration among the future luminaries of the business world.";

  return (
    <div className="spacer">
      <div className="gallery flex flex-col-reverse md:flex-row">
        {/* Left Section */}
        <div className="left w-full md:w-1/2">
          <div className="desktopContent mx-auto w-[85%] md:w-4/5">
            <div className="desktopContentSection flex flex-col justify-center min-h-[50vh] md:min-h-screen overflow-hidden">
              <h1 className="font-chicavenue text-[2rem] md:text-[3rem]">
                About Pragati
              </h1>
              <p className="text-md md:text-lg text-justify">{pragati}</p>
            </div>
            <div className="desktopContentSection flex flex-col justify-center min-h-screen overflow-hidden">
              <h1 className="text-[2rem] md:text-[3rem] font-bold">
                About ASB
              </h1>
              <p className="text-md md:text-lg text-justify">{asb}</p>
            </div>
            <div className="desktopContentSection flex flex-col justify-center min-h-[50vh] md:min-h-screen overflow-hidden">
              <h1 className="font-chicavenue text-[2rem] md:text-[3rem]">
                Pragati &apos;24 recap
              </h1>
              <p className="text-md md:text-lg text-justify">{pragati24}</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right h-[45vh] md:h-screen w-full md:w-1/2 flex flex-col justify-center">
          <div className="topImage w-full h-[5vh] md:h-[10vh] relative overflow-hidden shadow-lg">
            <Image
              src="/Assets/border_style_3.jpg"
              width={1000}
              height={500}
              alt="Top Image"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="desktopPhotos h-[40vh] md:h-[80vh] relative overflow-hidden shadow-lg">
            <div className="desktopPhoto absolute w-full h-full">
              <Image
                src="/Images/pragati.webp"
                width={1000}
                height={1000}
                alt="Pragati"
                className="w-full h-full object-cover"
              />
              <div className="blackOverlay blackOverlay-0 absolute inset-0 bg-black opacity-0 z-10"></div>
            </div>
            <div className="desktopPhoto absolute w-full h-full">
              <Image
                src="/Images/asb.webp"
                width={700}
                height={700}
                alt="ASB"
                className="w-full h-full object-cover"
              />
              <div className="blackOverlay blackOverlay-1 absolute inset-0 bg-black opacity-0 z-10"></div>
            </div>
            <div className="desktopPhoto absolute w-full h-full">
              <Image
                src="/Images/pragati.webp"
                width={700}
                height={700}
                alt="Pragati 24"
                className="w-full h-full object-cover"
              />
              <div className="blackOverlay blackOverlay-2 absolute inset-0 bg-black opacity-0 z-10"></div>
            </div>
          </div>

          <div className="bottomImage w-full h-[5vh] md:h-[10vh] relative overflow-hidden shadow-lg">
            <Image
              src="/Assets/border_style_3.jpg"
              width={1000}
              height={300}
              alt="Bottom Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
