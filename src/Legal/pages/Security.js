import React from "react";
import Container from "../components/Container";

const Security = (props) => {
  return (
    <>
      <Container heading="Security">
        <h3>Transactions</h3>
        <p>For Chipp all transactions are handled by our payment gateway</p>
        <p>
          We use one of the most trusted payment gateway out there to ensure
          that your data is never misused
        </p>
        <p>
          Chipp does not store any of your sensitive data. Our payment gateway
          have invested heavily in industry-standard infrastructure to ensure
          that your private data is not compromised.
        </p>
        <h3>PCI DSS and ISO:27001 compliant</h3>
        <p>
          The PCI Council is a global body that sets compliance rules for
          managing cardholder data for all online payment systems. ISO is an
          organization with a membership of 164 national standards bodies.
        </p>
        <h3>Secure and encrypted communication</h3>
        <p>
          We use the highest assurance SSL/TLS certificate, which makes sure
          that no unauthorised person can access your sensitive payment data
          over the internet.
        </p>
        <h3>
          Payment made by credit/debit cards issued in other
          countries?
        </h3>
        <p>
          We currently dont accept any payment from foreign donation but will
          introduce this service when our platform scales in near future.
        </p>
        <h3>Personal information</h3>
        <p>We store your phone number, mail and name only when you are signing up with us.</p>
      </Container>
    </>
  );
};

export default Security;
