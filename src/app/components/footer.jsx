import {
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  ExternalLink,
  CircleDot,
  Play,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = ({ current_page }) => {
  const pages = [
    { name: "HOME", href: "/" },
    { name: "EVENTS", href: "/events" },
    { name: "TEAM", href: "/upcoming" },
    { name: "PRIVACY POLICY", href: "/privacyPolicy" },
  ];

  return (
    <div className="relative h-1/2 footer-font bg-black">
      <div className="flex flex-wrap p-2 md:p-8  space-x-4 lg:justify-center">
        {/* Footer Image */}
        <div className="p-6">
          <Image
            src="/Images/footer_image.png"
            alt="footerImage"
            width={600}
            height={600}
            style={{ height: "280px", objectFit: "contain" }}
          />
        </div>

        {/* Contact Section */}
        <div className="pl-4 pr-4 pb-4 block lg:w-1/2">
          <div>
            <h1 className="text-white text-5xl">REACH OUT TO US!</h1>
            <h6 className="text-gray-600">
              Feel free to reach out to us if you have any queries
            </h6>
          </div>
          <div className="mt-7">
            <Link
              href="mailto:pragatiinfo@cb.amrita.edu"
              className="text-white text-xl flex hover:space-x-4 transition duration-500 ease-in-out lg:text-2xl"
            >
              <p>pragatiinfo@cb.amrita.edu</p>
              <ArrowRight className="align-middle mt-1.5 ml-2" />
            </Link>
          </div>

          {/* Address & Follow Us */}
          <div className="mt-5 flex flex-col lg:flex-row gap-2 lg:justify-between">
            <div className="mt-3">
              <h2 className="text-white font-bold">OUR ADDRESS</h2>
              <Link
                href="https://maps.app.goo.gl/33X3zkFF7MGwchza9"
                target="_blank"
              >
                <span className="text-gray-400 hover:text-white flex">
                  <p>Amrita School of Business</p>
                  <MapPin className="ml-[4px] w-5 h-5" />
                </span>
              </Link>
              <p className="text-gray-500 text-sm">Coimbatore Campus</p>
              <p className="text-gray-500 text-sm">Amritanagar</p>
              <p className="text-gray-500 text-sm">Coimbatore - 641 112</p>
              <p className="text-gray-500 text-sm">Tamilnadu, India</p>
            </div>

            {/* Social Media Links */}
            <div className="mt-3">
              <h2 className="text-white font-bold">FOLLOW US</h2>
              <div className="flex flex-wrap mt-1 w-36 gap-2">
                {[
                  {
                    href: "https://www.instagram.com/pragati.asb/",
                    icon: <Instagram className="w-4 h-4" />,
                  },
                  {
                    href: "https://www.linkedin.com/company/pragati-asb/",
                    icon: <Linkedin className="w-4 h-4" />,
                  },
                ].map((link, index) => (
                  <Link key={index} href={link.href} target="_blank">
                    <span className="text-gray-500 hover:text-white">
                      {link.icon}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Additional Links */}
              <div className="block mt-5 space-y-2">
                <div className="flex items-center">
                  <Link
                    href="https://www.amrita.edu/school/business/coimbatore/"
                    target="_blank"
                    className="text-gray-200 hover:text-white hover:font-bold"
                  >
                    AMRITA.EDU
                  </Link>
                  <ExternalLink className="pr-1 pl-1 text-gray-500 text-xl -mt-0.5 hover:scale-120" />
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="mt-3">
              {pages.map((page) => (
                <div key={page.name} className="text-gray-400 hover:text-white">
                  {current_page === page.name.toLowerCase() ? (
                    <div className="flex items-center text-white">
                      <CircleDot className="align-middle mr-1 w-4 h-4" />
                      <Link href={page.href}>{page.name}</Link>
                    </div>
                  ) : (
                    <Link href={page.href}>{page.name}</Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
