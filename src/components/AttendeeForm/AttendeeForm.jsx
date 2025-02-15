import React, { useState } from "react";
import "./AttendeeForm.css";
import cloudIcon from "../../images/cloudIcon.png"
import { MdEmail } from "react-icons/md";
import GeneratedTicket from "../GeneratedTicket/GeneratedTicket.jsx"

const AttendeeForm = ({onBack, onSubmit, initialValues}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    specialRequest: '',
    avatarUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showGeneratedTicket, setShowGeneratedTicket] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!validateEmail(formData.email)) newErrors.email = "Invalid email format.";
    if (!formData.specialRequest.trim()) newErrors.specialRequest = "Special request is required.";
    if (!formData.avatarUrl) {
        newErrors.avatar = 'Profile photo is required';
      }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; 
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; 

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Log the error response
        console.error('Cloudinary API error:', errorData);
        throw new Error(errorData.error.message || 'Upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };;

  const handleFileUpload = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors({ ...errors, avatar: 'Please upload an image file' });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, avatar: 'File size should be less than 5MB' });
      return;
    }

    try {
      setIsUploading(true);
      const imageUrl = await uploadToCloudinary(file);
      setFormData({ ...formData, avatarUrl: imageUrl });
      setErrors({ ...errors, avatar: undefined });
    } catch (error) {
      console.error('Upload error:', error);
      setErrors({ ...errors, avatar: 'Failed to upload image'  + error.message});
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (validateForm()) {
      console.log("Form Submitted", formData);
      alert("Ticket generated successfully!");
      setShowGeneratedTicket(true);
    } else {
      console.log("Validation errors:", errors);  
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    await handleFileUpload(file);
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    await handleFileUpload(file);
  };

  // Handle "Back" button click
  const handleBack = () => {
    onBack(); 
  };

  return (
    !showGeneratedTicket ? (
    <>
      <div className="form-heading">
        <div className="form-title">
          <div className="heading">
            <p className="heading-content">Attendee Details</p>
          </div>
          <div className="text">
            <p>Step 2/3</p>
          </div>
        </div>
        <div className="progress-container">
          <div className="progress-bar form-progress" />
        </div>
      </div>

      <div className="ticket-box form-container">
      <form onSubmit={handleSubmit} className="profile-form">
          {/* Upload Section */}
          <div className="upload-section">
            <p className="upload-title">Upload Profile Photo</p>
            <div className="upload-parent">
              <div 
                className={`upload-area ${isDragging ? 'dragging' : ''} ${isUploading ? 'uploading' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
                role="button"
                tabIndex={0}
                aria-label="Upload profile photo"
              >
                <input
                  type="file"
                  id="file-input"
                  onChange={handleFileInput}
                  accept="image/*"
                  style={{ display: 'none' }}
                  aria-describedby="file-input-error"
                />
                {formData.avatarUrl ? (
                  <div className="preview-container">
                    <img 
                      src={formData.avatarUrl} 
                      alt="Profile preview" 
                      className="image-preview"
                    />
                    <div className="upload-overlay">
                      <img src={cloudIcon} className="upload-icon" alt="Upload Icon"/>
                      <p className="upload-text">
                        {isUploading ? 'Uploading...' : 'Drag & drop or click to upload'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <img src={cloudIcon} className="upload-icon" alt="Upload icon" />
                    <p className="upload-text">
                      {isUploading ? 'Uploading...' : 'Drag & drop or click to upload'}
                    </p>
                  </>
                )}
              </div>
            </div>

            {errors.avatar && (
              <span id="file-input-error" className="error-message" role="alert">{errors.avatar}</span>
            )}
          </div>

          <div className="hr"></div>

          {/* Full Name Field */}
          <div className="form-field">
            <label htmlFor="fullName" className="form-label">
                Enter your name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              aria-label="Full name"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && (
              <span id="fullName-error" className="error-message" role="alert">{errors.fullName}</span>
            )}
          </div>
            
          {/* Email Field */}
          <div className="form-field">
            <label htmlFor="email" className="form-label">
                Enter your email*
            </label>
            <div className="input-with-icon">
              <MdEmail className="email-icon" /> {/* Email icon */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="hello@avioflagos.io" 
                  aria-label="Email address"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={errors.email ? 'error' : ''}
                />
            </div>
            {errors.email && (
              <span id="email-error" className="error-message" role="alert">{errors.email}</span>
            )}
          </div>

          {/* Special Request Field */}
          <div className="form-field">
            <label htmlFor="specialRequest" className="form-label">
                Special Request?
            </label>
            <textarea
              id="specialRequest"
              name="specialRequest"
              value={formData.specialRequest}
              onChange={(e) => setFormData({...formData, specialRequest: e.target.value})}
              placeholder="Textarea"
              aria-label="Special request"
              rows={4}
            />
            {errors.specialRequest && (
            <span id="specialRequest-error" className="error-message" role="alert">{errors.specialRequest}</span>
            )}
          </div>

          {errors.submit && (
            <div className="submit-error" role="alert">
              {errors.submit}
            </div>
          )}

          {/* Form Buttons */}
          <div className="form-button buttons">
            <button 
                className="cancel"
                type="button" 
                onClick={handleBack}
                disabled={isUploading}
            >
                Back
            </button>
            <button 
                className="next"
                type="submit"
                disabled={isUploading}
            >
                Get My Free Ticket
            </button>
          </div>

        </form>

      </div>
    </>
    ) : (
      <GeneratedTicket
        attendeeForm={formData} 
        onBack={() => setShowGeneratedTicket(false)}
      />
    )
  );
};
;

export default AttendeeForm;
