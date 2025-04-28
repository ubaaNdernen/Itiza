"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Gift, Wallet, Phone, Bell } from "lucide-react"
import GiftModal from "@/components/gift-modal"
import UnwrapModal from "@/components/unwrap-modal"
//import WalletConnect from "@/components/wallet-connect"
import { useWallet } from "@/hooks/use-wallet"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Hearts } from "@/components/hearts"
import { Clouds } from "@/components/clouds"
import { CustomWalletMultiButton } from "@/components/walletConnect";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200">
      <Hearts />
      <Clouds />
      <header className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Gift className="h-8 w-8 text-pink-600" />
          <h1 className="text-2xl font-bold text-pink-800">Itiza</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="h-6 w-6 text-pink-600 cursor-pointer" onClick={() => setIsUnwrapModalOpen(true)} />
            {hasPendingGift && (
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500">
                <span className="sr-only">Notification</span>
              </Badge>
            )}
          </div>
          <CustomWalletMultiButton />
        </div>
      </header>

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

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-pink-800 mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-pink-700">1</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Connect & Send</h4>
              <p className="text-pink-600">Connect your wallet, enter recipient's phone number and amount</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-pink-700">2</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Share Code</h4>
              <p className="text-pink-600">Recipient receives a unique gift code</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-pink-700">3</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Unwrap & Enjoy</h4>
              <p className="text-pink-600">They unwrap the gift and receive airtime instantly</p>
            </div>
          </div>
        </div>
      </main>

      <GiftModal isOpen={isGiftModalOpen} onClose={() => setIsGiftModalOpen(false)} />
      <UnwrapModal isOpen={isUnwrapModalOpen} onClose={() => setIsUnwrapModalOpen(false)} />
    </div>
  )
}
