// Data
import { contactData } from "../../constants/mockContact";
// Styles
import styles from "./Contact.module.css";
// Components
import ContactHero from "./components/ContactHero/ContactHero";
import ContactFeatures from "./components/ContactFeatures/ContactFeatures";
import ContactMain from "./components/ContactMain/ContactMain";
import ContactChannels from "./components/ContactChannels/ContactChannels";
import ContactFaq from "./components/ContactFaq/ContactFaq";
import { useScrollReveal } from "~/hooks/useScrollReveal";

function Contact() {
  useScrollReveal();

  return (
    <div className={styles.contactpage}>
      {/* Ambient Background Glow Orbs */}
      <div className={styles["contactpage__orb-1"]} />

      {/* 1. Hero Section */}
      <ContactHero />

      {/* 2. Feature Section */}
      <ContactFeatures topics={contactData.topics} />

      {/* 3. Contact Form & Info Section */}
      <ContactMain info={contactData.info} />

      {/* 4. Specialized Channels Section */}
      <ContactChannels departments={contactData.departments} />

      {/* 5. FAQ Section */}
      <ContactFaq faqs={contactData.faqs} />
    </div>
  );
}

export default Contact;
