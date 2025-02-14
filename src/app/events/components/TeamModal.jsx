"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

const TeamModal = ({ isOpen, eventData, onClose }) => {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    if (eventData && eventData.isGroup) {
      setTeamMembers(
        Array.from({ length: eventData.minTeamSize || 1 }, () => ({
          name: "",
          email: "",
        }))
      );
    }
  }, [eventData]);

  const addTeamMember = () => {
    if (teamMembers.length >= eventData.maxTeamSize) {
      alert(`Maximum ${eventData.maxTeamSize} members are allowed for this event.`);
      return;
    }
    setTeamMembers([...teamMembers, { name: "", email: "" }]);
  };

  const removeTeamMember = (index) => {
    if (teamMembers.length > eventData.minTeamSize) {
      setTeamMembers(teamMembers.filter((_, i) => i !== index));
    }
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const handleSubmitTeam = async () => {
    for (let member of teamMembers) {
      if (!member.name || !member.email) {
        alert("Please fill in all team member details.");
        return;
      }
      if (!member.email.includes("@")) {
        alert(`Invalid email for ${member.name}.`);
        return;
      }
    }
    router.push("/payment");
    onClose();
    
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <div className="bg-[#322A1E] p-6 rounded-lg w-full max-w-lg sm:max-w-2xl lg:max-w-3xl">
        <h2 className="text-white text-xl mb-4 text-center">Add Team Members</h2>

        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={(e) => handleTeamMemberChange(index, "name", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
              <input
                type="email"
                placeholder="Email"
                value={member.email}
                onChange={(e) => handleTeamMemberChange(index, "email", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
              {teamMembers.length > eventData.minTeamSize && (
                <button onClick={() => removeTeamMember(index)} className="text-red-500">
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addTeamMember}
          className="mt-4 w-full sm:w-auto px-4 py-2 border-[#E5C14E] border-2 text-white rounded-xl"
        >
          Add Team Member
        </button>

        <div className="flex flex-col sm:flex-row justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded w-full sm:w-auto">
            Cancel
          </button>
          <button onClick={handleSubmitTeam} className="px-4 py-2 bg-[#E5C14E] text-white rounded w-full sm:w-auto">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;
