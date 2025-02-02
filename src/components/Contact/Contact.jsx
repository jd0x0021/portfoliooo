import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { Button } from '~/components/Button';
import { DecoderText } from '~/components/DecoderText';
import { Divider } from '~/components/Divider';
import { Heading } from '~/components/Heading';
import { Icon } from '~/components/Icon';
import { Input } from '~/components/Input';
import { Link } from '~/components/Link';
import { Section } from '~/components/Section';
import { Text } from '~/components/Text';
import { tokens } from '~/components/ThemeProvider';
import { Transition } from '~/components/Transition';
import config from '~/config.json';
import { useFormInput } from '~/hooks/useFormInput';
import { useToggleText } from '~/hooks/useToggleText';
import { getDelay } from '~/utils/delay';
import { cssProps, msToNum } from '~/utils/style';
import styles from './contact.module.css';

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const INITIAL_DELAY = tokens.base.durationS;
const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Get all specific errors from the input fields in the contact form.
 * Return null if the contact form does not have any errors.
 *
 * @param {*} formData (all the input elements' values that are in the contact form)
 * @returns null or an object that stores all specific form input field errors
 */
const getFormInputErrors = formData => {
  // form data is invalid if it's filled out by a bot
  if (formData.honey.value) return null;

  const formInputErrors = {};

  // invalid message
  if (!formData.message.value) {
    formInputErrors.message = 'Please enter a message.';
  } else if (formData.message.value.length > MAX_MESSAGE_LENGTH) {
    formInputErrors.message = `Message must be shorter than ${MAX_MESSAGE_LENGTH} characters.`;
  }

  // invalid email
  if (!formData.email.value || !EMAIL_PATTERN.test(formData.email.value)) {
    formInputErrors.email = 'Please enter a valid email address.';
  } else if (formData.email.value.length > MAX_EMAIL_LENGTH) {
    formInputErrors.email = `Email address must be shorter than ${MAX_EMAIL_LENGTH} characters.`;
  }

  return Object.keys(formInputErrors).length === 0 ? null : formInputErrors;
};

/**
 * Reset all the contact form's input fields to its default value.
 *
 * @param {*} formData (all the input elements' values that are in the contact form)
 */
const resetFormInputFields = formData => {
  Object.values(formData).forEach(input => {
    input.onReset();
  });
};

/**
 * Copy my email to clipboard.
 *
 * @param {string} email
 * @param {Function} successIndicator - A callback function (with no parameters) to be executed upon success.
 */
const copyEmailToClipboard = (email, successIndicator) => {
  navigator.clipboard.writeText(email);
  successIndicator(); // show a copy success indicator
};

export const Contact = ({ id, visible, sectionRef }) => {
  const errorRef = useRef();
  const copyEmail = useToggleText('Copy my email', 'Email copied!');

  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [formIsSending, setFormIsSending] = useState(false);
  const [formErrors, setFormErrors] = useState(null);

  const formData = {
    email: useFormInput(),
    message: useFormInput(),
    honey: useFormInput(),
  };

  /**
   * Send an email based on the inputs extracted from the contact form.
   * Our email's content will be based on that extracted data.
   *
   * @param {React.RefAttributes<HTMLFormElement>} form
   */
  const sendEmail = async form => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    try {
      const options = { publicKey: publicKey };
      // The input fields' name attribute are the ones
      // that will be mapped into our emailJS template.
      await emailjs.sendForm(serviceId, templateId, form.current, options);
      setFormIsSubmitted(true);
    } catch (error) {
      alert(`Failed to send message.\n\n${error}`);
    }
  };

  /**
   * This is the code flow that's executed when we click on the send button in our contact form.
   *
   * @param {React.RefAttributes<HTMLFormElement>} form
   * @param {*} formData (all the input elements' values that are in the contact form)
   * @returns
   */
  const handleFormSubmit = async (form, formData) => {
    if (!form.current) return;

    // show loader (when we submit the contact form)
    setFormIsSending(true);

    const formHasErrors = getFormInputErrors(formData);

    if (formHasErrors) {
      // show specific form errors
      setFormErrors(formHasErrors);
    } else {
      setFormErrors(null);
      await sendEmail(form);
    }

    // hide loader (after contact form is successfully submitted)
    setFormIsSending(false);
  };

  return (
    <Section
      className={styles.contact}
      as="section"
      ref={sectionRef}
      id={id}
      tabIndex={-1}
    >
      <Transition unmount in={visible && !formIsSubmitted} timeout={0}>
        {({ status, nodeRef }) => (
          <form
            id="contact-form"
            className={styles.form}
            ref={nodeRef}
            onSubmit={e => {
              e.preventDefault();
              handleFormSubmit(nodeRef, formData);
            }}
          >
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, INITIAL_DELAY, 0.3)}
            >
              <DecoderText text="Say hello" delay={300} />

              <Text
                className={styles.tooltipContainer}
                size="s"
                as="p"
                onClick={() =>
                  copyEmailToClipboard(config.email, copyEmail.toggleThenResetText)
                }
              >
                <span className={styles.tooltip}>{copyEmail.text}</span>
                <span>reach me at </span>
                <Link>{config.email}</Link>
              </Text>
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, INITIAL_DELAY, 0.4)}
            />
            {/* Hidden honeypot field to identify bots */}
            <Input
              className={styles.botkiller}
              label="Name"
              name="name"
              maxLength={MAX_EMAIL_LENGTH}
              {...formData.honey}
            />
            <Input
              required
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationXS, INITIAL_DELAY)}
              autoComplete="email"
              label="Your email"
              type="email"
              name="user_email"
              maxLength={MAX_EMAIL_LENGTH}
              {...formData.email}
            />
            <Input
              required
              multiline
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationS, INITIAL_DELAY)}
              autoComplete="off"
              label="Message"
              name="user_message"
              maxLength={MAX_MESSAGE_LENGTH}
              {...formData.message}
            />
            <Transition unmount in={formErrors} timeout={msToNum(tokens.base.durationM)}>
              {({ status: errorStatus, nodeRef }) => (
                <div
                  className={styles.formError}
                  ref={nodeRef}
                  data-status={errorStatus}
                  style={cssProps({
                    height: errorStatus ? errorRef.current?.offsetHeight : 0,
                  })}
                >
                  <div className={styles.formErrorContent} ref={errorRef}>
                    <div className={styles.formErrorMessage}>
                      <Icon className={styles.formErrorIcon} icon="error" />
                      {Object.values(formErrors).map((error, index) => (
                        <span key={index}>{error}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Transition>
            <Button
              className={styles.button}
              data-status={status}
              data-sending={formIsSending}
              style={getDelay(tokens.base.durationM, INITIAL_DELAY)}
              disabled={formIsSending}
              loading={formIsSending}
              loadingText="Sending..."
              icon="send"
              type="submit"
            >
              Send message
            </Button>
          </form>
        )}
      </Transition>

      <Transition unmount in={formIsSubmitted}>
        {({ status, nodeRef }) => (
          <div className={styles.complete} aria-live="polite" ref={nodeRef}>
            <Heading
              level={3}
              as="h3"
              className={styles.completeTitle}
              data-status={status}
            >
              Message Sent
            </Heading>
            <Text
              size="l"
              as="p"
              className={styles.completeText}
              data-status={status}
              style={getDelay(tokens.base.durationXS)}
            >
              I’ll get back to you within a couple days, sit tight.
            </Text>
            <Button
              secondary
              iconHoverShift
              className={styles.completeButton}
              data-status={status}
              style={getDelay(tokens.base.durationM)}
              onClick={() => {
                setFormIsSubmitted(false);
                resetFormInputFields(formData);
              }}
              type="reset"
              icon="chevron-right"
            >
              Send another message
            </Button>
          </div>
        )}
      </Transition>
    </Section>
  );
};
