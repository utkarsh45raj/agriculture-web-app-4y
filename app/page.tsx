"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MessageCircle,
  Cloud,
  Sprout,
  ArrowRight,
  Users,
  Shield,
  Target,
  Sparkles,
  Award,
  BarChart3,
} from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"
import GovernmentSchemesCarousel from "@/components/government-schemes-carousel"

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className="text-center mb-16 animate-fade-in-up relative py-20 rounded-2xl overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-green-600"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.7)), url('/lush-green-agricultural-fields-with-modern-farming.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance drop-shadow-2xl leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto text-pretty drop-shadow-lg font-medium leading-relaxed">
            {t("heroSubtitle")}
          </p>
          <div className="flex justify-center items-center">
            <Link href="/chatbot">
              <Button
                size="lg"
                className="animate-pulse-green bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 hover:from-yellow-300 hover:to-yellow-400 font-bold text-lg px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-yellow-300"
              >
                <Sparkles className="mr-3 h-6 w-6" />
                {t("startFreeAdvisory")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Our Vision Section */}
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Our Vision
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-4xl mx-auto text-pretty leading-relaxed">
            To empower farmers with cutting-edge AI technology, providing personalized insights and recommendations that
            transform traditional farming into smart, sustainable agriculture. We envision a future where every farmer
            has access to intelligent farming solutions that maximize yield, minimize risk, and promote environmental
            sustainability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 card-hover">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-6 animate-float">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary">Smart Farming</h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                Leveraging AI to make farming more efficient and productive with data-driven insights
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 card-hover">
              <div
                className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mb-6 animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-yellow-700 dark:text-yellow-400">Farmer Empowerment</h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                Providing comprehensive tools and knowledge to help farmers succeed in modern agriculture
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 card-hover">
              <div
                className="w-20 h-20 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center mb-6 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <Sprout className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-amber-700 dark:text-amber-400">Sustainable Growth</h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                Promoting eco-friendly practices for long-term environmental sustainability
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider"></div>

      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
          Key Features
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          Discover our comprehensive suite of AI-powered tools designed to revolutionize your farming experience
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/chatbot">
            <Card className="card-hover cursor-pointer h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-100 dark:border-green-800 hover:border-green-300 dark:hover:border-green-600 group">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-3 text-primary">AI Chatbot</CardTitle>
                <CardDescription className="text-base">
                  Get instant answers to your farming questions with voice and text support
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Our AI assistant provides personalized farming advice, crop recommendations, and answers to your
                  agricultural questions 24/7 in multiple languages.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-primary group-hover:text-white transition-colors bg-transparent"
                >
                  {t("tryNow")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/weather">
            <Card className="card-hover cursor-pointer h-full bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950 dark:to-sky-950 border-2 border-blue-100 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600 group">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Cloud className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-3 text-blue-700 dark:text-blue-400">Weather Insights</CardTitle>
                <CardDescription className="text-base">
                  Real-time weather data and predictive insights for farming
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Stay informed with accurate weather forecasts, rainfall predictions, and AI-powered insights to
                  optimize your farming activities and protect your crops.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-blue-600 group-hover:text-white transition-colors bg-transparent"
                >
                  {t("viewMore")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/crop-advisory">
            <Card className="card-hover cursor-pointer h-full bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 border-2 border-yellow-100 dark:border-yellow-800 hover:border-yellow-300 dark:hover:border-yellow-600 group">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sprout className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-3 text-yellow-700 dark:text-yellow-400">
                  Smart Crop Advisory
                </CardTitle>
                <CardDescription className="text-base">
                  Personalized crop recommendations and growing guides
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Receive data-driven crop suggestions based on your location, soil conditions, weather patterns, and
                  market trends for maximum profitability.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-yellow-600 group-hover:text-white transition-colors bg-transparent"
                >
                  {t("getStarted")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/pest-detection">
            <Card className="card-hover cursor-pointer h-full bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-2 border-red-100 dark:border-red-800 hover:border-red-300 dark:hover:border-red-600 group">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-3 text-red-700 dark:text-red-400">
                  {t("pestDetectionTitle")}
                </CardTitle>
                <CardDescription className="text-base">{t("pestDetectionDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Upload photos of your crops to instantly identify pests, diseases, and nutrient deficiencies with
                  AI-powered analysis.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-red-600 group-hover:text-white transition-colors bg-transparent"
                >
                  {t("tryNow")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/soil-health">
            <Card className="card-hover cursor-pointer h-full bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-2 border-amber-100 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-600 group">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-16 w-16 text-yellow-600 mx-auto mb-3" />
                </div>
                <CardTitle className="text-2xl mb-3 text-primary">Soil Health</CardTitle>
                <CardDescription className="text-base">
                  Monitor and improve your soil quality with expert guidance
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Get comprehensive soil analysis, pH monitoring, and personalized recommendations to maintain optimal
                  soil health.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-amber-600 group-hover:text-white transition-colors bg-transparent"
                >
                  {t("learnMore")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/market-prices">
            <Card className="card-hover cursor-pointer h-full bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950 border-2 border-purple-100 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600 group">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-3 text-purple-700 dark:text-purple-400">
                  {t("marketPricesTitle")}
                </CardTitle>
                <CardDescription className="text-base">{t("marketPricesDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Stay updated with real-time market prices, trends, and optimal selling times to maximize your profits.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-purple-600 group-hover:text-white transition-colors bg-transparent"
                >
                  {t("marketPricesTitle")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Government Schemes Section */}
      <GovernmentSchemesCarousel />

      {/* Footer Section with Quick Access Tools */}
      <footer className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 rounded-3xl p-12 animate-fade-in-up border border-gray-100 dark:border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Quick Access Tools */}
          <div>
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Quick Access Tools
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <Link href="/chatbot">
                <Button
                  variant="outline"
                  className="h-24 flex-col space-y-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-white dark:bg-gray-800 border-2 hover:border-primary w-full shadow-sm hover:shadow-lg transform hover:scale-105"
                >
                  <MessageCircle className="h-8 w-8" />
                  <span className="font-semibold">AI Chatbot</span>
                </Button>
              </Link>
              <Link href="/weather">
                <Button
                  variant="outline"
                  className="h-24 flex-col space-y-3 hover:bg-blue-600 hover:text-white transition-all duration-300 bg-white dark:bg-gray-800 border-2 hover:border-blue-600 w-full shadow-sm hover:shadow-lg transform hover:scale-105"
                >
                  <Cloud className="h-8 w-8" />
                  <span className="font-semibold">Weather</span>
                </Button>
              </Link>
              <Link href="/crop-advisory">
                <Button
                  variant="outline"
                  className="h-24 flex-col space-y-3 hover:bg-yellow-600 hover:text-white transition-all duration-300 bg-white dark:bg-gray-800 border-2 hover:border-yellow-600 w-full shadow-sm hover:shadow-lg transform hover:scale-105"
                >
                  <Sprout className="h-8 w-8" />
                  <span className="font-semibold">Crop Guide</span>
                </Button>
              </Link>
              <Link href="/soil-health">
                <Button
                  variant="outline"
                  className="h-24 flex-col space-y-3 hover:bg-amber-600 hover:text-white transition-all duration-300 bg-white dark:bg-gray-800 border-2 hover:border-amber-600 w-full shadow-sm hover:shadow-lg transform hover:scale-105"
                >
                  <Shield className="h-8 w-8" />
                  <span className="font-semibold">Soil Health</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer Information */}
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Kisan Mitra
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Empowering farmers with AI-powered insights for better yields and sustainable farming practices.
            </p>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📧</span>
                <span className="font-medium">support@kisanmitra.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📞</span>
                <span className="font-medium">1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🌐</span>
                <span className="font-medium">Available in 10+ Indian languages</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center">
          <p className="text-muted-foreground font-medium">
            &copy; 2024 Kisan Mitra. All rights reserved. | Made with ❤️ for Indian Farmers
          </p>
        </div>
      </footer>
    </div>
  )
}
