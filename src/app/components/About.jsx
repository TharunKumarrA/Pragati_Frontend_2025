"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const About = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const details = gsap.utils.toArray(
      ".desktopContentSection:not(:first-child)"
    );
    const photos = gsap.utils.toArray(".desktopPhoto:not(:first-child)");
    gsap.set(photos, { yPercent: -101 });
    const allPhotos = gsap.utils.toArray(".desktopPhoto");

    let mm = gsap.matchMedia();
    mm.add("(min-width: 600px)", () => {
      ScrollTrigger.create({
        trigger: ".gallery",
        start: "top top",
        end: "bottom bottom",
        pin: ".right",
      });

      details.forEach((detail, index) => {
        let headline = detail.querySelector("h1");
        let animation_1 = gsap.timeline();
        animation_1
          .to(photos[index], { yPercent: 0, ease: "power2.inOut" })
          .set(allPhotos[index], { autoAlpha: 0 });
        ScrollTrigger.create({
          trigger: headline,
          start: "top 80%",
          end: "top 50%",
          animation: animation_1,
          scrub: 1.4,
          markers: false,
        });
      });
    });

    mm.add("(max-width: 599px)", () => {
      ScrollTrigger.create({
        trigger: ".gallery",
        start: "top top",
        end: "bottom 50%",
        pin: ".right",
      });
      details.forEach((detail, index) => {
        let headline = detail.querySelector("h1");
        //console.log(headline);
        let animation_2 = gsap.timeline();
        animation_2
          .to(photos[index], { yPercent: 0, ease: "power2.inOut" })
          .set(allPhotos[index], { autoAlpha: 0 });

        ScrollTrigger.create({
          trigger: headline,
          start: "top 80%",
          end: "bottom 50%",
          animation: animation_2,
          scrub: 1,
        });
      });
    });
    return () => {
      mm.revert();
    };
  }, []);

  const pragati =
    "Pragati is the National-level B-Fest hosted by Amrita School of Business every year. The B-Fest comprises of management games crafted for each domain of business administration including Marketing, Finance, Operations, HR and Systems. And year-on-year Pragati has proven its mettle by attracting talents from many leading management institutes in the country, to challenge each other across all domains and aim at achieving the overall championship award.";
  const asb =
    "Amrita School of Business at Coimbatore Campus provides broad-based and specialized business education, preparing individuals to confidently face the ever-growing challenges in the business environment. During their two-year study, students secure essential business knowledge and skills and a deep appreciation for values in business, very critical for effective business performance. School of Business (ASB) has been accredited with AACSB ranking (Association to Advance Collegiate Schools of Business) Internationally in 2019. ASB is the 11th B-School in India to be accredited by AACSB and as of 2022 only 21 Institutions in India has been accredited by AACSB.";

  return (
    <div className="spacer">
      <div className="gallery flex flex-col-reverse md:flex-row">
        {/* Left Section */}
        <div className="left w-full md:w-1/2">
          <div className="desktopContent mx-auto w-[85%] md:w-4/5">
            <div className="desktopContentSection flex flex-col justify-center min-h-[50vh] md:min-h-screen">
              <h1 className="font-chicavenue text-[2rem] md:text-[3rem]">
                About Pragati
              </h1>
              <p className="text-md md:text-lg text-justify">{pragati}</p>
            </div>
            <div className="desktopContentSection flex flex-col justify-center min-h-screen">
              <h1 className="text-[2rem] md:text-[3rem] font-bold">
                About ASB
              </h1>
              <p className="text-md md:text-lg text-justify">{asb}</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right h-[45vh] md:h-screen w-full md:w-1/2 flex flex-col justify-center">
          {/* Top Image */}
          <div className="topImage w-full h-[5vh] md:h-[10vh] relative overflow-hidden shadow-lg">
            <Image
              src="/Assets/border_style_3.jpg"
              width={1000}
              height={500}
              alt="Top Image"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main Images */}
          <div className="desktopPhotos h-[40vh] md:h-[80vh] relative overflow-hidden shadow-lg">
            <div className="desktopPhoto absolute w-full h-full">
              <Image
                src="/Images/pragati.webp"
                width={1000}
                height={1000}
                alt="Pragati"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="desktopPhoto absolute w-full h-full">
              <Image
                src="/Images/asb.webp"
                width={700}
                height={700}
                alt="ASB"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bottom Image */}
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
