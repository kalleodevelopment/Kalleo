import React from 'react';

const CompletedMessage = () => (
  <div className="common__vertical-center">
    <div className="registration__step-container">
      <h1 className="common__h1 registration-completed__h1">
        Thank you for registering your caller ID information!
      </h1>
      <p className="registration-completed__p">
        You will no longer hear the register message when calling kalleo users.
      </p>
      <span className="registration-completed__divider" />
      <p className="registration-completed__p">
        Do you want to block spam and identify EVERY incoming call?
        <br />
        <br />
        Download the&nbsp;
        <a
          className="registration-completed__a"
          href="https://www.kalleoapp.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          kalleo app
        </a> for free:
        <div className="registration-completed__download-btns">
          <a
            href="https://itunes.apple.com/us/app/kalleo/id1287274374"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt="Download from the Apple app store"
              className="registration-completed__download-btn"
              src="/images/download-apple.svg"
              style={{ float: 'left' }}
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.kalleonative"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt="Download from Google Play"
              className="registration-completed__download-btn"
              src="/images/download-google.svg"
              style={{ float: 'right' }}
            />
          </a>
        </div>
      </p>
    </div>
  </div>
);

export default CompletedMessage;
