"use client"

import { useState } from "react"

const FormTestHelper = ({ onAutoFill, lang = "fr" }) => {
  const [isVisible, setIsVisible] = useState(false)

  const testData = {
    en: [
      {
        label: "Test User 1",
        name: "John Doe",
        email: "john.doe@test.com",
        phone: "+12345678900",
        message: "I'm passionate about electric bikes and would love to learn more about your models."
      },
      {
        label: "Test User 2",
        name: "Jane Smith",
        email: "jane.smith@test.com",
        phone: "+19876543210",
        message: "Looking for a powerful e-bike for daily commute."
      },
      {
        label: "Test User 3",
        name: "Mike Johnson",
        email: "mike@test.com",
        phone: "+11234567890",
        message: "I'm interested in your premium e-bikes collection!"
      }
    ],
    fr: [
      {
        label: "Test Utilisateur 1",
        name: "Jean Dupont",
        email: "jean.dupont@test.fr",
        phone: "+33612345678",
        message: "Je suis passionné de motos électriques et j'aimerais en savoir plus sur vos modèles."
      },
      {
        label: "Test Utilisateur 2",
        name: "Marie Martin",
        email: "marie.martin@test.fr",
        phone: "+33687654321",
        message: "À la recherche d'une moto électrique puissante pour mes trajets quotidiens."
      },
      {
        label: "Test Utilisateur 3",
        name: "Pierre Durand",
        email: "pierre@test.fr",
        phone: "+33698765432",
        message: "Je m'intéresse à votre collection de motos électriques premium!"
      }
    ]
  }

  const handleAutoFill = (index) => {
    const data = testData[lang][index]
    onAutoFill(data)
  }

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed bottom-4 right-4 z-[99999]">
      {!isVisible ? (
        <button
          onClick={() => setIsVisible(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-200 text-sm font-medium"
          aria-label="Show test helper"
        >
          🧪 Test
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl p-4 space-y-3 border-2 border-purple-600 min-w-[220px]">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-sm">Form Tester</span>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2">
            {testData[lang].map((data, index) => (
              <button
                key={index}
                onClick={() => handleAutoFill(index)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-xs font-medium text-left"
              >
                <div className="font-bold mb-1">🚀 {data.label}</div>
                <div className="text-[10px] opacity-90 space-y-0.5">
                  <div>👤 {data.name}</div>
                  {data.email && <div>📧 {data.email}</div>}
                  {data.phone && <div>📱 {data.phone}</div>}
                  {data.message && <div>💬 Message</div>}
                </div>
              </button>
            ))}
          </div>

          <div className="text-[10px] text-gray-500 pt-2 border-t">
            All fields are required for testing
          </div>
        </div>
      )}
    </div>
  )
}

export default FormTestHelper

