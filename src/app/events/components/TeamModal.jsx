"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { registerTeam } from "@/app/_utils/api_endpoint_handler";
import secureLocalStorage from "react-secure-storage";

const TeamModal = ({ isOpen, eventData, onClose, onTeamSubmit }) => {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    if (eventData && eventData.isGroup) {
      const userEmail = secureLocalStorage.getItem("registerEmail") || "";
      const userName = secureLocalStorage.getItem("studentFullName") || "";

      setTeamMembers(
        Array.from({ length: eventData.minTeamSize || 1 }, (_, i) => ({
          name: i === 0 ? userName : "",
          email: i === 0 ? userEmail : "",
          role: i === 0 ? "Leader" : "Member",
        }))
      );
    }
  }, [eventData]);

  const addTeamMember = () => {
    if (teamMembers.length >= eventData.maxTeamSize) {
      alert(
        `Maximum ${eventData.maxTeamSize} members are allowed for this event.`
      );
      return;
    }
    setTeamMembers([...teamMembers, { name: "", email: "", role: "Member" }]);
  };

  const removeTeamMember = (index) => {
    if (index !== 0 && teamMembers.length > eventData.minTeamSize) {
      const updatedMembers = teamMembers.filter((_, i) => i !== index);
      setTeamMembers(updatedMembers);
    }
  };

  const handleTeamMemberChange = (index, field, value) => {
    // Prevent changes to the team leader's email field
    if (index === 0 && field === "email") return;
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const handleSubmitTeam = () => {
    if (!teamName.trim()) {
      alert("Please enter a team name.");
      return;
    }
    for (let member of teamMembers) {
      if (!member.email) {
        alert("Please fill in all team member details.");
        return;
      }
      if (!member.email.includes("@")) {
        alert(`Invalid email for ${member.name}.`);
        return;
      }
    }

    const teamData = {
      eventID: eventData.eventID,
      totalMembers: teamMembers.length,
      teamName,
      teamMembers: teamMembers.slice(1).map((m) => m.email),
      memberRoles: teamMembers.slice(1).map((m) => m.role),
    };
    onTeamSubmit(teamData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 px-4">
      {/* Reduced max width for desktop view */}
      <div className="bg-[#322A1E] p-6 rounded-2xl border-2 border-[#E5C14E] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-white text-xl mb-4 text-center">
          Create Your Team
        </h2>

        {/* Team Name Input */}
        <div className="mb-4">
          <label className="text-white block mb-1">Team Name</label>
          <input
            type="text"
            placeholder="Enter your team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>

        <div className="space-y-2">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#2A2218] p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-2 sm:gap-4"
            >
              <input
                type="email"
                placeholder="Email"
                value={member.email}
                onChange={(e) =>
                  handleTeamMemberChange(index, "email", e.target.value)
                }
                disabled={index === 0}
                className="w-full p-2 border border-gray-300 rounded text-black disabled:bg-gray-400"
              />

              <span
                className={`px-3 py-1 text-sm font-semibold text-white rounded-lg text-center ${
                  member.role === "Leader" ? "bg-[#E5C14E]" : "bg-gray-600"
                }`}
              >
                {member.role}
              </span>

              {index !== 0 && teamMembers.length > eventData.minTeamSize && (
                <button
                  onClick={() => removeTeamMember(index)}
                  className="text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addTeamMember}
          className="mt-4 w-full sm:w-auto px-4 py-2 border-[#E5C14E] border-2 text-white rounded-2xl"
        >
          Add Team Member
        </button>

        <div className="flex flex-col sm:flex-row justify-end mt-4 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-2xl w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitTeam}
            className="px-4 py-2 bg-[#E5C14E] text-white rounded-2xl w-full sm:w-auto"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;
