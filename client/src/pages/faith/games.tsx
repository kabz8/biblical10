import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type QuizQuestion = {
  id: number;
  reference: string;
  question: string;
  options: string[];
  correctIndex: number;
};

const bibleQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    reference: "James 1:21",
    question:
      "According to James 1:21, what must be received with 'meekness' to enable the salvation of the soul?",
    options: [
      "the engrafted word",
      "strict societal laws",
      "personal intuition",
      "worldly philosophy",
    ],
    correctIndex: 0,
  },
  {
    id: 2,
    reference: "Acts 4:32",
    question:
      "Based on Acts 4:32, how did the early multitude of believers approach their personal possessions?",
    options: [
      "they sold them for individual profit",
      "they discarded all material wealth",
      "they kept their belongings strictly private",
      "they held all things in common",
    ],
    correctIndex: 3,
  },
  {
    id: 3,
    reference: "1 Chronicles 16:27",
    question:
      "According to 1 Chronicles 16:27, which pair of attributes is found 'in his dwelling place'?",
    options: [
      "splendor and majesty",
      "peace and protection",
      "Glory and honor",
      "strength and joy",
    ],
    correctIndex: 3,
  },
];

type WordSearchPuzzle = {
  id: string;
  title: string;
  words: string[];
};

const wordSearchPuzzles: WordSearchPuzzle[] = [
  {
    id: "places-in-the-bible",
    title: "Places in the Bible",
    words: [
      "Bethany",
      "Dead Sea",
      "Eden",
      "Garden of Gethsemane",
      "Goshen",
      "Mount Ararat",
      "Mount Nebo",
      "Mount Carmel",
      "Mount Sinai",
      "Mount Zion",
      "River Jordan",
      "Sea of Galilee",
    ],
  },
  {
    id: "new-testament-books",
    title: "New Testament Books",
    words: [
      "Acts",
      "Romans",
      "Corinthians",
      "Galatians",
      "Ephesians",
      "Philippians",
      "Colossians",
      "Thessalonians",
      "Timothy",
      "Titus",
      "Philemon",
      "Hebrews",
      "James",
      "Peter",
      "John",
      "Jude",
      "Matthew",
      "Mark",
      "Luke",
      "Revelation",
    ],
  },
];

function normalizeWord(word: string) {
  return word.replace(/[^A-Za-z]/g, "").toUpperCase();
}

function buildSelectionCells(
  start: { r: number; c: number },
  end: { r: number; c: number }
) {
  const drRaw = end.r - start.r;
  const dcRaw = end.c - start.c;
  const dr = drRaw === 0 ? 0 : drRaw / Math.abs(drRaw);
  const dc = dcRaw === 0 ? 0 : dcRaw / Math.abs(dcRaw);

  // must be straight line (horizontal/vertical/diagonal)
  if (!(dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc))) {
    return [];
  }

  const len = Math.max(Math.abs(drRaw), Math.abs(dcRaw)) + 1;
  const cells: { r: number; c: number }[] = [];
  for (let i = 0; i < len; i++) {
    cells.push({ r: start.r + dr * i, c: start.c + dc * i });
  }
  return cells;
}

function getLettersFromCells(grid: string[], cells: { r: number; c: number }[]) {
  return cells.map(({ r, c }) => grid[r]?.[c] ?? "").join("");
}

function findWordPath(grid: string[], targetNorm: string) {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  if (!rows || !cols) return null;

  const directions = [
    { dr: 0, dc: 1 },
    { dr: 0, dc: -1 },
    { dr: 1, dc: 0 },
    { dr: -1, dc: 0 },
    { dr: 1, dc: 1 },
    { dr: 1, dc: -1 },
    { dr: -1, dc: 1 },
    { dr: -1, dc: -1 },
  ];

  const len = targetNorm.length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      for (const { dr, dc } of directions) {
        const cells: { r: number; c: number }[] = [];
        let ok = true;
        for (let i = 0; i < len; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
            ok = false;
            break;
          }
          const ch = grid[nr][nc];
          if (ch !== targetNorm[i]) {
            ok = false;
            break;
          }
          cells.push({ r: nr, c: nc });
        }
        if (ok) return cells;
      }
    }
  }
  return null;
}

function BibleQuizGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = bibleQuizQuestions[currentIndex];

  const handleOptionClick = (index: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    if (index === question.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    const isLast = currentIndex === bibleQuizQuestions.length - 1;
    if (isLast) {
      setCompleted(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setCompleted(false);
  };

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <Card className="rounded-3xl shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Question {currentIndex + 1}</span>
                <span className="text-sm text-muted-foreground">
                  Score: {score}/{bibleQuizQuestions.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {completed ? (
                <div className="text-center space-y-6">
                  <p className="text-xl font-semibold">
                    You scored {score} out of {bibleQuizQuestions.length}.
                  </p>
                  <p className="text-muted-foreground">
                    Keep playing and meditating on these verses to hide God&apos;s
                    Word in your heart.
                  </p>
                  <Button size="lg" onClick={handleRestart} className="rounded-full">
                    Play Again
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-wide text-muted-foreground">
                      {question.reference}
                    </p>
                    <p className="text-2xl md:text-3xl font-semibold leading-snug">
                      {question.question}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {question.options.map((option, index) => {
                      const isSelected = selectedIndex === index;
                      const isCorrect = index === question.correctIndex;
                      const showState = selectedIndex !== null;

                      let variantClasses =
                        "border-2 border-border hover:border-primary/60";

                      if (showState) {
                        if (isCorrect) {
                          variantClasses = "border-2 border-green-500 bg-green-100";
                        } else if (isSelected && !isCorrect) {
                          variantClasses = "border-2 border-red-500 bg-red-50";
                        }
                      }

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleOptionClick(index)}
                          className={`text-left rounded-2xl px-4 py-5 text-sm md:text-base transition-colors ${variantClasses}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <p className="text-xs text-muted-foreground">
                      Tap an answer to reveal the correct option. Then continue to
                      the next question.
                    </p>
                    <Button
                      disabled={selectedIndex === null}
                      onClick={handleNext}
                      className="rounded-full"
                    >
                      {currentIndex === bibleQuizQuestions.length - 1
                        ? "Finish Quiz"
                        : "Next Question"}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
        </Card>
      </div>
    </section>
  );
}

function WordSearchGame() {
  const [puzzleId, setPuzzleId] = useState(wordSearchPuzzles[0]?.id ?? "");
  const puzzle = useMemo(
    () => wordSearchPuzzles.find((p) => p.id === puzzleId) ?? wordSearchPuzzles[0],
    [puzzleId]
  );
  const { toast } = useToast();

  const normalizedWords = useMemo(
    () => puzzle.words.map((w) => ({ raw: w, norm: normalizeWord(w) })),
    [puzzle.words]
  );

  const { grid, rows, cols } = useMemo(() => {
    const norms = puzzle.words.map(normalizeWord);
    const maxLen = norms.reduce((m, w) => Math.max(m, w.length), 0);
    const cols = Math.max(maxLen, 10);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const built: string[] = norms.map((w) => {
      let row = w;
      while (row.length < cols) {
        row += alphabet[Math.floor(Math.random() * alphabet.length)];
      }
      return row;
    });
    return { grid: built, rows: built.length, cols };
  }, [puzzle.words]);

  const [showWordList, setShowWordList] = useState(true);
  const [found, setFound] = useState<Record<string, { cells: { r: number; c: number }[] }>>(
    {}
  );
  const [dragStart, setDragStart] = useState<{ r: number; c: number } | null>(null);
  const [dragEnd, setDragEnd] = useState<{ r: number; c: number } | null>(null);
  const isDraggingRef = useRef(false);

  const total = normalizedWords.length;
  const foundCount = Object.keys(found).length;
  const percent = total === 0 ? 0 : Math.round((foundCount / total) * 100);

  const selectionCells = useMemo(() => {
    if (!dragStart || !dragEnd) return [];
    return buildSelectionCells(dragStart, dragEnd);
  }, [dragStart, dragEnd]);

  const foundCellKey = useMemo(() => {
    const keys = new Set<string>();
    for (const entry of Object.values(found)) {
      for (const cell of entry.cells) keys.add(`${cell.r}:${cell.c}`);
    }
    return keys;
  }, [found]);

  const selectionKey = useMemo(() => {
    const keys = new Set<string>();
    for (const cell of selectionCells) keys.add(`${cell.r}:${cell.c}`);
    return keys;
  }, [selectionCells]);

  const tryCommitSelection = () => {
    if (!dragStart || !dragEnd) return;
    const cells = buildSelectionCells(dragStart, dragEnd);
    if (cells.length === 0) return;

    const letters = getLettersFromCells(grid, cells).toUpperCase();
    const lettersRev = letters.split("").reverse().join("");

    const match = normalizedWords.find(
      (w) => !(w.norm in found) && (w.norm === letters || w.norm === lettersRev)
    );

    if (!match) return;
    setFound((prev) => ({ ...prev, [match.norm]: { cells } }));
  };

  const resetPuzzle = () => {
    setFound({});
    setDragStart(null);
    setDragEnd(null);
    isDraggingRef.current = false;
  };

  const handlePickPuzzle = (id: string) => {
    setPuzzleId(id);
    resetPuzzle();
  };

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="rounded-3xl shadow-lg">
          <CardHeader className="gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <CardTitle className="flex items-center justify-between gap-3">
                <span>{puzzle.title}</span>
                <span className="text-sm text-muted-foreground">
                  Found: {foundCount}/{total} ({percent}%)
                </span>
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                {wordSearchPuzzles.map((p) => (
                  <Button
                    key={p.id}
                    variant={p.id === puzzle.id ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => handlePickPuzzle(p.id)}
                  >
                    {p.title}
                  </Button>
                ))}
                <Button variant="outline" className="rounded-full" onClick={resetPuzzle}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setShowWordList((v) => !v)}
                >
                  {showWordList ? "Hide word list" : "Show word list"}
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Drag (or click and drag) across letters in a straight line to select a word. Words can
              be forwards or backwards.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
              <div className="rounded-2xl border bg-background p-4 overflow-auto">
                <div
                  className="grid gap-1 select-none touch-none"
                  style={{ gridTemplateColumns: `repeat(${cols}, minmax(32px, 1fr))` }}
                  onPointerUp={() => {
                    if (!isDraggingRef.current) return;
                    isDraggingRef.current = false;
                    tryCommitSelection();
                    setDragStart(null);
                    setDragEnd(null);
                  }}
                  onPointerLeave={() => {
                    if (!isDraggingRef.current) return;
                    isDraggingRef.current = false;
                    tryCommitSelection();
                    setDragStart(null);
                    setDragEnd(null);
                  }}
                >
                  {grid.map((row, r) =>
                    row.split("").map((ch, c) => {
                      const key = `${r}:${c}`;
                      const isFound = foundCellKey.has(key);
                      const isSelected = selectionKey.has(key);
                      const bg = isFound
                        ? "bg-green-100 border-green-400"
                        : isSelected
                          ? "bg-primary/10 border-primary/40"
                          : "bg-muted/30 border-border";
                      return (
                        <button
                          key={key}
                          type="button"
                          className={`h-10 w-10 md:h-11 md:w-11 rounded-xl border font-mono font-semibold flex items-center justify-center ${bg}`}
                          onPointerDown={(e) => {
                            e.currentTarget.setPointerCapture(e.pointerId);
                            isDraggingRef.current = true;
                            setDragStart({ r, c });
                            setDragEnd({ r, c });
                          }}
                          onPointerEnter={() => {
                            if (!isDraggingRef.current) return;
                            setDragEnd({ r, c });
                          }}
                        >
                          {ch}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-base">Score</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Found</span>
                      <span className="font-semibold">
                        {foundCount}/{total}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completion</span>
                      <span className="font-semibold">{percent}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground pt-2">
                      Tip: If you want it harder, hide the word list.
                    </p>
                  </CardContent>
                </Card>

                {showWordList && (
                  <Card className="rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-base">Words to find</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {normalizedWords.map((w) => {
                          const done = w.norm in found;
                          return (
                            <div
                              key={w.norm}
                              className={`rounded-xl border px-3 py-2 ${
                                done ? "bg-green-50 border-green-200" : "bg-background"
                              }`}
                            >
                              <span className={done ? "line-through text-muted-foreground" : ""}>
                                {w.raw}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-foreground text-background py-16 text-center">
        <div className="container mx-auto px-4">
          <Gamepad2 className="w-14 h-14 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Faith Games</h1>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            Bible games that make learning Scripture fun. Choose a game mode below.
          </p>
          <div className="mt-8 flex justify-center">
            <Tabs defaultValue="quiz" className="w-full max-w-4xl">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="quiz">Bible Quiz</TabsTrigger>
                <TabsTrigger value="wordsearch">Word Search</TabsTrigger>
              </TabsList>

              <TabsContent value="quiz">
                <BibleQuizGame />
              </TabsContent>
              <TabsContent value="wordsearch">
                <WordSearchGame />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}
