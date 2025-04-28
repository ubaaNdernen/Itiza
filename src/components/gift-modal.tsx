"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/hooks/use-wallet"
import { Loader2, CheckCircle2 } from "lucide-react"
import { createGift } from "@/lib/gift-service"

interface GiftModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function GiftModal({ isOpen, onClose }: GiftModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [giftCode, setGiftCode] = useState("")
  const { isConnected, address, signMessage } = useWallet()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to send a gift",
        variant: "destructive",
      })
      return
    }

    if (!phoneNumber || !amount) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      // This would be an actual transaction in production
      const signature = await signMessage(`Send ${amount} airtime to ${phoneNumber}`)

      // Create the gift in the backend
      const result = await createGift({
        senderAddress: address!,
        phoneNumber,
        amount: Number.parseFloat(amount),
        signature,
      })

      setGiftCode(result.code)
      setIsSuccess(true)
    } catch (error) {
      console.error("Error creating gift:", error)
      toast({
        title: "Transaction failed",
        description: "There was an error processing your gift",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      setPhoneNumber("")
      setAmount("")
      setIsSuccess(false)
      setGiftCode("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-pink-800">
            {isSuccess ? "Gift Created Successfully!" : "Send Airtime Gift"}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-6 flex flex-col items-center"
            >
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <p className="text-center mb-4">
                Your gift has been created successfully! Share this code with the recipient:
              </p>
              <div className="bg-gray-100 p-4 rounded-md text-center mb-4 w-full">
                <span className="text-xl font-mono font-bold tracking-wider">{giftCode}</span>
              </div>
              <p className="text-sm text-gray-500 text-center">
                The recipient can use this code to unwrap their gift on the Itiza platform.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-4 py-4"
            >
              <div className="space-y-2">
                <Label htmlFor="phone">Recipient's Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="10.00"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !isConnected}
                  className="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Send Gift"
                  )}
                </Button>
              </DialogFooter>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
