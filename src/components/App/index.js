import { useEffect, useState } from "react";
import Input from "../Input";

const API_URL = process.env.REACT_APP_API_URL;

const styleObj = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  boxShadow: "0 2px 10px rgba(0 0 0 / 0.3)",
  margin: "2rem",
  padding: "1rem",
  borderRadius: "10px",
};

const buttonStyle = {
  position: "absolute",
  top: "2rem",
  right: "2rem",
  padding: "1rem",
  color: "white",
  fontWeight: "bold",
  background: "red",
  border: "none",
  cursor: "pointer",
};

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getQuestions() {
      const res = await fetch(`${API_URL}/questions`);
      const data = await res.json();
      console.log("Questions:", data.payload);

      data.payload.sort((a, b) => (a.question_id > b.question_id ? 1 : -1));

      setQuestions(data.payload);
    }
    getQuestions();
  }, []);

  async function deleteQuestion(question_id, index) {
    const res = await fetch(`${API_URL}/questions/${question_id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log("Deleted:", data.payload);

    setQuestions([...questions.slice(0, index), ...questions.slice(index + 1)]);
  }

  return (
    <div className="App">
      <h1>Add A Question</h1>
      <Input />

      <h2 style={{ marginTop: "4rem", textDecoration: "underline" }}>All Questions</h2>
      {questions.length > 0 &&
        questions.map((question, index) => (
          <div key={question.question_id} style={styleObj}>
            <div>
              <div>
                <h4>ID: {question.question_id}</h4>
                <h4>Category: {question.category}</h4>
                <h2>Question: {question.question}</h2>
              </div>
              {question.answers.map((answer, index) => (
                <p key={index}>
                  Answer {index + 1}: {answer}
                </p>
              ))}
              <h2>Correct: {question.correct}</h2>
            </div>
            <button style={buttonStyle} onClick={() => deleteQuestion(question.question_id, index)}>
              DELETE
            </button>
          </div>
        ))}
    </div>
  );
}

export default App;
