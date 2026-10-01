import { useState } from "react";

type Module = {name: string; mark: number; credits?: number};
type Classification = "First" | "2:1" | "2:2" | "Third";
const defaultCredits = 15

const startingModules: Module[] = [
  { name: "Analysis", mark: 72, credits: 15 },
  { name: "Algebra", mark: 52, credits: 15 },
  { name: "Statistics", mark: 68, credits: 15 },
];

function classify(avg: number): Classification {
  if (avg >= 70) return "First";
  if (avg >= 60) return "2:1";
  if (avg >= 50) return "2:2";
  return "Third";
}

function classColour(parameter: Classification): string {
  if (parameter === "First") return "green";
  if (parameter === "2:1") return "blue";
  if (parameter === "2:2") return "orange";
  return "red";
}

function App() {
  const [modules, setModules] = useState<Module[]>(startingModules);
  const totalCredits = modules.reduce((sum, m) => sum + (m.credits ?? defaultCredits) , 0);
  const weightedSum = modules.reduce((sum, m) => sum + m.mark * (m.credits === undefined ? defaultCredits : m.credits), 0); // playing about with ternaries
  const average = weightedSum / totalCredits;
  const grade = classify(average)
  return (
    <div>
      <h1>Grade calculator</h1>
      <ul>
        {modules.map((m) => (<li style = {{color:classColour(classify(m.mark))}} key={m.name}>{m.name}: {m.mark} ({m.credits} credits) <button onClick={() => setModules(modules.filter(n => n.name !== m.name))}>Remove</button></li>))}
      </ul>
      <p style = {{color: classColour(grade)}}>
        Weighted average: {average.toFixed(1)} ({grade})
      </p>
    </div>
  );
}



export default App;