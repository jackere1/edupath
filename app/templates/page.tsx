"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Eye, BookOpen } from "lucide-react"

const templates = [
  {
    id: 1,
    title: "Хувийн эссэ - Амжилтын түүх",
    category: "personal",
    difficulty: "Дунд",
    downloads: 1240,
    description: "Амжилтын түүхээ хэрхэн үр дүнтэй илэрхийлэх талаар",
    structure: [
      "Оршил - Анхаарал татах эхлэл",
      "Асуудал/Бэрхшээл - Тулгарсан сорилт",
      "Үйл ажиллагаа - Хийсэн алхмууд",
      "Үр дүн - Сурсан зүйл, өөрчлөлт",
      "Дүгнэлт - Ирээдүйн зорилго",
    ],
  },
  {
    id: 2,
    title: "Академик эссэ - Судалгааны сэдэв",
    category: "academic",
    difficulty: "Хүнд",
    downloads: 890,
    description: "Судалгааны сэдвийг шинжлэх ухааны үндэслэлтэй танилцуулах",
    structure: [
      "Оршил - Судалгааны асуудал",
      "Онолын хэсэг - Өмнөх судалгаа",
      "Арга зүй - Судалгааны арга",
      "Үр дүн - Олж мэдсэн зүйл",
      "Дүгнэлт - Санал, зөвлөмж",
    ],
  },
  {
    id: 3,
    title: "Манлайллын эссэ",
    category: "personal",
    difficulty: "Дунд",
    downloads: 756,
    description: "Манлайллын чадварыг жишээгээр нотлох",
    structure: [
      "Оршил - Манлайллын тодорхойлолт",
      "Жишээ #1 - Багийн удирдлага",
      "Жишээ #2 - Шийдвэр гаргалт",
      "Сурсан зүйл - Хөгжил",
      "Дүгнэлт - Ирээдүйн төлөвлөгөө",
    ],
  },
  {
    id: 4,
    title: "Why This University эссэ",
    category: "application",
    difficulty: "Хөнгөн",
    downloads: 2100,
    description: "Яагаад энэ их сургуульд элсэхийг хүсч байгааг тайлбарлах",
    structure: [
      "Оршил - Сонирхлын үндэс",
      "Академик шалтгаан - Хөтөлбөр, багш нар",
      "Хувийн шалтгаан - Соёл, орчин",
      "Хувь нэмэр - Юу өгч чадах",
      "Дүгнэлт - Зорилго, хүлээлт",
    ],
  },
]

const tips = [
  {
    title: "Эхлэлийг сонирхолтой болго",
    description: "Анхаарал татах асуулт, статистик эсвэл түүхээр эхэл",
  },
  {
    title: "Жишээ ашигла",
    description: "Ерөнхий ярихаас илүү тодорхой жишээ өг",
  },
  {
    title: "Өөрийн дуу хоолойг хадгал",
    description: "Хуурмаг биш, жинхэнэ байдлаар бич",
  },
  {
    title: "Засч, дахин унш",
    description: "Бичсэнийхээ дараа заавал дахин уншиж засаарай",
  },
]

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof templates)[0] | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const filteredTemplates = activeTab === "all" ? templates : templates.filter((t) => t.category === activeTab)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground md:text-3xl">Эссэ загварууд</h1>
          <p className="mt-2 text-muted-foreground">Амжилттай эссэний загвар, зөвлөмжүүд</p>
        </div>

        {/* Tips Section */}
        <Card className="mb-8 bg-secondary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5" />
              Эссэ бичих зөвлөмж
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {tips.map((tip, i) => (
                <div key={i} className="rounded-md bg-card p-4">
                  <h4 className="mb-1 font-medium text-foreground">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Templates */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">Бүгд</TabsTrigger>
            <TabsTrigger value="personal">Хувийн</TabsTrigger>
            <TabsTrigger value="academic">Академик</TabsTrigger>
            <TabsTrigger value="application">Өргөдөл</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedTemplate?.id === template.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <CardDescription className="mt-1">{template.description}</CardDescription>
                      </div>
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex items-center gap-2">
                      <Badge variant="outline">{template.difficulty}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {template.downloads.toLocaleString()} таталт
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 gap-1 bg-transparent">
                        <Eye className="h-4 w-4" />
                        Үзэх
                      </Button>
                      <Button size="sm" className="flex-1 gap-1">
                        <Download className="h-4 w-4" />
                        Татах
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Selected Template Detail */}
        {selectedTemplate && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{selectedTemplate.title} - Бүтэц</CardTitle>
              <CardDescription>Эссэний үндсэн бүтэц</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {selectedTemplate.structure.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
