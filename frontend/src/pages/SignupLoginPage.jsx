import { ButtonAsChild } from '@/components/Button'
import { Card } from '@/components/ui/card'
import React from 'react'

function SignupLoginPage() {
    return (
        <div
            className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-background bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: "url('https://i.pinimg.com/1200x/cf/78/fe/cf78fe788b403ff3d41784153b10d20d.jpg')" }}
        >
            {/* Background Decor */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-black/40 md:bg-linear-to-br from-primary/10 via-background/80 to-background" />
                <div className="absolute top-1/4 left-1/2 w-full max-w-125 aspect-square -translate-x-1/2 bg-primary/20 rounded-full blur-[120px] opacity-50" />
            </div>

            {/* Main Content Container */}
            <div className="z-10 w-full max-w-2xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">

                {/* Hero Section */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                        Experience the <span className="text-primary">Future</span> of AI
                    </h1>
                    <p className="text-zinc-300 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
                        Chat with AI, organize your conversations, and explore
                        new ideas with our ultra-fast streaming interface.
                    </p>
                </div>

                {/* Action Card */}
                <Card className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto backdrop-blur-2xl bg-white/10 dark:bg-zinc-950/40 border-white/20 p-6 shadow-2xl">
                    <ButtonAsChild
                        to="/signup"
                        className="w-full sm:w-40 h-12 rounded-xl font-medium text-base transition-all hover:scale-105"
                    >
                        Get Started
                    </ButtonAsChild>

                    <ButtonAsChild
                        to="/login"
                        variant="outline"
                        className="w-full sm:w-40 h-12 rounded-xl font-medium text-base bg-transparent border-white/20 text-white hover:bg-white/10 transition-all hover:scale-105"
                    >
                        Login
                    </ButtonAsChild>
                </Card>

                {/* Minimal Footer Info */}
                <div className="pt-8 flex justify-center gap-8 text-zinc-400 text-sm font-medium">
                    <span>✦ Real-time Streaming</span>
                    <span>✦ Multi-Model Support</span>
                </div>
            </div>
        </div>
    )
}

export default SignupLoginPage