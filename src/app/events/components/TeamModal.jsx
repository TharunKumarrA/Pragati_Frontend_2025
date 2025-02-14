"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { registerTeam } from "@/app/_utils/api_endpoint_handler";

const TeamModal = ({ isOpen, eventData, onClose }) => {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    if (eventData && eventData.isGroup) {
      setTeamMembers(
        Array.from({ length: eventData.minTeamSize || 1 }, (_, i) => ({
          name: "",
          email: "",
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
    if (teamMembers.length > eventData.minTeamSize) {
      const updatedMembers = teamMembers.filter((_, i) => i !== index);

      if (updatedMembers.length > 0) {
        updatedMembers[0].role = "Leader";
      }

      setTeamMembers(updatedMembers);
    }
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const handleSubmitTeam = async () => {
    if (!teamName.trim()) {
      alert("Please enter a team name.");
      return;
    }
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

    

    try {
        const teamData = {
          eventID: eventData.eventID,
          totalMembers: teamMembers.length,
          teamName,
          teamMembers: teamMembers.map((m) => m.email),
          memberRoles: teamMembers.map((m) => m.role),
        };
        console.log("Team Data:", teamData);
        const response = await registerTeam(teamData);
        alert("Team registered successfully!");
        router.push("/payment");
        onClose();
      } catch (error) {
        alert(`Registration failed: ${error.message}`);
      }
      
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <div className="bg-[#322A1E] p-6 rounded-lg border-2 border-[#E5C14E] w-full max-w-3xl max-h-[90vh] overflow-y-auto">
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

        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#2A2218] p-4 rounded-lg flex flex-col sm:flex-row items-center sm:items-stretch gap-2 sm:gap-4"
            >
              <input
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={(e) =>
                  handleTeamMemberChange(index, "name", e.target.value)
                }
                className="w-full sm:w-1/3 p-2 border border-gray-300 rounded text-black"
              />
              <input
                type="email"
                placeholder="Email"
                value={member.email}
                onChange={(e) =>
                  handleTeamMemberChange(index, "email", e.target.value)
                }
                className="w-full sm:w-1/3 p-2 border border-gray-300 rounded text-black"
              />

              <span
                className={`px-3 py-1 text-sm font-semibold text-white rounded-lg text-center w-full sm:w-1/3
  ${
    member.role === "Leader" ? "bg-[#E5C14E]" : "bg-gray-600"
  } flex items-center justify-center`}
              >
                {member.role}
              </span>

              {teamMembers.length > eventData.minTeamSize && (
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
          className="mt-4 w-full sm:w-auto px-4 py-2 border-[#E5C14E] border-2 text-white rounded-xl"
        >
          Add Team Member
        </button>

        <div className="flex flex-col sm:flex-row justify-end mt-4 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitTeam}
            className="px-4 py-2 bg-[#E5C14E] text-white rounded w-full sm:w-auto"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;
