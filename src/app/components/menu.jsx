import Link from "next/link";

const FullPageMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const pages = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Schedule", href: "/schedule" },
    { name: "Brochure", href: "/brochure" },
    { name: "Login/Sign Up", href: "/login" },
  ];

  return (
    <div
      className="fixed inset-0 top-[7%] z-20 flex flex-col text-white"
      style={{
        backgroundImage: 'url(/Images/backgrounds/aegean_seascape.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex-grow flex flex-col items-center text-center [font-family:var(--font-chicavenue)] text-[3rem] justify-center bg-black bg-opacity-50">
        {pages.map((page) => (
          <Link
            key={page.name}
            href={page.href}
            className="border-b-[1px] border-white p-2 w-full"
            onClick={onClose} 
          >
            {page.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FullPageMenu;
