import { Suspense } from "react"
import { Header } from "@/components/header"
import { UniversitiesContent } from "@/components/universities-content"

export default function UniversitiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<UniversitiesLoading />}>
        <UniversitiesContent />
      </Suspense>
    </div>
  )
}

function UniversitiesLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <div className="h-8 w-48 animate-pulse rounded bg-secondary" />
        <div className="mt-2 h-5 w-72 animate-pulse rounded bg-secondary" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-64 animate-pulse rounded-lg border border-border bg-card" />
        ))}
      </div>
    </main>
  )
}
