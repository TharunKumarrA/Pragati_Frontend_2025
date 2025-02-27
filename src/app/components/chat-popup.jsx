"use client"

import { useState } from "react"
import { useChat } from '@ai-sdk/react';
import Markdown from "react-markdown"
import { X, Loader2, Sparkles, CircleFadingArrowUpIcon } from "lucide-react"

export function ChatPopup() {
    const [isOpen, setIsOpen] = useState(false)
    const { messages, input, handleInputChange, handleSubmit, status } = useChat({});

    const [showSample, setShowSample] = useState(true);

    return (
        <>
            {!isOpen && (
                <button
                    className="fixed bottom-4 right-4 p-3 shadow-lg hover:shadow-xl transition-shadow flex flex-row justify-center items-center align-middle bg-[linear-gradient(90deg,#FACC15,#E8D096)] rounded-full border-2 border-black font-bold text-black focus:outline-none"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Pragati AI Chat"
                >
                    <Sparkles className="h-6 w-6" color="black" />
                    <span className="ml-3 text-sm tracking-wider text-center text-black hidden md:block">
                        Ask Pragati AI
                    </span>
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-4 right-4 w-96 h-[36rem] flex flex-col rounded-3xl shadow-2xl bg-[#fde6a8] bg-opacity-50 backdrop-blur-sm border-2 z-50 border-black">
                    <div className="flex flex-row items-center justify-between p-3 border-b border-black">
                        <div className="flex flex-row items-center gap-2">
                            <Sparkles className="h-6 w-6" color="black" />
                            <h2 className="text-2xl font-semibold text-black [font-family:var(--font-chicavenue)]">
                                Ask Pragati AI
                            </h2>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-full p-2 hover:bg-white/20"
                            aria-label="Close Pragati AI Chat"
                        >
                            <X className="h-5 w-5 text-black" />
                        </button>
                    </div>
                    <div className="flex-grow overflow-hidden p-4">
                        <div className="h-full w-full pr-2 overflow-y-auto">
                            {messages.length === 0 && (
                                <div className="text-center mt-5 text-sm bg-[#fff3d2]/40 border border-black p-3 rounded-xl">
                                    {"I am Pragati AI. Welcome to Pragati 2025! We're excited you're interested in our B-Fest. How can I assist you today?"}
                                </div>
                            )}
                            {messages.map((m) => (
                                <div key={m.id} className={`mb-5 w-full ${m.role === "user" ? "text-right" : "text-left"}`}>
                                    <div
                                        className={`border border-black inline-block max-w-[80%] rounded-2xl p-3 ${m.role === "user"
                                            ? "bg-[linear-gradient(90deg,#FACC15,#E8D096)] text-black"
                                            : "bg-white/10 backdrop-blur-sm text-black"
                                            }`}
                                    >
                                        <Markdown className="text-sm break-words">{m.content}</Markdown>
                                    </div>
                                </div>
                            ))}
                            {status === "submitted" && (
                                <div className="text-center mt-5">
                                    <Loader2 className="h-6 w-6 animate-spin text-[linear-gradient(90deg,#FACC15,#E8D096)]" />
                                </div>
                            )}
                            {status === "error" && (
                                <div className="text-center mt-5 text-red-500">
                                    Something went wrong. Please try again.
                                </div>
                            )}
                        </div>
                    </div>
                    {showSample && (
                        <div className="flex flex-wrap gap-2 p-5 text-xs">
                            <button
                                onClick={() => {
                                    handleInputChange({ target: { value: "What is Pragati 2025?" } });
                                    setShowSample(false);
                                }}
                                className="p-2 bg-white/10 rounded-full border border-black text-black hover:bg-white/20 focus:outline-none"
                            >
                                What is Pragati 2025?
                            </button>
                            <button
                                onClick={() => {
                                    handleInputChange({ target: { value: "What are the events this year?" } });
                                    setShowSample(false);
                                }}
                                className="p-2 bg-white/10 rounded-full border border-black text-black hover:bg-white/20 focus:outline-none"
                            >
                                Events this year
                            </button>
                            <button
                                onClick={() => {
                                    handleInputChange({ target: { value: "How do I register to Pragati 2025?" } });
                                    setShowSample(false);
                                }}
                                className="p-2 bg-white/10 rounded-full border border-black text-black hover:bg-white/20 focus:outline-none"
                            >
                                How do I register?
                            </button>
                            <button
                                onClick={() => {
                                    handleInputChange({ target: { value: "Am I eligible to participate?" } });
                                    setShowSample(false);
                                }}
                                className="p-2 bg-white/10 rounded-full border border-black text-black hover:bg-white/20 focus:outline-none"
                            >
                                Am I eligible to participate?
                            </button>
                            <button
                                onClick={() => {
                                    handleInputChange({ target: { value: "What's the venue?" } });
                                    setShowSample(false);
                                }}
                                className="p-2 bg-white/10 rounded-full border border-black text-black hover:bg-white/20 focus:outline-none"
                            >
                                {"What's the venue?"}
                            </button>
                            <button
                                onClick={() => {
                                    handleInputChange({ target: { value: "How do I reach the venue?" } });
                                    setShowSample(false);
                                }}
                                className="p-2 bg-white/10 rounded-full border border-black text-black hover:bg-white/20 focus:outline-none"
                            >
                                How do I reach the venue?
                            </button>
                        </div>
                    )}
                    <div className="p-5 border-t border-black">
                        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-3">
                            <input
                                type="text"
                                placeholder="Ask Pragati AI ... "
                                value={input}
                                onChange={handleInputChange}
                                className="flex-grow rounded-full p-3 bg-white/10 border-2 border-black focus:outline-none focus:border-black shadow-sm text-black placeholder-black/70"
                                required
                                aria-label="Enter your message"
                            />
                            <button
                                type="submit"
                                onClick={() => setShowSample(false)}
                                className="rounded-full p-3 bg-[linear-gradient(90deg,#FACC15,#E8D096)] text-black hover:bg-emerald-600 shadow-md border-2 border-black focus:outline-none"
                                aria-label="Send message"
                            >
                                <CircleFadingArrowUpIcon className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}