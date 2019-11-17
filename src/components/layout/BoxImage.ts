import styled from 'styled-components';
import { Border } from './Border';
import { FullWidth } from './FullWidth';
import { Rythm } from './Rythm';

export const BoxImage = styled(
  Border.withComponent(FullWidth).withComponent(Rythm)
)<{ src?: string }>`
  height: 250px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: inset 0 0 30px #000, inset 0 0 10px #000, inset 0 0 20px #000;
`;
