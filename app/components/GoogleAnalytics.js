"use client"

import Script from "next/script"
import { useEffect } from "react"

const GA_MEASUREMENT_ID = "G-9MSMJ5E5WC"

const GoogleAnalytics = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer.push(arguments)
      }
      window.gtag("js", new Date())

      const consent = localStorage.getItem("cookie-consent")
      const consentMode = consent === "accepted" 
        ? { analytics_storage: "granted", ad_storage: "granted" }
        : { analytics_storage: "denied", ad_storage: "denied" }

      window.gtag("consent", "default", consentMode)
      window.gtag("config", GA_MEASUREMENT_ID, consentMode)

      const handleStorageChange = () => {
        const newConsent = localStorage.getItem("cookie-consent")
        const newConsentMode = newConsent === "accepted"
          ? { analytics_storage: "granted", ad_storage: "granted" }
          : { analytics_storage: "denied", ad_storage: "denied" }
        
        if (window.gtag) {
          window.gtag("consent", "update", newConsentMode)
        }
      }

      window.addEventListener("storage", handleStorageChange)
      
      return () => {
        window.removeEventListener("storage", handleStorageChange)
      }
    }
  }, [])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
        }}
      />
    </>
  )
}

export default GoogleAnalytics
