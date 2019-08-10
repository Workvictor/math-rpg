import React from "react";
import styled from "styled-components";

import { PlayerFrame } from "../PlayerFrame";
import { Button } from "../Button";
import { Border } from "../layout/Border";
import { StatusBar } from "../StatusBar";
import { Npc } from "../../models/Npc";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
`;

const Pool = styled(Wrapper)`
  justify-content: flex-start;
`;

const enemes: Npc[] = [
  new Npc("enemy1", "humanoid", 1),
  new Npc("enemy2", "humanoid", 1),
  new Npc("enemy3", "humanoid", 1)
];

export const SpotPage = () => {
  const [enemyHealthPoints, setEnemyHealthPoints] = React.useState<number>(100);
  const [selectedEnemy, setSelectedEnemy] = React.useState<Npc>();
  const onAttack = () => {
    if (selectedEnemy) {
      console.log("onAttack", selectedEnemy);
      setEnemyHealthPoints(enemyHealthPoints - 1);
    } else {
      console.log("no target", selectedEnemy);
    }
  };
  const onSelectEnemy = (enemy: Npc) => {
    console.log("onSelectEnemy", enemy.name);
    setSelectedEnemy(enemy);
  };
  const onTargetDamage = (damage: number) => {
    if (selectedEnemy) {
      selectedEnemy.receiveDamage(damage);
    }
  };
  return (
    <Wrapper>
      <Pool>
        spotpage
        {enemes.map(enemy => (
          <Border key={enemy.name} onClick={() => onSelectEnemy(enemy)}>
            <div>{enemy.name}</div>
            <div>{enemy.level}</div>
          </Border>
        ))}
      </Pool>
      <div>
        {selectedEnemy && (
          <div>
            <Button onClick={onAttack}>Атаковать</Button>
            {selectedEnemy.name}{" "}
            <StatusBar
              value={selectedEnemy.healthPoints / selectedEnemy.healthPointsMax}
            />
          </div>
        )}
        <div>controls</div>
        <div>spells</div>
      </div>
      <PlayerFrame target={selectedEnemy} onTargetDamage={onTargetDamage} />
    </Wrapper>
  );
};
