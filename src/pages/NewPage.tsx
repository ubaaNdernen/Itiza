"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Gift, Phone} from "lucide-react"
import GiftModal from "@/components/gift-modal"
import UnwrapModal from "@/components/unwrap-modal"
import { useWallet } from "@/hooks/use-wallet"
import { motion } from "framer-motion"
import { Hearts } from "@/components/hearts"
import { Clouds } from "@/components/clouds"
import { Header } from "@/components/Header"
import FeaturedGifts from "@/components/featured-gifts"
import HowItWorks from "@/components/how-it-works"

export default function Home() {
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
  const [isUnwrapModalOpen, setIsUnwrapModalOpen] = useState(false)
  const [hasPendingGift, setHasPendingGift] = useState(false)
  const { address, isConnected, connect } = useWallet()

  // Check for pending gifts (this would connect to your backend in production)
  useEffect(() => {
    // Simulate checking for pending gifts
    const checkPendingGifts = async () => {
      if (isConnected) {
        // This would be an API call in production
        const hasPending = Math.random() > 0.5
        setHasPendingGift(hasPending)
      }
    }

    checkPendingGifts()
    // Set up interval to check periodically
    const interval = setInterval(checkPendingGifts, 30000)
    return () => clearInterval(interval)
  }, [isConnected])

    const handleOpenUnwrapModal = () => {
        setIsUnwrapModalOpen(true)
    }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200">
      <Hearts />
      <Clouds />
      <Header hasPendingGift={hasPendingGift} onOpenUnwrapModal={handleOpenUnwrapModal} />

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-pink-800 mb-4">Send Gifts with Love</h2>
          <p className="text-lg text-pink-600 max-w-2xl mx-auto">
            Connect your wallet and send airtime gifts to anyone with just a phone number. They'll receive a code to
            unwrap their gift.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-pink-500 to-rose-400 p-6 text-white">
                <Phone className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Gift Airtime</h3>
                <p className="mb-4">Send airtime to friends and family with just their phone number.</p>
                <Button onClick={() => setIsGiftModalOpen(true)} className="bg-white text-pink-700 hover:bg-gray-100">
                  Send Airtime
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-6 text-white">
                <Gift className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Redeem Gift</h3>
                <p className="mb-4">Have a gift code? Redeem it here to unwrap your gift.</p>
                <Button onClick={() => setIsUnwrapModalOpen(true)} className="bg-white text-pink-700 hover:bg-gray-100">
                  Unwrap Gift
                </Button>
              </div>
            </CardContent>
          </Card>

            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-rose-400 to-red-400 p-6 text-white">
                        <Gift className="h-12 w-12 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Gift Token</h3>
                        <p className="mb-4">Send cryptocurrency tokens as gifts to your loved ones.</p>
                        <div className="bg-white/20 text-white font-medium py-2 px-4 rounded-md inline-flex items-center">
                            <span className="mr-2">Coming Soon</span>
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Featured Gifts Section */}
        <FeaturedGifts />

        {/* How It Works Section */}
        <HowItWorks />
      </main>

      <GiftModal isOpen={isGiftModalOpen} onClose={() => setIsGiftModalOpen(false)} />
      <UnwrapModal isOpen={isUnwrapModalOpen} onClose={() => setIsUnwrapModalOpen(false)} />
    </div>
  )
}
