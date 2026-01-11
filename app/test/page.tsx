"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react"

const questions = [
  {
    id: 1,
    question: "Монгол улсын үндсэн хууль хэзээ батлагдсан бэ?",
    options: ["1990 он", "1992 он", "1995 он", "2000 он"],
    correct: 1,
    category: "Түүх",
  },
  {
    id: 2,
    question: "Дэлхийн хамгийн урт гол аль нь вэ?",
    options: ["Амазон", "Нил", "Янцзы", "Миссисипи"],
    correct: 1,
    category: "Газар зүй",
  },
  {
    id: 3,
    question: "E=mc² томьёог хэн гаргаж ирсэн бэ?",
    options: ["Исаак Ньютон", "Никола Тесла", "Альберт Эйнштейн", "Стивен Хокинг"],
    correct: 2,
    category: "Шинжлэх ухаан",
  },
  {
    id: 4,
    question: "2024 оны олимпийн наадам хаана болсон бэ?",
    options: ["Токио", "Парис", "Лос Анжелес", "Лондон"],
    correct: 1,
    category: "Спорт",
  },
  {
    id: 5,
    question: "Монгол бичгийг хэн зохиосон бэ?",
    options: ["Чингис хаан", "Тататунга", "Өгөдэй хаан", "Хубилай хаан"],
    correct: 1,
    category: "Түүх",
  },
  {
    id: 6,
    question: "Усны химийн томьёо юу вэ?",
    options: ["CO2", "H2O", "NaCl", "O2"],
    correct: 1,
    category: "Шинжлэх ухаан",
  },
  {
    id: 7,
    question: "Японы нийслэл хот аль нь вэ?",
    options: ["Осака", "Киото", "Токио", "Хиросима"],
    correct: 2,
    category: "Газар зүй",
  },
  {
    id: 8,
    question: '"Хамлет" зохиолыг хэн бичсэн бэ?',
    options: ["Чарльз Диккенс", "Уильям Шекспир", "Марк Твен", "Жейн Остин"],
    correct: 1,
    category: "Уран зохиол",
  },
]

export default function TestPage() {
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [showResults, setShowResults] = useState(false)

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = selectedAnswer
      setAnswers(newAnswers)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(answers[currentQuestion + 1])
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      if (selectedAnswer !== null) {
        const newAnswers = [...answers]
        newAnswers[currentQuestion] = selectedAnswer
        setAnswers(newAnswers)
      }
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1])
    }
  }

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === questions[index].correct ? score + 1 : score
    }, 0)
  }

  const resetTest = () => {
    setStarted(false)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers(new Array(questions.length).fill(null))
    setShowResults(false)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const score = calculateScore()
  const percentage = Math.round((score / questions.length) * 100)

  if (!started) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-12">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ерөнхий мэдлэгийн тест</CardTitle>
              <CardDescription>Өөрийн боловсролын түвшинг үнэлэх {questions.length} асуулттай тест</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-md bg-secondary p-3">
                  <div className="font-semibold text-foreground">{questions.length}</div>
                  <div className="text-muted-foreground">Асуулт</div>
                </div>
                <div className="rounded-md bg-secondary p-3">
                  <div className="font-semibold text-foreground">~5 мин</div>
                  <div className="text-muted-foreground">Хугацаа</div>
                </div>
              </div>
              <Button onClick={() => setStarted(true)} size="lg">
                Тест эхлүүлэх
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-12">
          <Card>
            <CardHeader className="text-center">
              <Trophy className={`mx-auto mb-2 h-12 w-12 ${percentage >= 70 ? "text-accent" : "text-chart-4"}`} />
              <CardTitle className="text-2xl">Тестийн үр дүн</CardTitle>
              <CardDescription>
                Та {questions.length} асуултаас {score} зөв хариулсан байна
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 text-center">
                <div className={`text-5xl font-bold ${percentage >= 70 ? "text-accent" : "text-chart-4"}`}>
                  {percentage}%
                </div>
                <Progress value={percentage} className="mt-4 h-3" />
              </div>

              <div className="space-y-3">
                {questions.map((q, i) => (
                  <div
                    key={q.id}
                    className={`flex items-center gap-3 rounded-md p-3 ${
                      answers[i] === q.correct ? "bg-accent/10" : "bg-destructive/10"
                    }`}
                  >
                    {answers[i] === q.correct ? (
                      <CheckCircle className="h-5 w-5 shrink-0 text-accent" />
                    ) : (
                      <XCircle className="h-5 w-5 shrink-0 text-destructive" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{q.question}</p>
                      {answers[i] !== q.correct && (
                        <p className="text-xs text-muted-foreground">Зөв хариулт: {q.options[q.correct]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={resetTest} className="mt-6 w-full gap-2">
                <RotateCcw className="h-4 w-4" />
                Дахин өгөх
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <Card>
          <CardHeader>
            <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Асуулт {currentQuestion + 1}/{questions.length}
              </span>
              <span className="rounded-md bg-secondary px-2 py-1">{currentQ.category}</span>
            </div>
            <Progress value={progress} className="mb-4 h-2" />
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(val) => setSelectedAnswer(Number.parseInt(val))}
              className="space-y-3"
            >
              {currentQ.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 rounded-md border p-4 transition-colors ${
                    selectedAnswer === index ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"
                  }`}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex-1 bg-transparent"
              >
                Өмнөх
              </Button>
              <Button onClick={handleNext} disabled={selectedAnswer === null} className="flex-1">
                {currentQuestion === questions.length - 1 ? "Дуусгах" : "Дараах"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
