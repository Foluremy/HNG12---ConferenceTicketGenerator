import React, { useState } from "react";
import "./TicketSelection.css"; 
import NavIcon from '../../images/NavIcon.png';
import ticz from '../../images/ticz.png';
import AttendeeForm from "../AttendeeForm/AttendeeForm";

const TicketSelection = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [error, setError] = useState(""); 
  const [showAttendeeForm, setShowAttendeeForm] = useState(false);

  const tickets = [
    { type: "Free", price: "Free", access: "REGULAR ACCESS", available: "20/52" },
    { type: "VIP", price: "$150", access: "VIP ACCESS", available: "20/52" },
    { type: "VVIP", price: "$150", access: "VVIP ACCESS", available: "20/52" },
  ];

  // Handle "Next" button click
  const handleNext = () => {
    if (!selectedTicket) {
      setError("Please select a ticket type before proceeding."); // Set error message
    } else {
      setError(""); // Clear error message
      setShowAttendeeForm(true); // Show AttendeeForm
    }
  };

  // Handle "Back" button in AttendeeForm
  const handleBack = () => {
    setShowAttendeeForm(false); // Hide AttendeeForm and show TicketSelection
  };


  return (
    <div className="ticket-body">
      <div className="header">
        <div className="logo">
          <div className="nav-logo">
            <img className="nav-icon" src={NavIcon} alt="logo"></img>
          </div>
          <img className="ticz" src={ticz} alt="logo"></img>
        </div>
        <div className="header-list">
          <a href="#">Events</a>
          <a href="#">My Tickets</a>
          <a href="#">About Project</a>
        </div>
        <button className="my-tickets-btn">MY TICKETS →</button>
      </div>
      
      <div className="container">
        {!showAttendeeForm ? (
          <>
            <div className="ticket-heading">
              <div className="ticket-title">
                <div className="heading">
                  <p className="heading-content">Ticket Selection</p>
                </div>
                <div className="text">
                  <p>Step 1/3</p>
                </div>
              </div>
              <div className="progress-container">
                <div className="progress-bar" />
              </div>
            </div>
            <div className="ticket-box">
              <div className="event-details">
                <h3 className="techember">Techember  Fest  "25</h3>
                <p className="txt">Join us for an unforgettable experience at <br></br><strong>[Event Name]</strong>! Secure your spot now.</p>
                <p className="txt">📍 [Event Location]  ||  March 15, 2025  |  7:00 PM</p>
              </div>
              <div className="hr"></div>
              <div className="ticket-options">
                <p>Select Ticket Type:</p>
                <div className="tickets">
                  {tickets.map((ticket, index) => (
                    <button
                      key={index}
                      className={`ticket-card ${selectedTicket === ticket.type ? "selected" : ""}`}
                      onClick={() => setSelectedTicket(ticket.type)}
                    >
                      <span className="price">{ticket.price}</span>
                      <span className="access">{ticket.access}</span>
                      <span className="availability">{ticket.available}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="ticket-quantity">
                <label htmlFor="ticket-count" className="ticket-num">Number of Tickets</label>
                <br></br>
                <select
                  className="ticket-quant"
                  id="ticket-count"
                  value={ticketCount}
                  onChange={(e) => setTicketCount(Number(e.target.value))}
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                  ))}
                </select>
              </div>

              {/* Error Message */}
              {error && <p className="error">{error}</p>}

              <div className="buttons">
                <button className="cancel" onClick={() => setSelectedTicket(null)}>Cancel</button>
                <button className="next" onClick={handleNext}>Next</button>
              </div>
            </div>
          </>
        ) : (
          // Render AttendeeForm if showAttendeeForm is true
          <AttendeeForm
            selectedTicket={selectedTicket}
            ticketCount={ticketCount}
            onBack={() => setShowAttendeeForm(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default TicketSelection;