"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

const CookieConsent = ({ lang = "fr" }) => {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setTimeout(() => setShowConsent(true), 1000)
      
      localStorage.setItem("cookie-consent", "accepted")
      
      if (typeof window !== "undefined") {
        if (window.gtag) {
          window.gtag("consent", "update", {
            analytics_storage: "granted",
            ad_storage: "granted"
          })
        }
        window.dispatchEvent(new Event("storage"))
      }
    }
  }, [])

  const handleClose = () => {
    setShowConsent(false)
  }

  const content = {
    en: {
      message: "We use cookies to enhance your browsing experience and analyze site traffic.",
      close: "OK"
    },
    fr: {
      message: "Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser le trafic du site.",
      close: "OK"
    }
  }

  const t = content[lang]

  if (!showConsent) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-[10000] p-2 sm:p-3"
      >
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-gray-600 leading-snug flex-1">
              {t.message}
            </p>
            <button
              onClick={handleClose}
              className="px-4 py-1.5 text-xs sm:text-sm font-medium text-white bg-[var(--primary)] hover:opacity-90 rounded-md transition-opacity duration-200 whitespace-nowrap"
            >
              {t.close}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CookieConsent

