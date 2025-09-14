"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Mic, MicOff, Send, Volume2, VolumeX, Bot, User } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import type { SpeechRecognition } from "types/speech-recognition" // Declare SpeechRecognition type

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotPage() {
  const { t } = useTranslation()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: t("chatbotPlaceholder"),
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputText(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }

    // Initialize speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthesisRef.current = window.speechSynthesis
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)

      // Speak the response
      if (synthesisRef.current && !isSpeaking) {
        speakText(botResponse)
      }
    }, 1000)
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("weather") || input.includes("rain") || input.includes("temperature")) {
      return "Based on current weather data, expect moderate rainfall in the next 3 days. Temperature will range from 22-28°C. Perfect conditions for rice cultivation. Consider applying organic fertilizer before the rain."
    }

    if (input.includes("crop") || input.includes("plant") || input.includes("grow")) {
      return "For this season, I recommend growing tomatoes, peppers, or leafy greens. These crops are well-suited for current weather conditions. Would you like specific planting guidelines for any of these crops?"
    }

    if (input.includes("pest") || input.includes("disease") || input.includes("insect")) {
      return "Common pests this season include aphids and whiteflies. Use neem oil spray (10ml per liter water) early morning or evening. For fungal diseases, ensure proper drainage and air circulation. Upload a photo for specific pest identification."
    }

    if (input.includes("fertilizer") || input.includes("nutrition") || input.includes("soil")) {
      return "For healthy soil, use a balanced NPK fertilizer (10:10:10) at 2kg per acre. Add organic compost monthly. Test soil pH - it should be between 6.0-7.0 for most crops. Consider adding lime if soil is too acidic."
    }

    if (input.includes("market") || input.includes("price") || input.includes("sell")) {
      return "Current market prices: Tomatoes ₹25/kg, Onions ₹18/kg, Rice ₹22/kg. Prices are expected to rise 10-15% next week due to festival demand. Consider holding your produce for better rates."
    }

    return "I'm here to help with all your farming questions! You can ask me about crops, weather, pests, soil health, market prices, or any other agricultural topic. How can I assist you today?"
  }

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      recognitionRef.current?.start()
      setIsListening(true)
    }
  }

  const speakText = (text: string) => {
    if (synthesisRef.current) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.onend = () => setIsSpeaking(false)
      synthesisRef.current.speak(utterance)
    }
  }

  const toggleSpeaking = () => {
    if (isSpeaking) {
      synthesisRef.current?.cancel()
      setIsSpeaking(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
          <MessageCircle className="h-8 w-8" />
          {t("chatbotTitle")}
        </h1>
        <p className="text-muted-foreground text-lg">
          Ask me anything about farming, crops, weather, pests, or market prices. I support both text and voice input!
        </p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <span>Chat Assistant</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleSpeaking}
                className={isSpeaking ? "bg-destructive text-destructive-foreground" : ""}
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-4">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">{message.timestamp.toLocaleTimeString()}</span>
                  </div>

                  {message.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <div className="flex-1 flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t("chatbotPlaceholder")}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={toggleListening}
                className={isListening ? "bg-destructive text-destructive-foreground animate-pulse" : ""}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Button onClick={handleSendMessage} disabled={!inputText.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Tip: Click the microphone to use voice input, or type your questions about farming!
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
