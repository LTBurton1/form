import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

export default function Input() {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);
  const [answer3, setAnswer3] = useState(0);
  const [answer4, setAnswer4] = useState(0);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    setAnswers([answer1, answer2, answer3, answer4]);
  }, [answer1, answer2, answer3, answer4]);

  async function addQuestion(e) {
    e.preventDefault();

    const body = {
      question,
      answers,
      category,
      correct,
    };

    const res = await fetch(`${API_URL}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    console.log(data);

    if (data.success === true) e.target.reset();
  }

  return (
    <form onSubmit={addQuestion}>
      <select onChange={e => setCategory(e.target.value)} name="category" id="category">
        <option>Choose a Category</option>
        <optgroup label="-- General Maths --">
          <option value="Addition">Addition</option>
          <option value="Subtraction">Subtraction</option>
          <option value="Multiplication">Multiplication</option>
          <option value="Division">Division</option>
          <option value="Further">Further</option>
        </optgroup>
        <optgroup label="-- Finance --">
          <option value="Mortgages">Mortgages</option>
          <option value="Interest Rates">Interest Rates</option>
          <option value="Charity">Charity</option>
          <option value="Saving">Saving</option>
          <option value="Currency">Currency</option>
        </optgroup>
        <optgroup label="-- Social --">
          <option value="Travel">Travel</option>
          <option value="Holidays">Holidays</option>
          <option value="Drinking">Drinking</option>
          <option value="Eating Out">Eating Out</option>
          <option value="Occasions">Occasions</option>
        </optgroup>
        <optgroup label="-- Home --">
          <option value="Gardening">Gardening</option>
          <option value="Shopping">Shopping</option>
          <option value="Cooking">Cooking</option>
          <option value="Chores">Chores</option>
          <option value="DIY">DIY</option>
        </optgroup>
        <optgroup label="-- Wellbeing --">
          <option value="Health">Health</option>
          <option value="Exercise">Exercise</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Mindfulness">Mindfulness</option>
          <option value="Weight">Weight</option>
        </optgroup>
      </select>
      <h2>Question</h2>
      <textarea onChange={e => setQuestion(e.target.value)} rows={5} cols={50} />
      <h2>Answers</h2>
      <input type="number" onChange={e => setAnswer1(Number(e.target.value))} />
      <input type="number" onChange={e => setAnswer2(Number(e.target.value))} />
      <input type="number" onChange={e => setAnswer3(Number(e.target.value))} />
      <input type="number" onChange={e => setAnswer4(Number(e.target.value))} />
      <h2>Correct</h2>
      <input type="number" onChange={e => setCorrect(Number(e.target.value))} />
      <br />
      <button type="submit" style={{ margin: "1rem" }}>
        Submit
      </button>
    </form>
  );
}
