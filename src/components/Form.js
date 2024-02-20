
"use client"


import React, { useState } from 'react';
import "./form.component.css" 

export default function Form() {
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const formData = new FormData();
    formData.append("your-name", form.name.value);
    formData.append("your-email", form.email.value);
    formData.append("your-subject", form.subject.value);
    formData.append("your-message", form.message.value);
    formData.append("_wpcf7_unit_tag", "your_non_empty_value"); 

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // Handle successful form submission
        setSubmissionStatus('success');
        console.log("Form submitted successfully");
      } else {
        
        setSubmissionStatus('error');
        console.error("Error submitting form");
      }
    } catch (error) {
      
      setSubmissionStatus('error');
      console.error("Error submitting form", error);
    }
  };

  return (
    <>
      <div className="alert-container">
          {submissionStatus === 'success' && (
            <div className="success-alert">Form submitted successfully!</div>
          )}
          {submissionStatus === 'error' && (
            <div className="error-alert">Error submitting form. Please try again.</div>
          )}
       </div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Fullname</label>
          <input id="name" name="name" type="text" required />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input id="subject" name="subject" type="text" required />
        </div>
        <div>
          <label htmlFor="message">message </label>
          <textarea id="message" name="message"></textarea>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}