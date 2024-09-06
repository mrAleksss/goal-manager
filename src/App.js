const initialGoals = [
  {
    name: "programming",
    deadline: { start: Date.now().toLocaleString(), end: "end of goal" },
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
    deadline: { start: Date.now().toLocaleString(), end: "end of goal" },
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
    deadline: { start: Date.now().toLocaleString(), end: "end of goal" },
    priority: "moderate",
    reward: "delicious meal",
    steps: {
      1: "break-down for smaller tasks",
      2: "learn every day read 5 pages",
    },
    breakDown: 5,
  },
]

export default function App() {
  return (
    <div className="App">
      <Goals />
      <button>Add goal🧾</button>
      <CreateGoal />
    </div>
  )
}

function Goals() {
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
        {initialGoals.map((goal) => (
          <Goal goal={goal} />
        ))}
      </ul>
    </div>
  )
}

function Goal({ goal }) {
  const steps = Object.values(goal.steps)
  return (
    <li>
      <h3>{goal.name}</h3>
      <p>
        Dead-Line: {goal.deadline.start}||{goal.deadline.end}
      </p>
      <p>Reward: {goal.reward}</p>
      <p>{goal.breakDown} times per ...</p>
      <span>Steps i need to take</span>
      <ul>
        {steps.map((step) => (
          <Step step={step} />
        ))}
      </ul>
      <button>edit🔨🔧</button>
    </li>
  )
}

function Step({ step }) {
  return <li>{step}</li>
}

function CreateGoal() {
  return (
    <div className="form-container">
      <div className="form-popup">
        <form>
          <diV className="form-row">
            <lable>What your goal is?</lable>
            <input type="text" />
          </diV>
          <diV className="form-row">
            <lable>Estimate priority</lable>
            <select>
              <option>easy</option>
              <option>moderate</option>
              <option>high</option>
            </select>
          </diV>

          <diV className="form-row">
            <lable>What is your reward?</lable>
            <input type="text" />
          </diV>

          <diV className="form-row">
            <lable>Dead Line</lable>
            <input type="text" />
          </diV>
          <diV className="form-row">
            <lable>Steps or what are you need to do?</lable>
            <input type="text" />
          </diV>
          <diV className="form-row"></diV>
          <lable>Break down per dead line period</lable>
          <input type="text" />

          <button>create</button>
        </form>
      </div>
    </div>
  )
}
