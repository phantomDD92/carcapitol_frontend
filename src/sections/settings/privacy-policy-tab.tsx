export function PrivacyPolicyTab() {
  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-500">
        Effective Date: September 19, 2019
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-medium">Privacy Policy</h2>

        <p className="text-sm text-gray-600">
          This Privacy Policy describes how Car Capitol collects, uses, and
          shares your personal information when you use our website and
          services.
        </p>

        <div className="space-y-4">
          <section>
            <h3 className="font-medium mb-2">Information We Collect</h3>
            <p className="text-sm text-gray-600">
              We collect information that you provide directly to us,
              information we collect automatically when you use our services,
              and information we receive from other sources.
            </p>
            <div className="mt-2 space-y-2">
              <div>
                <h4 className="text-sm font-medium text-gray-700">
                  Information You Provide
                </h4>
                <p className="text-sm text-gray-600">
                  This includes information you provide when creating an
                  account, listing a vehicle, making a purchase, or contacting
                  our support team.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">
                  Automatically Collected Information
                </h4>
                <p className="text-sm text-gray-600">
                  When you use our services, we automatically collect certain
                  information about your device and how you interact with our
                  services.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-medium mb-2">How We Use Your Information</h3>
            <p className="text-sm text-gray-600">
              We use the information we collect to provide, maintain, and
              improve our services, to process your transactions, communicate
              with you, and comply with legal obligations.
            </p>
          </section>

          <section>
            <h3 className="font-medium mb-2">Information Sharing</h3>
            <p className="text-sm text-gray-600">
              We may share your information with:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-sm text-gray-600">
              <li>Service providers who assist in our operations</li>
              <li>Professional advisers and financial institutions</li>
              <li>Law enforcement when required by law</li>
              <li>
                Other users when you choose to share your profile or listing
                information
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-medium mb-2">Your Rights and Choices</h3>
            <p className="text-sm text-gray-600">
              You have certain rights regarding your personal information,
              including the right to access, correct, or delete your personal
              information, and the right to opt-out of certain data processing
              activities.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
