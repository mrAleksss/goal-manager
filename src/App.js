import { useState } from "react"

const today = new Date().toISOString().split("T")[0]
const DAY_UNIT_IN_MSEC = 24 * 3600 * 1000

const initialGoals = [
  {
    name: "programming",
    deadLine: today,
    priority: "moderate",
    reward: "new phone",
    breakDown: 5,
  },
  {
    name: "sport",
    deadLine: today,
    priority: "easy",
    reward: "swimming in pool",
    breakDown: 5,
  },
  {
    name: "reading",
    deadLine: today,
    priority: "moderate",
    reward: "delicious meal",
    breakDown: 5,
  },
]

export default function App() {
  const [goals, setGoals] = useState(initialGoals)
  const [showAddGoals, setShowAddGoals] = useState(false)

  function handleAddGoal(goal) {
    setGoals([...goals, goal])
  }

  function handleShowAddingGoals() {
    setShowAddGoals((curState) => !curState)
  }
  return (
    <div className="App">
      <Goals goals={goals} />
      <Button onClick={handleShowAddingGoals}>
        {showAddGoals ? "Close" : "Add goal🧾"}
      </Button>
      {showAddGoals && <CreateGoal onAddGoal={handleAddGoal} />}
    </div>
  )
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

function Goals({ goals }) {
  const [easyGoals, setEasyGoals] = useState("Easy goals")
  const [moderateGoals, setmoderateGoals] = useState("Moderate goals")
  const [hardGoals, setHardGoals] = useState(" Hard goals")
  const [selected, setSelected] = useState("column")

  function handleSelected() {
    setSelected("selected-inp")
    setTimeout(() => setSelected("column"), 5000)
  }

  return (
    <div className="container">
      <div className="grid">
        <div className="column">
          <h2>My Goals</h2>
        </div>
        <div className="column">Number og goals {goals.length}</div>
        <input
          className={selected}
          value={easyGoals}
          onChange={(e) => setEasyGoals(e.target.value)}
          onClick={handleSelected}
        />
        <input
          className="column"
          value={moderateGoals}
          onChange={(e) => setmoderateGoals(e.target.value)}
        />
        <input
          className="column"
          value={hardGoals}
          onChange={(e) => setHardGoals(e.target.value)}
        />
      </div>
      <ul className="grid-list">
        {goals.map((goal) => (
          <Goal goal={goal} key={crypto.randomUUID()} />
        ))}
      </ul>
    </div>
  )
}

function Goal({ goal }) {
  const diffInMSec =
    new Date(goal.deadLine).getTime() - new Date(today).getTime()
  const diffInDays = diffInMSec / DAY_UNIT_IN_MSEC
  console.log(diffInDays)

  return (
    <li>
      <h4 className="goal-title">{goal.name}</h4>
      <p>
        <span className="goal-property">Dead-Line: </span>
        <span className="goal-value">{goal.deadLine}</span>
      </p>
      <p>
        <span className="goal-property">Reward: </span>
        <span className="goal-value">{goal.reward}</span>
      </p>
      <p>You have {diffInDays} days to complete your goal</p>
      {goal.breakDown ? (
        <p>you need {(goal.breakDown / diffInDays).toFixed(1)} times per day</p>
      ) : (
        ""
      )}

      <Button>edit🔨🔧</Button>
    </li>
  )
}

function CreateGoal({ onAddGoal }) {
  const [name, setName] = useState("")
  const [priority, setPriority] = useState("moderate")
  const [reward, setReward] = useState("")
  const [deadLine, setDeadLine] = useState(today)
  const [breakDown, setBreakDown] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!name || !priority || !reward || !deadLine) return
    const newGoal = { name, priority, reward, breakDown, deadLine }
    onAddGoal(newGoal)
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

          <div className="form-row"></div>
          <lable>On how many tasks you can break down your goal ?</lable>
          <input
            type="text"
            value={breakDown}
            onChange={(e) => setBreakDown(Number(e.target.value))}
          />

          <Button>Create</Button>
        </form>
      </div>
    </div>
  )
}
