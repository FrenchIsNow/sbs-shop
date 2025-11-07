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
      about: "About",
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
      successMessage: "Thank you! After validation of your request, we will contact you.",
      errorMessage: "Oops! Something went wrong. Please try again.",
      aboutTitle: "Who are we?",
      aboutHeading: "Redefining urban mobility.",
      aboutText: "At SBS SHOP, we are committed to revolutionizing urban transportation with cutting-edge electric bikes. Our mission is to combine performance, style, and sustainability in every model we create. Whether you're commuting through the city or exploring new terrains, our e-bikes are designed to deliver an unmatched riding experience.\n\nWith a team of passionate engineers and designers, we blend innovation with craftsmanship to create bikes that not only meet today's needs but exceed tomorrow's expectations. Speed, power, and elegance are at the core of everything we do.\n\nJoin us as we redefine the future of mobility—one ride at a time.",
      errorName: "Please enter your name",
      errorEmail: "Please enter a valid email address",
      errorPhone: "Please enter a valid phone number",
      errorMotivation: "Please tell us about your motivation"
    },
    fr: {
      about: "À propos",
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
      successMessage: "Merci! Après validation de ta demande, on te contactera.",
      errorMessage: "Oups! Une erreur s'est produite. Réessaie.",
      aboutTitle: "Qui sommes-nous?",
      aboutHeading: "Redéfinir la mobilité urbaine.",
      aboutText: "Chez SBS SHOP, nous nous engageons à révolutionner le transport urbain avec des motos électriques de pointe. Notre mission est de combiner performance, style et durabilité dans chaque modèle que nous créons. Que vous vous déplaciez en ville ou que vous exploriez de nouveaux terrains, nos motos électriques sont conçues pour offrir une expérience de conduite inégalée.\n\nAvec une équipe d'ingénieurs et de designers passionnés, nous mélangeons innovation et savoir-faire pour créer des motos qui non seulement répondent aux besoins d'aujourd'hui mais dépassent les attentes de demain. Vitesse, puissance et élégance sont au cœur de tout ce que nous faisons.\n\nRejoignez-nous alors que nous redéfinissons l'avenir de la mobilité—une balade à la fois.",
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

  const [about, setAbout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleAboutButton = (e) => {
    e.preventDefault();
    setAbout((prev) => !prev);
    setMobileMenuOpen(false);
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (!about) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }
  }

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
      const response = await fetch("https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue", {
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
        
        setTimeout(() => {
          setName("")
          setEmail("")
          setPhone("")
          setMessage("")
          setButtonState("idle")
          setSuccessMessage("")
        }, 5000)
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
            
            <button className="hidden sm:block uppercase relative after:absolute after:content-[''] after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full after:right-0 hover:after:right-auto hover:after:left-0 after:bottom-0 opacity-100 sm:opacity-75 hover:opacity-100 transition-all duration-300 cursor-pointer" aria-label="About" onClick={handleAboutButton}>{content[lang].about}</button>
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
                <button 
                  className="uppercase text-left py-2 border-b border-black/10" 
                  onClick={handleAboutButton}
                >
                  {content[lang].about}
                </button>
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
      <section
        className="pt-8 px-3 sm:px-8 flex-1 transition-all duration-200"
        style={about ? { transform: "scale(1) translateY(20%)" } : {}}
      >

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
          <div className="pt-10 pb-6 px-6 sm:p-16 text-center bg-black/60">

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
              {successMessage && (
                <motion.p 
                  key="success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-green-400 text-sm mt-3 font-medium"
                >
                  {successMessage}
                </motion.p>
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

      {/* about content */}
      <section className="fixed inset-0 h-screen w-screen overflow-y-scroll bg-white/90 backdrop-blur-xl z-[9999] opacity-0 invisible transition-all duration-200" style={about ? { opacity: 1, visibility: "visible" } : {}}>

        {/* close button */}
        <button type="button" onClick={handleAboutButton} className="cursor-pointer block fixed top-6 right-4 transition duration-200 hover:opacity-40 p-3 bg-white z-50" aria-label="Close About">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 5L5 19M5 5l14 14" color="currentColor"/></svg>
        </button>

        <div className="relative mx-auto w-full max-w-[600px] py-16 sm:py-20 px-6 sm:px-8">
          <p className="text-black/50">{content[lang].aboutTitle}</p>
          <p className="text-4xl md:text-5xl font-bold -tracking-[0.01em] mt-6 leading-[1.2] mb-14">
            {content[lang].aboutHeading}
          </p>

          <p className="text-black/75 leading-7 md:leading-8 whitespace-pre-line">
            {content[lang].aboutText}
          </p>

          <div className="mt-10">
            <p className={`${bodoniModa.className} text-black text-lg`}>SBS SHOP</p>
            <p className="mt-1 text-black/50">{lang === "en" ? "Redefining mobility" : "Redéfinir la mobilité"}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Demo3;
