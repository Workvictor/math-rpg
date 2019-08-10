import React from "react";
import styled from "styled-components";
import { Howl } from "howler";

import bg1 from "./img/bg1.jpg";
import { Button } from "../components/Button";
import { Border } from "../components/layout/Border";
import { Rythm } from "../components/layout/Rythm";

const Bg = styled.div`
  height: 250px;
  width: 100%;
  background-image: url(${bg1});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: inset 0 0 30px #000, inset 0 0 10px #000, inset 0 0 20px #000;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledBorder = styled(Border)`
  height: 250px;
`;

// const mainTitle = new Howl({
//   src: ["music/01._Legends_of_Azeroth_(Main_Title).mp3"],
//   loop: true
// });

export const MainScreen = () => {
  React.useEffect(() => {
    // mainTitle.play();
    // Howler.volume(0.25);
  }, []);
  return (
    <Wrapper>
      <Rythm>
        <Border>
          <Bg />
        </Border>
      </Rythm>
      <StyledBorder>
        <div>Добро пожаловать в игру</div>
        <Button to={"/map"}>Продолжить</Button>
      </StyledBorder>
    </Wrapper>
  );
};
