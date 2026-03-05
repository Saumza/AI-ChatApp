import React from "react";
import { Send, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

export function ChatInput({ value, onChange, onSubmit, onStop, isStreaming, model, onModelChange }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!isStreaming) onSubmit();
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-4 pb-8">
            {/* Container with relative positioning to host the button inside */}
            <div className="relative flex items-center group">
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything"
                    className="w-full h-14 pl-6 pr-14 rounded-full border-zinc-800 placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:ring-offset-0 transition-all"
                />

                {/* Absolute positioned button inside the input ring */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">

                    {!isStreaming && (
                        <Select value={model} onValueChange={onModelChange}>
                            <SelectTrigger className="h-9 w-28 rounded-full border-gray-200 bg-gray-100 text-gray-700 text-xs focus:ring-0 focus:ring-offset-0 hover:bg-gray-200 transition-colors">
                                <SelectValue placeholder="Model" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-200 text-gray-700 shadow-xl">
                                <SelectItem value="gemma-3-27b-it" className="focus:bg-gray-100">gemma-3-27b-it</SelectItem>
                            </SelectContent>
                        </Select>
                    )}

                    {isStreaming ? (
                        <Button
                            type="button"
                            onClick={onStop}
                            size="icon"
                            className="h-10 w-10 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white shadow-md transition-transform active:scale-95"
                        >
                            <Square className="h-4 w-4 fill-current" />
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            onClick={onSubmit}
                            disabled={!value}
                            size="icon"
                            className="h-10 w-10 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white shadow-md transition-transform active:scale-95 disabled:bg-gray-200 disabled:text-gray-400"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
            <p className="text-[11px] text-center mt-3 text-zinc-500">
                AI may produce inaccurate information about people, places, or facts.
            </p>
        </div>
    );
}