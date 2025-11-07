"use client"

import dynamic from "next/dynamic";
import { zeroPad } from 'react-countdown';
const Countdown = dynamic(() => import('react-countdown'), { ssr: false });

const translations = {
  en: {
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    minutesShort: "Mins",
    seconds: "Seconds",
    secondsShort: "Secs"
  },
  fr: {
    days: "Jours",
    hours: "Heures",
    minutes: "Minutes",
    minutesShort: "Mins",
    seconds: "Secondes",
    secondsShort: "Secs"
  }
};

const CountdownTimer = ({ date, lang = "fr" }) => {
  const t = translations[lang];
  
  const countdownRender = ({ days, hours, minutes, seconds, completed }) => {
    return (
      <>
        <span className="flex flex-col">
          <span className="mb-2">{zeroPad(days)}</span>
          <span className="text-[0.5rem] sm:text-xs uppercase tracking-wider opacity-70">
            <span>{t.days}</span>
          </span>
        </span>
        <div className="flex items-center -mt-4 sm:-mt-6 opacity-70">:</div>
        <span className="flex flex-col">
          <span className="mb-2">{zeroPad(hours)}</span>
          <span className="text-[0.5rem] sm:text-xs uppercase tracking-wider opacity-70">
            <span>{t.hours}</span>
          </span>
        </span>
        <div className="flex items-center -mt-4 sm:-mt-6 opacity-70">:</div>
        <span className="flex flex-col">
          <span className="mb-2">{zeroPad(minutes)}</span>
          <span className="text-[0.5rem] sm:text-xs uppercase tracking-wider opacity-70">
            <span className="hidden sm:block">{t.minutes}</span>
            <span className="block sm:hidden">{t.minutesShort}</span>
          </span>
        </span>
        <div className="flex items-center -mt-4 sm:-mt-6 opacity-70">:</div>
        <span className="flex flex-col">
          <span className="mb-2">{zeroPad(seconds)}</span>
          <span className="text-[0.5rem] sm:text-xs uppercase tracking-wider opacity-70">
            <span className="hidden sm:block">{t.seconds}</span>
            <span className="block sm:hidden">{t.secondsShort}</span>
          </span>
        </span>
      </>
    );
  };

  return (
    <Countdown date={date} renderer={countdownRender} />
  )
}

export default CountdownTimer