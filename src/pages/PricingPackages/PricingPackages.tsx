//styles
import { Grid } from "@mantine/core";
import { SubscriptionCard } from "./components";
import * as Styled from "./styles.ts";

export const PricingPackages = () => {
  return (
    <Styled.Wrapper>
      <Grid gutter={32} justify="center">
        <Grid.Col span={{ base: 4, xl: "content" }}>
          <SubscriptionCard />
        </Grid.Col>
        <Grid.Col span={{ base: 4, xl: "content" }}>
          <SubscriptionCard />
        </Grid.Col>
        <Grid.Col span={{ base: 4, xl: "content" }}>
          <SubscriptionCard />
        </Grid.Col>
      </Grid>
    </Styled.Wrapper>
  );
};
