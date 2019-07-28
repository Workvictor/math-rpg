import React from "react";
import styled from "styled-components";
import { Howl, Howler } from "howler";

import bg1 from "./img/bg1.jpg";
import mask from "./img/main-screen-mask.png";
import { Button } from "../components/Button";

const Bg = styled.div`
  height: calc(100% - 325px);
  background-image: url(${bg1});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Mask = styled.div`
  background-image: url(${mask});
  background-position: bottom center;
  background-repeat: repeat-x;
  height: 375px;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const MaskContent = styled.div`
  height: 240px;
  width: 100%;
  position: absolute;
  padding: 0 16px;
  bottom: 0;
  text-align: center;
`;

const mainTitle = new Howl({
  src: ["music/01._Legends_of_Azeroth_(Main_Title).mp3"],
  loop: true
});

export const MainScreen = () => {
  React.useEffect(() => {
    // mainTitle.play();
    // Howler.volume(0.25);
  }, []);
  return (
    <>
      <Bg />
      <Mask>
        <MaskContent>
          <div>Добро пожаловать в World of Warcraft</div>

          <Button to={"/map"}>Продолжить</Button>
        </MaskContent>
      </Mask>
    </>
  );
};
