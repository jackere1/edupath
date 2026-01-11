import { Header } from "@/components/header"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Эссэ бичих 10 зөвлөмж",
    excerpt: "Их сургуульд элсэхэд чухал эссэ бичих арга барил, алдаа засах аргууд",
    date: "2025.01.10",
    category: "Зөвлөмж",
    readTime: "5 мин",
  },
  {
    id: 2,
    title: "Harvard элсэлтийн шаардлага 2025",
    excerpt: "Дэлхийн шилдэг их сургуульд элсэхэд юу хэрэгтэй вэ? Бүрэн гарын авлага",
    date: "2025.01.08",
    category: "Их сургууль",
    readTime: "8 мин",
  },
  {
    id: 3,
    title: "IELTS vs TOEFL: Аль нь танд тохирох вэ?",
    excerpt: "Хоёр шалгалтын давуу болон сул талууд, сонголт хийхэд туслах зөвлөмж",
    date: "2025.01.05",
    category: "Шалгалт",
    readTime: "6 мин",
  },
  {
    id: 4,
    title: "Тэтгэлэгт хөтөлбөрт хэрхэн өргөдөл гаргах вэ?",
    excerpt: "Fullbright, Chevening болон бусад тэтгэлгийн хөтөлбөрүүдийн талаар",
    date: "2025.01.03",
    category: "Тэтгэлэг",
    readTime: "7 мин",
  },
  {
    id: 5,
    title: "Мотиваци захидал бичих арга",
    excerpt: "Элсэлтийн комиссын анхаарлыг татах мотиваци захидал хэрхэн бичих вэ?",
    date: "2024.12.28",
    category: "Зөвлөмж",
    readTime: "5 мин",
  },
  {
    id: 6,
    title: "2025 оны шилдэг боловсролын улс орнууд",
    excerpt: "Гадаадад суралцахад хамгийн тохиромжтой улс орнуудын жагсаалт",
    date: "2024.12.25",
    category: "Судалгаа",
    readTime: "10 мин",
  },
]

const categories = ["Бүгд", "Зөвлөмж", "Их сургууль", "Шалгалт", "Тэтгэлэг", "Судалгаа"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Блог</h1>
          <p className="mt-2 text-muted-foreground">Боловсролын зөвлөмж, мэдээ мэдээлэл, гарын авлагууд</p>
        </div>

        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                category === "Бүгд"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-12 rounded-lg border border-border bg-card p-6 md:p-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">Онцлох</span>
            <span>{blogPosts[0].date}</span>
            <span>•</span>
            <span>{blogPosts[0].readTime}</span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-foreground md:text-3xl">{blogPosts[0].title}</h2>
          <p className="mt-3 text-muted-foreground">{blogPosts[0].excerpt}</p>
          <Link
            href="#"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            Дэлгэрэнгүй унших
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(1).map((post) => (
            <article
              key={post.id}
              className="group rounded-lg border border-border bg-card p-5 transition-all hover:border-foreground/20"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded bg-secondary px-2 py-0.5">{post.category}</span>
                <span>{post.date}</span>
              </div>
              <h3 className="mt-3 font-medium text-foreground group-hover:text-accent">{post.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              <div className="mt-4 text-xs text-muted-foreground">{post.readTime} уншина</div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="rounded-md border border-border bg-card px-6 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
            Илүү ихийг үзэх
          </button>
        </div>
      </main>
    </div>
  )
}
