import React from "react";
import Navbar from "./Navbar";

function TermsandCondition() {
  return (
    <div className="flex flex-col justify-center gap-6">
      <Navbar />
      <div className="flex flex-col justify-center items-center ">
        <p className="text-[22px] font-medium tracking-wide underline text-emerald-700">
          Terms & Conditions
        </p>
        <div className="w-full flex justify-between px-8 py-6">
          <div className="w-[600px] flex flex-col gap-2 tracking-wider">
            <p className="text-[18px] text-center font-medium text-emerald-500">App Usage</p>
            <p>1. By downloading, installing, or using the App, you acknowledge that you have read, understood, and agree to these Terms and our Privacy Policy.</p>
            <p>2. The App is not a substitute for professional medical advice. Always consult a healthcare provider for medical concerns.</p>
            <p>3. The App does not diagnose, treat, cure, or prevent any disease. Users should consult medical professionals before making health decisions.</p>
            <p>4. The health data provided by the App may include errors due to device malfunction or incorrect input.</p>
            <p>5. You are responsible for the accuracy of the information you provide in the App.</p>
            <p>6. Do not use the App for unlawful, harmful, or fraudulent purposes.</p>
            <p>7. Ensure that any connected IoT devices are functioning properly for accurate data collection.</p>
          </div>

          <div className="w-[600px] flex flex-col gap-2 tracking-wider">
            <p className="text-center text-[19px] font-medium text-emerald-500">Data & Liability</p>
            <p>1. By using the App, you agree to the collection and processing of health-related data in accordance with our Privacy Policy.</p>
            <p>2. Data collected may include health metrics, demographic information, and medical history.</p>
            <p>3. We use security measures like encryption to protect your data. All data is processed and stored securely.</p>
            <p>4. The App aggregates data from IoT devices and applies machine learning for predictive health analysis, but it should not be relied on as the sole basis for health-related decisions.</p>
            <p>5. The App uses blockchain technology for secure and transparent health data validation. Blockchain transactions are irreversible and cannot be modified once validated.</p>
            <p>6. The App is provided "as-is" with no warranties or representations regarding the accuracy or reliability of the data or services provided.</p>
            <p>7. We are not liable for any damages resulting from the use of the App, including health-related outcomes or device malfunctions.</p>
          </div>
        </div>

        <div className="w-full flex justify-between px-8 py-6">
          <div className="w-[600px] flex flex-col gap-2 tracking-wider">
            <p className="text-[18px] text-center font-medium text-emerald-500">Third-Party Services & Termination</p>
            <p>1. The App may integrate with third-party services, but we are not responsible for their data practices. Review their terms and conditions before using them with the App.</p>
            <p>2. We reserve the right to modify these Terms at any time. Continued use of the App after changes constitutes acceptance of the new Terms.</p>
            <p>3. We reserve the right to suspend or terminate access to the App for any violation of these Terms.</p>
            <p>4. These Terms are governed by the laws of [Your Country/State]. Any disputes will be handled by the courts of [Your Country/State].</p>
          </div>

          <div className="w-[600px] flex flex-col gap-2 tracking-wider">
            <p className="text-center text-[19px] font-medium text-emerald-500">Contact Information</p>
            <p>If you have any questions or concerns about these Terms, please contact us at [Your Contact Information].</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsandCondition;
