import * as Styled from "./styles.ts";

export const getPaymentStatus = (isPaid: boolean) => {
  return isPaid ? (
    <Styled.PaymentStatusWrapper isPaid={true}>Paid</Styled.PaymentStatusWrapper>
  ) : (
    <Styled.PaymentStatusWrapper isPaid={false}>Not Paid</Styled.PaymentStatusWrapper>
  );
};
