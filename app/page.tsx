"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { EarthGlobe } from "@/components/earth-globe"
import { FileText, GraduationCap, BookOpen, ClipboardCheck, ArrowRight, Lock, Sparkles } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Эссэ шинжилгээ",
    description: "PDF эссэгээ байршуулж, AI-р шинжлүүлээрэй",
    href: "/essay-analysis",
    premium: true,
  },
  {
    icon: GraduationCap,
    title: "Их сургуулиуд",
    description: "Дэлхийн шилдэг их сургуулиудын санал болголт",
    href: "/universities",
    premium: false,
  },
  {
    icon: BookOpen,
    title: "Эссэ загварууд",
    description: "Амжилттай эссэний загвар, зөвлөмжүүд",
    href: "/templates",
    premium: false,
  },
  {
    icon: ClipboardCheck,
    title: "Боловсролын тест",
    description: "Ерөнхий мэдлэгийн түвшингээ үнэлээрэй",
    href: "/test",
    premium: true,
  },
]

const stats = [
  { value: "500+", label: "Их сургууль" },
  { value: "50+", label: "Улс орон" },
  { value: "10,000+", label: "Хэрэглэгч" },
  { value: "98%", label: "Сэтгэл ханамж" },
]

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed globe background */}
      <EarthGlobe />

      {/* Scrollable content */}
      <div className="relative z-10">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center">
            <div className="mx-auto max-w-6xl px-4 py-20 text-center md:py-32">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                Монголын анхны боловсролын AI платформ
              </div>

              <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Боловсролын замд тань
                <span className="block text-accent">туслах хамтрагч</span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
                Эссэгээ байршуулж, AI шинжилгээгээр боловсролын зорилгодоо хүрэх алхмуудаа тодорхойлоорой.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="gap-2 text-base px-8">
                  <Link href="/essay-analysis">
                    Эхлэх
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-background/60 backdrop-blur-md text-base">
                  <Link href="/pricing">Үнийн мэдээлэл</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="border-y border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-foreground md:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-background/90 backdrop-blur-sm">
            <div className="mx-auto max-w-6xl px-4 py-20">
              <div className="mb-12 text-center">
                <h2 className="text-2xl font-bold text-foreground md:text-4xl">Үндсэн боломжууд</h2>
                <p className="mt-3 text-muted-foreground">Таны боловсролын зорилгод хүрэхэд туслах хэрэгслүүд</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {features.map((feature) => (
                  <Link
                    key={feature.href}
                    href={feature.href}
                    className="group relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1"
                  >
                    {feature.premium && (
                      <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                        <Sparkles className="h-3 w-3" />
                        Premium
                      </div>
                    )}
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="border-t border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto max-w-6xl px-4 py-16 text-center">
              <Lock className="mx-auto mb-4 h-10 w-10 text-accent" />
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Premium боломжуудыг нээгээрэй</h2>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                AI эссэ шинжилгээ, дэлгэрэнгүй тест болон бусад онцлог боломжууд
              </p>
              <Button asChild size="lg" className="mt-6 px-8">
                <Link href="/pricing">Үнийн мэдээлэл үзэх</Link>
              </Button>
            </div>
          </section>

          {/* Blog Preview Section */}
          <section className="bg-background/90 backdrop-blur-sm">
            <div className="mx-auto max-w-6xl px-4 py-20">
              <div className="mb-12 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground md:text-3xl">Блог</h2>
                  <p className="mt-2 text-muted-foreground">Боловсролын зөвлөмж, мэдээ мэдээлэл</p>
                </div>
                <Button asChild variant="outline" className="bg-background/60">
                  <Link href="/blog">Бүгдийг үзэх</Link>
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: "Эссэ бичих 10 зөвлөмж",
                    excerpt: "Их сургуульд элсэхэд чухал эссэ бичих арга барил",
                    date: "2025.01.10",
                  },
                  {
                    title: "Harvard элсэлтийн шаардлага",
                    excerpt: "Дэлхийн шилдэг их сургуульд элсэхэд юу хэрэгтэй вэ?",
                    date: "2025.01.08",
                  },
                  {
                    title: "IELTS vs TOEFL",
                    excerpt: "Аль шалгалтыг өгөх вэ? Давуу болон сул талууд",
                    date: "2025.01.05",
                  },
                ].map((post, i) => (
                  <Link
                    key={i}
                    href="/blog"
                    className="group rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="text-xs text-muted-foreground">{post.date}</div>
                    <h3 className="mt-2 font-semibold text-foreground group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                  <span className="text-sm font-bold text-accent-foreground">EP</span>
                </div>
                <span className="font-semibold text-foreground">EduPath Mongolia</span>
              </div>
              <p className="text-sm text-muted-foreground">© 2025 EduPath. Бүх эрх хуулиар хамгаалагдсан.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
