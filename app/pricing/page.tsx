"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import { useState } from "react"

const plans = [
  {
    name: "Үнэгүй",
    price: "₮0",
    period: "сар бүр",
    description: "Эхлэн суралцагчдад",
    features: [
      "Их сургуулиудын мэдээлэл үзэх",
      "Эссэ загварууд (3 ширхэг)",
      "Блог нийтлэл унших",
      "Хязгаарлагдмал тест",
    ],
    cta: "Одоо эхлэх",
    popular: false,
  },
  {
    name: "Premium",
    price: "₮29,900",
    period: "сар бүр",
    description: "Идэвхтэй суралцагчдад",
    features: [
      "AI эссэ шинжилгээ (хязгааргүй)",
      "Бүх эссэ загварууд",
      "Дэлгэрэнгүй их сургуулийн санал болголт",
      "Бүрэн боловсролын тест",
      "Хувийн зөвлөмж",
      "Тэргүүлэх дэмжлэг",
    ],
    cta: "Premium авах",
    popular: true,
  },
  {
    name: "Байгууллага",
    price: "₮199,900",
    period: "сар бүр",
    description: "Сургууль, байгууллагуудад",
    features: [
      "Premium-ийн бүх боломжууд",
      "50 хүртэл хэрэглэгч",
      "Багш нарын хяналтын самбар",
      "Сурагчдын ахицын тайлан",
      "API хандалт",
      "Онцгой дэмжлэг",
    ],
    cta: "Холбоо барих",
    popular: false,
  },
]

export default function PricingPage() {
  const [processing, setProcessing] = useState<string | null>(null)

  const handlePayment = (planName: string) => {
    setProcessing(planName)
    // Mock payment processing
    setTimeout(() => {
      alert(`${planName} төлөвлөгөө амжилттай идэвхжлээ! (Mock)`)
      setProcessing(null)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-accent" />
            Үнийн төлөвлөгөө
          </div>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Өөрт тохирох төлөвлөгөө сонгоорой</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Боловсролын зорилгодоо хүрэхэд туслах хэрэгслүүдийг нээгээрэй
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border bg-card p-6 ${
                plan.popular ? "border-accent shadow-lg" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  Хамгийн түгээмэл
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>

              <ul className="mb-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handlePayment(plan.name)}
                disabled={processing !== null}
              >
                {processing === plan.name ? "Боловсруулж байна..." : plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <h2 className="mb-8 text-center text-2xl font-semibold text-foreground">Түгээмэл асуултууд</h2>

          <div className="mx-auto max-w-2xl space-y-4">
            {[
              {
                q: "Төлбөрөө хэрхэн төлөх вэ?",
                a: "Бид Qpay, дансны шилжүүлэг болон олон улсын картыг хүлээн авдаг.",
              },
              {
                q: "Premium-г цуцлах боломжтой юу?",
                a: "Тийм, та хүссэн үедээ захиалгаа цуцлах боломжтой. Үлдсэн хугацаанд үйлчилгээг ашиглах эрхтэй.",
              },
              {
                q: "Үнэгүй туршилт байгаа юу?",
                a: "Тийм, Premium төлөвлөгөөнд 7 хоногийн үнэгүй туршилт багтсан.",
              },
              {
                q: "Байгууллагын төлөвлөгөө хэрхэн ажилладаг вэ?",
                a: "Байгууллагын төлөвлөгөө нь сургууль, курсүүдэд зориулагдсан бөгөөд багш нарын хяналтын самбар, сурагчдын ахицын тайлан зэргийг багтаадаг.",
              },
            ].map((faq, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-medium text-foreground">{faq.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
