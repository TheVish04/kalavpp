
import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Smile, Paperclip, CheckCircle, RotateCcw } from 'lucide-react';
import MilestoneTracker from './MilestoneTracker';

const CommissionChat = ({ project, messages, onSendMessage, onApprove, onRequestRevision }) => {
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        onSendMessage(project.id, inputValue);
        setInputValue('');
    };

    // Calculate generic step index for tracker
    const getStepIndex = (status) => {
        const steps = ['Request Sent', 'Deposit Paid', 'Sketch Review', 'Final Polish', 'Delivery'];
        return steps.indexOf(status);
    };

    const currentStepIndex = getStepIndex(project.status);

    return (
        <div className="flex-1 flex flex-col h-full bg-[#0a0a0a] relative">

            {/* Header / Top Bar */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 px-6 py-4">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-primary text-xs font-bold uppercase tracking-widest">Commission #{project.id}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                            <span className="text-gray-500 text-xs">Standard License</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white">Project: {project.title}</h1>
                    </div>
                </div>

                {/* Tracker embedded in header */}
                <MilestoneTracker currentStepIndex={currentStepIndex} />
            </div>

            {/* Chat Area */}
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-4 md:px-6 pt-48 pb-6 custom-scrollbar"
            >
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Timestamp Divider */}
                    <div className="flex items-center justify-center">
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-3 py-1 bg-[#121212] rounded-full">
                            Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>

                    {messages.map((msg) => {
                        const isMe = msg.sender === 'me';
                        return (
                            <div key={msg.id} className={`flex gap-4 ${isMe ? 'flex-row-reverse' : ''}`}>
                                {!isMe && (
                                    <img
                                        src={project.artistAvatar} alt="Artist"
                                        className="w-8 h-8 rounded-full object-cover mt-1"
                                    />
                                )}
                                {isMe && (
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs mt-1">
                                        YOU
                                    </div>
                                )}

                                <div className={`flex flex-col max-w-[80%] md:max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                                    <div className={`px-5 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${isMe
                                            ? 'bg-primary text-white rounded-tr-sm'
                                            : 'bg-[#1e1e1e] text-gray-200 border border-white/5 rounded-tl-sm'
                                        }`}>
                                        {msg.text}

                                        {/* Optional Image Attachment Mock */}
                                        {msg.image && (
                                            <div className="mt-3 mb-1 rounded-lg overflow-hidden border border-white/10">
                                                <img src={msg.image} alt="Attachment" className="w-full h-auto" />
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-gray-600 mt-1 px-1">
                                        {msg.timestamp}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} className="h-1"></div>
                </div>
            </div>

            {/* Sticky Action Bar (If Review Phase) */}
            {project.status.includes('Review') && (
                <div className="absolute bottom-20 left-0 right-0 z-30 flex justify-center pointer-events-none">
                    <div className="bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-full p-1.5 pl-4 flex gap-2 pointer-events-auto shadow-2xl items-center animate-in slide-in-from-bottom-4 duration-500">
                        <span className="text-xs font-bold text-white mr-2">Action Required:</span>
                        <button
                            onClick={() => onRequestRevision(project.id)}
                            className="bg-[#2a2a2a] hover:bg-[#333] text-white text-xs font-bold py-2 px-4 rounded-full border border-white/5 transition-colors flex items-center gap-1.5"
                        >
                            <RotateCcw size={12} /> Request Revision
                        </button>
                        <button
                            onClick={() => onApprove(project.id)}
                            className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all flex items-center gap-1.5"
                        >
                            <CheckCircle size={12} /> Approve Milestone
                        </button>
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="bg-[#121212] border-t border-white/5 p-4 z-20">
                <div className="max-w-4xl mx-auto relative">
                    <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-[#1e1e1e] rounded-xl p-2 border border-white/5 focus-within:border-primary/50 transition-colors">
                        <button type="button" className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                            <ImageIcon size={20} />
                        </button>
                        <button type="button" className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 hidden sm:block">
                            <Paperclip size={20} />
                        </button>

                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            placeholder={`Message ${project.artistName}...`}
                            className="flex-1 bg-transparent border-none outline-none text-white text-sm max-h-32 min-h-[40px] py-2.5 px-1 resize-none placeholder-gray-500 custom-scrollbar"
                            rows={1}
                        />

                        <button
                            type="submit"
                            disabled={!inputValue.trim()}
                            className="p-2.5 bg-primary hover:bg-primary-dark disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-all shadow-lg active:scale-95"
                        >
                            <Send size={18} fill="currentColor" />
                        </button>
                    </form>
                    <div className="text-[10px] text-gray-600 text-center mt-2">
                        Press Enter to send. Shift + Enter for new line.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommissionChat;
