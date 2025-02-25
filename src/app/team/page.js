"use client";
import ProfileCard from "./components/profile";
import teamData from "../team/members.json";

export default function Page() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen gap-10 p-10">
            <section className="w-full text-center">
                <div className="flex flex-wrap justify-center gap-6">
                    {teamData["DEV TEAM"].data.map((member, index) => (
                        <ProfileCard
                            key={index}
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
                    ))}
                </div>
            </section>
        </main>
    );
}