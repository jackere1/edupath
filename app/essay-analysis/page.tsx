"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface AnalysisResult {
  overallScore: number
  structure: number
  grammar: number
  content: number
  creativity: number
  feedback: string[]
  suggestions: string[]
}

export default function EssayAnalysisPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      setResult(null)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
      setResult(null)
    }
  }

  const analyzeEssay = async () => {
    if (!file) return

    setIsAnalyzing(true)

    // Mock analysis - simulating API call
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const mockResult: AnalysisResult = {
      overallScore: 78,
      structure: 82,
      grammar: 75,
      content: 80,
      creativity: 74,
      feedback: [
        "Эссэний бүтэц сайн зохион байгуулагдсан",
        "Үндсэн санаа тодорхой илэрхийлэгдсэн",
        "Дүгнэлт хэсэг илүү өргөжүүлэх шаардлагатай",
      ],
      suggestions: [
        "Илүү олон жишээ ашиглах",
        "Өгүүлбэрийн урт, богино хослолыг сайжруулах",
        "Мэргэжлийн нэр томъёог нэмэх",
      ],
    }

    setResult(mockResult)
    setIsAnalyzing(false)
  }

  const scoreColor = (score: number) => {
    if (score >= 80) return "text-accent"
    if (score >= 60) return "text-chart-4"
    return "text-destructive"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground md:text-3xl">Эссэ шинжилгээ</h1>
          <p className="mt-2 text-muted-foreground">PDF эссэгээ байршуулж, AI шинжилгээ хийлгээрэй</p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/30 p-8 transition-colors hover:border-foreground/30"
            >
              {file ? (
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
                  <p className="mb-2 text-foreground">PDF файлаа энд чирж тавина уу</p>
                  <p className="text-sm text-muted-foreground">эсвэл</p>
                </>
              )}

              <label className="mt-4 cursor-pointer">
                <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                <span className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80">
                  {file ? "Өөр файл сонгох" : "Файл сонгох"}
                </span>
              </label>
            </div>

            {file && (
              <div className="mt-6 flex justify-center">
                <Button onClick={analyzeEssay} disabled={isAnalyzing} className="gap-2">
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Шинжилж байна...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      Шинжилгээ эхлүүлэх
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Overall Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Ерөнхий үнэлгээ
                  <span className={`text-3xl ${scoreColor(result.overallScore)}`}>{result.overallScore}/100</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={result.overallScore} className="h-3" />
              </CardContent>
            </Card>

            {/* Detailed Scores */}
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { label: "Бүтэц", score: result.structure },
                { label: "Дүрэм", score: result.grammar },
                { label: "Агуулга", score: result.content },
                { label: "Бүтээлч байдал", score: result.creativity },
              ].map((item) => (
                <Card key={item.label}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className={`font-semibold ${scoreColor(item.score)}`}>{item.score}%</span>
                    </div>
                    <Progress value={item.score} className="mt-2 h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Feedback */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    Давуу талууд
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.feedback.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertCircle className="h-5 w-5 text-chart-4" />
                    Сайжруулах зөвлөмж
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.suggestions.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
