import styled from "styled-components";
import img from '../../assets/images/auth-bg.jpg';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  height: 100vh;
  background-image: url(${img});
  background-position: center;
  object-fit: cover;
`;
