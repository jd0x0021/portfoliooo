import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { Button } from '~/components/Button';
import { DecoderText } from '~/components/DecoderText';
import { Divider } from '~/components/Divider';
import { Heading } from '~/components/Heading';
import { Icon } from '~/components/Icon';
import { Input } from '~/components/Input';
import { Section } from '~/components/Section';
import { Text } from '~/components/Text';
import { tokens } from '~/components/ThemeProvider/theme';
import { Transition } from '~/components/Transition';
import { useFormInput } from '~/hooks/useFormInput';
import { baseMeta } from '~/utils/meta';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import styles from './contact.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description:
      'Send me a message if you’re interested in discussing a project or if you just want to say hi',
  });
};

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

const resetFormInputFields = formData => {
  formData.email.onReset();
  formData.message.onReset();
  formData.honey.onReset();
};

export const Contact = ({ id, visible, sectionRef }) => {
  const errorRef = useRef();
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState(null);

  const formData = {
    email: useFormInput(''),
    message: useFormInput(''),
    honey: useFormInput(''),
  };

  const initDelay = tokens.base.durationS;

  const sendEmail = async form => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    try {
      const options = { publicKey: publicKey };
      await emailjs.sendForm(serviceId, templateId, form.current, options);
      setFormIsSubmitted(true);
    } catch (error) {
      alert(`Failed to send message.\n\n${error}`);
    }
  };

  const handleFormSubmit = (form, formData) => {
    if (!form.current) return;

    const formHasErrors = getFormInputErrors(formData);

    if (formHasErrors) {
      setFormErrors(formHasErrors);
    } else {
      setFormErrors(null);
      sendEmail(form);
    }
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
            // unstable_viewTransition
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
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText text="Say hello" delay={300} />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
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
              style={getDelay(tokens.base.durationXS, initDelay)}
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
              style={getDelay(tokens.base.durationS, initDelay)}
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
              //   data-sending={sending}
              style={getDelay(tokens.base.durationM, initDelay)}
              //   disabled={sending}
              //   loading={sending}
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

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
