import React, { useState } from "react";
import TicketSelection from "./components/TicketSelection/TicketSelection";
import AttendeeForm from "./components/AttendeeForm/AttendeeForm";
import './App.css';

function App() {
  const [showAttendeeForm, setShowAttendeeForm] = useState(false);

  return (
    <div className="App">
      {showAttendeeForm ? (
        <AttendeeForm onBack={() => setShowAttendeeForm(false)} />
      ) : (
        <TicketSelection onNext={() => setShowAttendeeForm(true)} />
      )}
    </div>
  );
}

export default App;