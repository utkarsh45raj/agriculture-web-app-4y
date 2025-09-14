
"use client"

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Cloud, Sprout, ArrowRight, Users, TrendingUp, Shield, Target } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"

// PhotoCarousel component for the Social Proof section
const carouselData = [
  {
    src: "/bimayojna.png",
    alt: "PM bima yojna",
    desc: "To provide accident insurance cover to the deprived population at an extremely affordable premium"
  },
  {
    src: "/dhan.png",
    alt: "dhan-dhanya krishi scheme",
    desc: "comprehensive farm programme designed to enhance productivity, promote sustainable practices, and improve livelihoods."
  },
  {
    src: "/aasha.png",
    alt: "aanya data scheme",
    desc: "in support of farmers and to provide them with financial assistance for their agricultural needs."
  },
  {
    src: "/nmoop.png",
    alt: "nmoop scheme",
    desc: "aim to boost the production of oilseeds in the country, farmers growing oilseeds are benefited by government."
  },
];

function PhotoCarousel() {
  const [index, setIndex] = useState(0);

  // Auto slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselData.length);
    }, 3000); // changed from 5000 to 3000
    return () => clearInterval(interval);
  }, []);

  const { src, alt, desc } = carouselData[index];

  return (
    <div className="flex flex-col items-center justify-center mb-8 relative">
      {/* Image + Description */}
      <img
        src={src}
        alt={alt}
        className="w-[500px] h-[350px] max-w-full object-cover rounded-xl shadow-lg mb-3 border border-green-200"
        style={{ background: "#e6f4ea" }}
      />
      <p className="text-base text-muted-foreground text-center max-w-md">{desc}</p>

      {/* Dots Indicator */}
      <div className="flex gap-3 mt-4">
        {carouselData.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`h-4 w-4 rounded-full cursor-pointer transition ${
              i === index ? "bg-green-700" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Background Image */}
      <div
        className="text-center mb-12 animate-fade-in-up relative py-20 rounded-lg overflow-hidden bg-gradient-to-r from-green-800 to-green-600"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/lush-green-agricultural-fields-with-modern-farming.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance drop-shadow-lg">
            {t("heroTitle")}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty drop-shadow-md">{t("heroSubtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chatbot">
              <Button
                size="lg"
                className="animate-pulse-green bg-white text-green-800 hover:bg-white/90 font-semibold shadow-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {t("startFreeAdvisory")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Our Vision Section */}
      
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-primary mb-6">Our Vision</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              To empower farmers with cutting-edge AI technology, providing personalized insights and recommendations that
              transform traditional farming into smart, sustainable agriculture. We envision a future where every farmer
              has access to intelligent farming solutions that maximize yield, minimize risk, and promote environmental
              sustainability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Smart Farming</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Leveraging AI to make farming more efficient and productive
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Farmer Empowerment</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Providing tools and knowledge to help farmers succeed
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Sprout className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Sustainable Growth</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Promoting eco-friendly practices for long-term sustainability
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* Key Features Section */}
      <div className="text-center mb-12 animate-fade-in-up">
        <div
          className="border-2 rounded-xl p-6 mb-12"
          style={{  backgroundColor: '#ECFDF5' }}
        >
          <h2 className="text-3xl font-bold text-primary mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
             
        <Link href="/chatbot">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up cursor-pointer h-full">
            <CardHeader className="text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">AI Chatbot</CardTitle>
              <CardDescription>Get instant farming advice with AI</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/weather">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up cursor-pointer h-full">
            <CardHeader className="text-center">
              <Cloud className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">{t("weatherAlertsTitle")}</CardTitle>
              <CardDescription>{t("weatherAlertsDesc")}</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/crop-advisory">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up cursor-pointer h-full">
            <CardHeader className="text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">{t("cropAdvisoryTitle")}</CardTitle>
              <CardDescription>{t("cropAdvisoryDesc")}</CardDescription>
            </CardHeader>
          </Card>
        </Link>


        <Link href="/soil-health">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up cursor-pointer h-full">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">{t("soilHealth")}</CardTitle>
              <CardDescription>{t("soilHealthDesc")}</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/pest-detection">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up cursor-pointer h-full">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">{t("pestDetectionTitle")}</CardTitle>
              <CardDescription>{t("pestDetectionDesc")}</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/market-prices">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up cursor-pointer h-full">
            <CardHeader className="text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">{t("marketPricesTitle")}</CardTitle>
              <CardDescription>{t("marketPricesDesc")}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
          </div>
        </div>
      </div>
      {/*
      Detailed Feature Cards - Updated to match pest detection style
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>AI Chatbot</CardTitle>
            <CardDescription>Get instant answers to your farming questions with voice and text support</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Our AI assistant provides personalized farming advice, crop recommendations, and answers to your
              agricultural questions 24/7 in multiple languages.
            </p>
            <Link href="/chatbot">
              <Button variant="outline" size="sm">
                {t("tryNow")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cloud className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Weather Insights</CardTitle>
            <CardDescription>Real-time weather data and predictive insights for farming</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Stay informed with accurate weather forecasts, rainfall predictions, and AI-powered insights to optimize
              your farming activities and protect your crops.
            </p>
            <Link href="/weather">
              <Button variant="outline" size="sm">
                {t("viewMore")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sprout className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Smart Crop Advisory</CardTitle>
            <CardDescription>Personalized crop recommendations and growing guides</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Receive data-driven crop suggestions based on your location, soil conditions, weather patterns, and market
              trends for maximum profitability.
            </p>
            <Link href="/crop-advisory">
              <Button variant="outline" size="sm">
                {t("getStarted")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      */}

      {/* Social Proof Section */}
      {/*<div className="bg-card rounded-lg p-8 mb-12 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-center mb-8 text-card-foreground">Trusted by Farmers Across India</h2>*/}

        {/* Government Schemes Section Heading */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-primary mb-6">Government schemes</h2>
        </div>
        {/* Photo carousel with 1-line description */}
        <PhotoCarousel />
        {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
            
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <p className="text-muted-foreground">States Covered</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">25%</div>
            <p className="text-muted-foreground">Average Yield Increase</p>
          </div>
        </div>*/}

      {/* Footer Section with Quick Access Tools */}
      <footer className="bg-card rounded-lg p-8 animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Access Tools */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-card-foreground">Quick Access Tools</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/chatbot">
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent w-full"
                >
                  <MessageCircle className="h-6 w-6" />
                  <span>AI Chatbot</span>
                </Button>
              </Link>
              <Link href="/weather">
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent w-full"
                >
                  <Cloud className="h-6 w-6" />
                  <span>Weather</span>
                </Button>
              </Link>
              <Link href="/crop-advisory">
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent w-full"
                >
                  <Sprout className="h-6 w-6" />
                  <span>Crop Guide</span>
                </Button>
              </Link>
              <Link href="/soil-health">
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent w-full"
                >
                  <Shield className="h-6 w-6" />
                  <span>Soil Health</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-card-foreground">Kisan Mitra</h3>
            <p className="text-muted-foreground mb-4">
              Empowering farmers with AI-powered insights for better yields and sustainable farming practices.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📧 support@kisanmitra.com</p>
              <p>📞 1800-123-4567</p>
              <p>🌐 Available in 10+ Indian languages</p>
            </div>
          </div>
        </div>


        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Kisan Mitra. All rights reserved. | Made with ❤️ for Indian Farmers</p>
        </div>
      </footer>
      </div>
    
    );
}
