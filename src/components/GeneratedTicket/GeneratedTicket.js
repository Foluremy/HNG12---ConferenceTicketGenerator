import React, { useState } from "react";
import "../AttendeeForm/AttendeeForm.css";
import "./GeneratedTicket.css"
import bg from "../../images/bg.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const GeneratedTicket = () => {

    // Function to handle PDF download
    const downloadTicketAsPDF = () => {
      const ticketElement = document.getElementById("ticket-container");

      // Use html2canvas to capture the ticket as an image
      html2canvas(ticketElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/png"); // Convert canvas to image
        const pdf = new jsPDF("p", "mm", "a4"); // Create a new PDF
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height

        // Add the image to the PDF
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("ticket.pdf"); // Download the PDF
      });
    };

    return (
        <>
          <div className="ticket-heading form-heading">
            <div className="ticket-title form-title">
               <div className="heading">
                 <p className="heading-content">Ready</p>
               </div>
               <div className="text">
                 <p>Step 3/3</p>
               </div>
            </div>
            <div className="progress-container">
              <div className="progress-bar form-progress"/>
            </div>
            <div className="sub">
              <div className="sub-content">Your Ticket is Booked!</div>
              <div className="sub-text">
                <div>Check your email for a copy or you can {" "}
                <b onClick={downloadTicketAsPDF} style={{ cursor: "pointer" }}>download</b></div>
              </div>
            </div>
          </div>
            
          {/* Ticket Container */}
          <div id="ticket-container"> 
            <img className="img" src={bg} alt="ticket background"></img>
            <div className="inner-container">
              <div className="inner-heading">
                <div className="event-title">Techember Fest ”25</div>
                <div className="address">📍 04 Rumens road, Ikoyi, Lagos</div>
                <div className="address">📅 March 15, 2025 | 7:00 PM</div>
              </div>

              {/* Profile Picture */}
              <div className="inner-img">
                  <img
                    src=""
                    alt="Profile"
                    className="ticket-img"
                  />
              </div>

             {/* Attendee Details */}
              <div className="inner-content">
                <div className="sec">
                  <div className="cell">
                    <div className="label">Enter your name</div>
                    <b className="value"></b>
                  </div>
                  <div className="cell1">
                    <div className="label">Enter your email*</div>
                    <b className="value"></b>
                  </div>
                </div>
                <div className="sec">
                  <div className="cell">
                    <div className="label">Ticket Type:</div>
                    <div className="value2"></div>
                  </div>
                  <div className="cell1">
                    <div className="label">Ticket for:</div>
                    <div className="value2"></div>
                  </div>
                </div>

                <div className="sec2">
                  <div className="label2">Special request?</div>
                  <div className="value3"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Buttons */}
          <div className="ticket-button buttons">
            <button 
                className="cancel"
                type="button"
            >
                Book Another Ticket
            </button>
            <button 
                className="next"
                type="button"
                onClick={downloadTicketAsPDF}
            >
                Download Ticket
            </button>
          </div>
        </>
    );
}

export default GeneratedTicket;