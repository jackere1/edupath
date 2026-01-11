"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Globe, Search, ExternalLink } from "lucide-react"

const universities = [
  {
    id: 1,
    name: "Harvard University",
    country: "АНУ",
    city: "Cambridge, MA",
    rank: 1,
    matchScore: 92,
    programs: ["Бизнес", "Эрх зүй", "Анагаах"],
    tuition: "$54,000/жил",
  },
  {
    id: 2,
    name: "University of Oxford",
    country: "Их Британи",
    city: "Oxford",
    rank: 2,
    matchScore: 88,
    programs: ["Философи", "Эдийн засаг", "Улс төр"],
    tuition: "£35,000/жил",
  },
  {
    id: 3,
    name: "National University of Singapore",
    country: "Сингапур",
    city: "Singapore",
    rank: 8,
    matchScore: 85,
    programs: ["Инженер", "Компьютер", "Бизнес"],
    tuition: "$40,000/жил",
  },
  {
    id: 4,
    name: "ETH Zurich",
    country: "Швейцарь",
    city: "Zurich",
    rank: 7,
    matchScore: 82,
    programs: ["Инженер", "Шинжлэх ухаан", "Математик"],
    tuition: "CHF 1,500/жил",
  },
  {
    id: 5,
    name: "University of Tokyo",
    country: "Япон",
    city: "Tokyo",
    rank: 23,
    matchScore: 79,
    programs: ["Технологи", "Анагаах", "Хууль"],
    tuition: "¥535,800/жил",
  },
  {
    id: 6,
    name: "Seoul National University",
    country: "Өмнөд Солонгос",
    city: "Seoul",
    rank: 29,
    matchScore: 76,
    programs: ["Инженер", "Бизнес", "Урлаг"],
    tuition: "₩7,000,000/жил",
  },
]

export function UniversitiesContent() {
  const [search, setSearch] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const countries = [...new Set(universities.map((u) => u.country))]

  const filtered = universities.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) || u.country.toLowerCase().includes(search.toLowerCase())
    const matchesCountry = !selectedCountry || u.country === selectedCountry
    return matchesSearch && matchesCountry
  })

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground md:text-3xl">Их сургуулиуд</h1>
        <p className="mt-2 text-muted-foreground">Таны эссэнд тохирох дэлхийн шилдэг их сургуулиуд</p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Хайх..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCountry === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCountry(null)}
          >
            Бүгд
          </Button>
          {countries.map((country) => (
            <Button
              key={country}
              variant={selectedCountry === country ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCountry(country)}
            >
              {country}
            </Button>
          ))}
        </div>
      </div>

      {/* University Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((uni) => (
          <Card key={uni.id} className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{uni.name}</CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {uni.city}, {uni.country}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  #{uni.rank}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Тохирох оноо</span>
                <span className="font-semibold text-accent">{uni.matchScore}%</span>
              </div>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {uni.programs.map((prog) => (
                  <Badge key={prog} variant="outline" className="text-xs">
                    {prog}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Сургалтын төлбөр</span>
                <span className="font-medium text-foreground">{uni.tuition}</span>
              </div>

              <Button variant="outline" size="sm" className="mt-4 w-full gap-2 bg-transparent">
                <Globe className="h-4 w-4" />
                Дэлгэрэнгүй
                <ExternalLink className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Таны хайлтад тохирох их сургууль олдсонгүй</p>
        </div>
      )}
    </main>
  )
}
