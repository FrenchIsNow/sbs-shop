"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

const CookieConsent = ({ lang = "fr" }) => {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setTimeout(() => setShowConsent(true), 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowConsent(false)
    
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

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowConsent(false)
    
    if (typeof window !== "undefined") {
      if (window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: "denied",
          ad_storage: "denied"
        })
      }
      
      window.dispatchEvent(new Event("storage"))
    }
  }

  const content = {
    en: {
      title: "Cookie Consent",
      message: "We use cookies to enhance your browsing experience and analyze site traffic. By clicking 'Accept', you consent to our use of cookies.",
      accept: "Accept",
      decline: "Decline"
    },
    fr: {
      title: "Consentement aux Cookies",
      message: "Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser le trafic du site. En cliquant sur 'Accepter', vous acceptez notre utilisation des cookies.",
      accept: "Accepter",
      decline: "Refuser"
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex-1">
              <h3 className="font-bold text-sm sm:text-base mb-1 text-gray-900">
                {t.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-snug">
                {t.message}
              </p>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleDecline}
                className="px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 whitespace-nowrap"
              >
                {t.decline}
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-1.5 text-xs sm:text-sm font-medium text-white bg-[var(--primary)] hover:opacity-90 rounded-md transition-opacity duration-200 whitespace-nowrap"
              >
                {t.accept}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CookieConsent

