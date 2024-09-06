import { useState } from "react";

const today = new Date().toISOString().split("T")[0];

const initialGoals = [
  {
    name: "programming",
    deadline: today,
    priority: "moderate",
    reward: "new phone",
    steps: {
      st1: "break-down for smaller tasks",
      st2: "learn every day 5 lecture",
    },
    breakDown: 5,
  },
  {
    name: "sport",
    deadline: today,
    priority: "easy",
    reward: "swimming in pool",
    steps: {
      1: "break-down for smaller tasks",
      2: "12 exersises per month",
    },
    breakDown: 5,
  },
  {
    name: "reading",
    deadline: today,
    priority: "moderate",
    reward: "delicious meal",
    steps: {
      1: "break-down for smaller tasks",
      2: "learn every day read 5 pages",
    },
    breakDown: 5,
  },
];

export default function App() {
  const [goals, setGoals] = useState(initialGoals);
  const [showAddGoals, setShowAddGoals] = useState(false);

  function handleAddGoal(goal) {
    setGoals([...goals, goal]);
  }

  function handleShowAddingGoals() {
    setShowAddGoals((curState) => !curState);
  }

  return (
    <div className="App">
      <Goals goals={goals} />
      <Button onClick={handleShowAddingGoals}>
        {showAddGoals ? "Close" : "Add goal🧾"}
      </Button>
      {showAddGoals && <CreateGoal onAddGoal={handleAddGoal} />}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function Goals({ goals }) {
  return (
    <div className="container">
      <div className="grid">
        <div className="column">
          <h2>My Goals</h2>
        </div>
        <div className="column">Number og goals X</div>
        <div className="column">Easy goals</div>
        <div className="column">Moderate goals</div>
        <div className="column">Hard goals</div>
      </div>
      <ul className="grid-list">
        {goals.map((goal) => (
          <Goal goal={goal} key={crypto.randomUUID()} />
        ))}
      </ul>
    </div>
  );
}

function Goal({ goal }) {
  const steps = Object.values(goal.steps);
  return (
    <li>
      <h3>{goal.name}</h3>
      <p>Dead-Line: {goal.deadLine}</p>
      <p>Reward: {goal.reward}</p>
      <p>{goal.breakDown} times per ...</p>
      <span>Steps i need to take</span>
      <ul>
        {steps.map((step) => (
          <Step step={step} key={crypto.randomUUID()} />
        ))}
      </ul>
      <Button>edit🔨🔧</Button>
    </li>
  );
}

function Step({ step }) {
  return <li>{step}</li>;
}

function CreateGoal({ onAddGoal }) {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("moderate");
  const [reward, setReward] = useState("");
  const [deadLine, setDeadLine] = useState(today);
  const [steps, setSteps] = useState("");
  const [breakDown, setBreakDown] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !priority || !reward || !deadLine) return;
    const newGoal = { name, priority, reward, breakDown, deadLine, steps };
    onAddGoal(newGoal);
  }

  return (
    <div className="form-container">
      <div className="form-popup">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <lable>What your goal is?</lable>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-row">
            <lable>Estimate priority</lable>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>easy</option>
              <option>moderate</option>
              <option>high</option>
            </select>
          </div>

          <div className="form-row">
            <lable>What is your reward?</lable>
            <input
              type="text"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
            />
          </div>

          <div className="form-row">
            <lable>Dead Line</lable>
            <input
              type="date"
              value={deadLine}
              onChange={(e) => setDeadLine(e.target.value)}
            />
          </div>

          <div className="form-row">
            <lable>Steps or what are you need to do?</lable>
            <input
              type="text"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            />
          </div>
          <div className="form-row"></div>
          <lable>Break down per dead line period</lable>
          <input
            type="text"
            value={breakDown}
            onChange={(e) => setBreakDown(Number(e.target.value))}
          />

          <Button>Create</Button>
        </form>
      </div>
    </div>
  );
}
