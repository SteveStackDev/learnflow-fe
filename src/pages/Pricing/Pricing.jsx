import { useState } from "react";
// Data
import { pricingData } from "../../constants/mockPricing";

// Styles
import styles from "./Pricing.module.css";

// Sub-components
import PricingHero from "./components/PricingHero/PricingHero";
import PricingCards from "./components/PricingCards/PricingCards";
import PricingComparison from "./components/PricingComparison/PricingComparison";
import PricingFaq from "./components/PricingFaq/PricingFaq";

function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className={styles.pricingpage}>
      {/* Ambient Background Glow Orbs */}
      <div className={styles["pricingpage__orb-1"]} />
      <div className={styles["pricingpage__orb-2"]} />
      <div className={styles["pricingpage__orb-3"]} />
      <div className={styles["pricingpage__orb-4"]} />

      {/* 1. Header Hero Section */}
      <PricingHero isYearly={isYearly} setIsYearly={setIsYearly} />

      {/* 2. Pricing Cards Section */}
      <PricingCards items={pricingData.items} isYearly={isYearly} />

      {/* 3. Detailed Comparison Section */}
      <PricingComparison comparisons={pricingData.comparisons} />

      {/* 4. FAQ Section */}
      <PricingFaq faqs={pricingData.faqs} />
    </div>
  );
}

export default Pricing;
