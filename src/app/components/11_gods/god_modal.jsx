import React from "react";
import { X } from "lucide-react";
import Image from "next/image";

const GodModal = ({ god, closeModal }) => {
  if (!god) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Glassy Blur Background */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={closeModal}
      ></div>
      <div className="relative bg-white rounded-xl shadow-lg p-6 max-w-md w-full z-60">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={closeModal}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col items-center">
          <Image
            src={god.god_image_src}
            alt={god.god_details.god_name}
            width={160}
            height={160}
            className="rounded-full object-cover"
          />
          <h2 className="text-xl font-bold mt-4">
            {god.god_details.god_name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {god.god_details.god_type}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {god.god_details.dept}
          </p>
          <p className="text-sm text-gray-700 mt-4 text-center">
            {god.god_details.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GodModal;
