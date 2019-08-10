import styled from "styled-components";

import { Button } from "./Button";

export const IconButton = styled(Button)`
  margin: 1px;
  width: 32px;
  height: 32px;
  & .inner {
    padding: 2px;
    height: 26px;
    width: 26px;
  }
`;
