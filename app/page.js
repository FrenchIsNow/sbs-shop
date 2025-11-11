"use client"

import { Bodoni_Moda, Gabarito } from "next/font/google";
const bricolageGrotesque = Gabarito({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});
const bodoniModa = Bodoni_Moda({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CountdownTimer from "./components/CountdownTimer";
import TextCursorProximity from "./components/TextCursorProximity";
import FormTestHelper from "./components/FormTestHelper";
import { COUNTDOWN_DATE } from "./config";

import "@/styles/demo/demo3.scss";

const Demo3 = () => {
  const backgroundRef = useRef(null);
  const textContainerRef = useRef(null);
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language.toLowerCase();
      return browserLang.startsWith('fr') ? 'fr' : 'fr';
    }
    return 'fr';
  });

  const content = {
    en: {
      ourSite: "Our Site",
      getAccess: "Get Access",
      welcome: "Hey, Welcome!",
      announcement: "Our Premium E-Bike Site Is",
      comingSoon: "Coming Soon",
      description: "Just give us your info and we'll send you our electric motobike catalogue.",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      phonePlaceholder: "+1 234 567 8900",
      messagePlaceholder: "Tell us about your motivation",
      submit: "Get Catalogue",
      sending: "Sending...",
      done: "Done!",
      successMessage: "Thank you for your interest!",
      successSubMessage: "We've received your request. After validation, we'll send you our exclusive e-bike catalogue.",
      errorMessage: "Oops! Something went wrong. Please try again.",
      errorName: "Please enter your name",
      errorEmail: "Please enter a valid email address",
      errorPhone: "Please enter a valid phone number",
      errorMotivation: "Please tell us about your motivation"
    },
    fr: {
      ourSite: "Notre Site",
      getAccess: "Accès Catalogue",
      welcome: "Bienvenue!",
      announcement: "Notre Site Premium de Motos Électriques Arrive",
      comingSoon: "Bientôt",
      description: "Donne juste tes infos et on t'envoie notre catalogue de motos électriques.",
      namePlaceholder: "Ton nom",
      emailPlaceholder: "ton@email.com",
      phonePlaceholder: "+33 6 12 34 56 78",
      messagePlaceholder: "Explique-nous ta motivation",
      submit: "Recevoir le Catalogue",
      sending: "Envoi en cours...",
      done: "Envoyé!",
      successMessage: "Merci pour ton intérêt!",
      successSubMessage: "Nous avons bien reçu ta demande. Après validation, on t'envoie notre catalogue exclusif de motos électriques.",
      errorMessage: "Oups! Une erreur s'est produite. Réessaie.",
      errorName: "Entre ton nom",
      errorEmail: "Entre une adresse email valide",
      errorPhone: "Entre un numéro de téléphone valide",
      errorMotivation: "Explique-nous ta motivation"
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (backgroundRef.current) {
        backgroundRef.current.style.backgroundPositionY = `${-scrollY * 0.5}px`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const subscribeRef = useRef(null);
  const handleSubscribeButton = (e) => {
    e.preventDefault();
    const target = subscribeRef.current;
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      const input = target.querySelector("input");
      setTimeout(() => {
        if (input) input.focus();
      }, 450);
    }
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [buttonState, setButtonState] = useState('idle')
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const isValidEmail = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
  }

  const isValidPhone = (phone) => {
    return /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(phone)
  }

  const buttonCopy = {
    idle: content[lang].submit,
    loading: (
      <div className="flex items-center justify-center gap-2">
        <motion.div 
          className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <span>{content[lang].sending}</span>
      </div>
    ),
    success: (
      <motion.div className="text-green-600 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 14.5s1.5 0 3.5 3.5c0 0 5.559-9.167 10.5-11" color="currentColor"/></svg>
        <span>{content[lang].done}</span>
      </motion.div>
    ),
    error: (
      <motion.div className="text-red-600 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12" color="currentColor"/></svg>
        <span>Erreur</span>
      </motion.div>
    ),
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (buttonState === "success") return

    if (!name.trim()) {
      setError(content[lang].errorName)
      setSuccessMessage("")
      return
    }

    if (!isValidEmail(email)) {
      setError(content[lang].errorEmail)
      setSuccessMessage("")
      return
    }

    if (!isValidPhone(phone)) {
      setError(content[lang].errorPhone)
      setSuccessMessage("")
      return
    }

    if (!message.trim()) {
      setError(content[lang].errorMotivation)
      setSuccessMessage("")
      return
    }

    setError("")
    setSuccessMessage("")
    setButtonState("loading")

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "https://n8n.srv759792.hstgr.cloud/webhook-test/ebike-catalogue";
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: message || "",
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setButtonState("success")
        setSuccessMessage(content[lang].successMessage)
      } else {
        setButtonState("error")
        setError(content[lang].errorMessage)
        
        setTimeout(() => {
          setButtonState("idle")
        }, 3000)
      }
    } catch (err) {
      console.error("Form submission error:", err)
      setButtonState("error")
      setError(content[lang].errorMessage)
      
      setTimeout(() => {
        setButtonState("idle")
      }, 3000)
    }
  };

  const handleAutoFill = (data) => {
    setName(data.name)
    setEmail(data.email)
    setPhone(data.phone)
    setMessage(data.message)
    
    setTimeout(() => {
      const formElement = subscribeRef.current
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" })
        const nameInput = formElement.querySelector("#name")
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 500)
        }
      }
    }, 100)
  }
  
  return (
    <main className={`main-content-3 ${bricolageGrotesque.className} min-h-screen overflow-hidden`}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.3, delay: 0.3 }}
        className="pt-6 px-5 sm:px-8 text-sm max-w-full w-[1200px] mx-auto relative"
      >
        <div className="flex gap-2 lg:gap-16 justify-between items-center">
          <div className="order-1 sm:order-1 sm:w-1/3 flex gap-4 items-center">
            <button 
              className="sm:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            
            <a 
              href="https://sbs-official.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:block uppercase relative after:absolute after:content-[''] after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full after:right-0 hover:after:right-auto hover:after:left-0 after:bottom-0 opacity-100 sm:opacity-75 hover:opacity-100 transition-all duration-300"
              aria-label="Our Site"
            >
              {content[lang].ourSite}
            </a>
                </div>

          <div className="order-2 sm:order-2 sm:w-1/3 text-center">
            <Link className={`block transition-all duration-300 hover:opacity-60 text-lg sm:text-2xl ${bodoniModa.className}`} href="/" aria-label="Logo">
              SBS SHOP
            </Link>
          </div>

          <div className="order-3 sm:w-1/3 flex gap-4 items-center justify-end">
            <a className="hidden sm:block uppercase relative after:absolute after:content-[''] after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full after:right-0 hover:after:right-auto hover:after:left-0 after:bottom-0 opacity-100 sm:opacity-75 hover:opacity-100 transition-all duration-300" href="#subscribe" aria-label="Subscribe" onClick={handleSubscribeButton}>{content[lang].getAccess}</a>
            
            <button 
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              className="flex items-center gap-1 px-2 py-1 text-xl hover:opacity-70 transition-opacity"
              aria-label="Toggle language"
            >
              {lang === "fr" ? "🇺🇸" : "🇫🇷"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden absolute top-full left-0 right-0 bg-white shadow-lg mt-2 rounded-lg overflow-hidden z-50 mx-5"
            >
              <div className="flex flex-col p-4 gap-4">
                <a 
                  href="https://sbs-official.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="uppercase text-left py-2 border-b border-black/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {content[lang].ourSite}
                </a>
                <a 
                  className="uppercase text-left py-2" 
                  href="#subscribe" 
                  onClick={(e) => { handleSubscribeButton(e); setMobileMenuOpen(false); }}
                >
                  {content[lang].getAccess}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* main content */}
      <section className="pt-8 px-3 sm:px-8 flex-1 transition-all duration-200">

        {/* Content */}
        <section className="text-center mb-8 w-fit mx-auto no-transform-mobile" ref={textContainerRef}>

          <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <TextCursorProximity
              key={`welcome-${lang}`}
              label={content[lang].welcome}
              className="text-sm sm:text-base mb-2 sm:mb-4"
              styles={{
                transform: {
                  from: "translateY(0) scale(1) rotate(0deg)",
                  to: "translateY(-10px) scale(1.2) rotate(10deg)",
                },
                color: { from: "#333333", to: "#d11313" },
              }}
              falloff="gaussian"
              radius={100}
              containerRef={textContainerRef}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }} 
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <TextCursorProximity
              key={`announcement-${lang}`}
              label={content[lang].announcement}
              className="sm:text-xl md:text-3xl mb-3 sm:mb-6"
              styles={{
                transform: {
                  from: "translateY(0) scaleX(1)",
                  to: "translateY(-10px) scaleX(1.2)",
                },
                color: { from: "#333333", to: "#d11313" },
              }}
              falloff="gaussian"
              radius={100}
              containerRef={textContainerRef}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }} 
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-[clamp(2rem,6vw,5rem)] flex gap-2 sm:gap-4 justify-center font-bold"
          >
            <CountdownTimer date={COUNTDOWN_DATE} lang={lang} />
          </motion.div>
        </section>

        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }} 
          transition={{ duration: 0.3, delay: 0.3 }}
          className="max-w-full w-[1160px] mx-auto bg-[url('/demo-3/comingsoon.png')] bg-cover bg-center text-white rounded-2xl overflow-hidden"
          ref={backgroundRef}
        >
          <div className="pt-10 pb-6 px-6 sm:p-16 text-center bg-black/60 min-h-[400px] flex flex-col justify-center">

            <AnimatePresence mode="wait">
              {buttonState === "success" ? (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="flex flex-col items-center justify-center gap-6 py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 sm:w-16 sm:h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl sm:text-4xl font-bold text-white">
                      {content[lang].successMessage}
                    </h3>
                    <p className="text-base sm:text-xl text-white/90 max-w-[500px] mx-auto leading-relaxed">
                      {content[lang].successSubMessage}
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="form-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="sm:text-2xl mb-6 sm:mb-8 leading-snug max-w-[550px] mx-auto text-balance tracking-wide">{content[lang].description}</p>

                  <form ref={subscribeRef} onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3">
              <div className="grid gap-3">
                <input
                  className="text-sm sm:text-base bg-white text-black block w-full h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition duration-200 placeholder:text-black/50 shadow-2xl"
                  type="text"
                  name="name"
                  id="name"
                  placeholder={content[lang].namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  className="text-sm sm:text-base bg-white text-black block w-full h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition duration-200 placeholder:text-black/50 shadow-2xl"
                  type="email"
                  name="email"
                  id="email"
                  placeholder={content[lang].emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className="text-sm sm:text-base bg-white text-black block w-full h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition duration-200 placeholder:text-black/50 shadow-2xl"
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder={content[lang].phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <textarea
                  className="text-sm sm:text-base bg-white text-black block w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition duration-200 placeholder:text-black/50 shadow-2xl resize-none"
                  name="message"
                  id="message"
                  rows="3"
                  placeholder={content[lang].messagePlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button
                className={`cursor-pointer text-sm sm:text-base px-5 h-12 w-full transition duration-200 focus:outline-none rounded-lg shadow-2xl font-medium ${
                  buttonState === "success" 
                    ? "bg-green-500 text-white" 
                    : buttonState === "error"
                    ? "bg-red-500 text-white"
                    : buttonState === "loading"
                    ? "bg-[var(--primary)] text-white"
                    : "bg-white text-black hover:bg-[var(--primary)] hover:text-white"
                }`}
                type="submit"
                aria-label="Submit form"
                disabled={buttonState === "loading" || buttonState === "success"}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    className="flex items-center justify-center gap-2"
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                    initial={{ opacity: 0, y: -25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 25 }}
                    key={buttonState}
                  >
                    {buttonCopy[buttonState]}
                  </motion.span>
                </AnimatePresence>
              </button>
            </form>
            
            <AnimatePresence mode="wait">
              {error && (
                <motion.p 
                  key="error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-sm mt-3 font-medium"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* footer */}
        <footer className="py-8">
          <div className="text-[15px] flex flex-wrap gap-x-4 md:gap-8 ms-auto justify-center items-center mb-4">
            <Link className="relative after:absolute after:content-[''] after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full after:right-0 hover:after:right-auto hover:after:left-0 after:bottom-0 opacity-50 hover:opacity-100 transition-all duration-300" href="https://www.tiktok.com/@forall920?_r=1&_t=ZN-91CgBYlpSeU" target="_blank" rel="noopener noreferrer" aria-label="TikTok">TikTok</Link>
          </div>

          <div className="text-center">
            <span className="text-sm text-balance inline-block">&copy; {new Date().getFullYear()} SBS SHOP</span>
          </div>
        </footer>
      </section>

      <svg height="0" className="hidden">
        <filter id="ripples" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="turbulence"
            id="ripple-turbulence"
            numOctaves="1"
            seed="0.1"
            baseFrequency="0.02 0.05"
          ></feTurbulence>
          <feDisplacementMap scale="10" in="SourceGraphic"></feDisplacementMap>
          <animate
            href="#ripple-turbulence"
            attributeName="baseFrequency"
            dur="75s"
            keyTimes="0;0.5;1"
            values="0.02 0.03; 0.04 0.04; 0.02 0.03"
            repeatCount="indefinite"
          ></animate>
        </filter>
      </svg>

      <FormTestHelper onAutoFill={handleAutoFill} lang={lang} />
    </main>
  );
}

export default Demo3;
