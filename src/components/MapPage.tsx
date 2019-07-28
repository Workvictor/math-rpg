import React from "react";
import styled from "styled-components";

import src from "./Map/img/northshire.jpg";
import { Map } from "./Map";
import { INpc } from "./Spot";
import { Button } from "./Button";
import {PlayerFrame} from "./PlayerFrame";

const northshire = {
  src,
  name: "Northshire"
};

const Half = styled.div`
  height: 50%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  padding: 16px;
  height: 100%;
`;

export const MapPageContext = React.createContext<{
  selected?: INpc;
  onSelect: (npc: INpc) => void;
}>({ onSelect: () => null });

export const MapPage = () => {
  const [selected, setSelected] = React.useState<INpc>();
  const onSelect = (npc: INpc) => {
    setSelected(npc);
  };
  return (
    <MapPageContext.Provider
      value={{
        selected: undefined,
        onSelect
      }}
    >
      <Wrapper>
        <Half>
          <Map map={northshire} />
        </Half>
        <Half>
          {selected && (
            <Content>
              <div>test</div>
              <Button>Атаковать</Button>
            </Content>
          )}
          <PlayerFrame />
        </Half>
      </Wrapper>
    </MapPageContext.Provider>
  );
};
