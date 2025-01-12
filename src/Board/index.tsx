import "./index.css";

import classnames from "classnames";
import React, { type CSSProperties, MouseEventHandler, useState } from "react";
import { useSnapshot } from "valtio";

import { Chain } from "../Chain";
import { CardState, DECK_ZONE, HAND_ZONE, store } from "../store";

const BoardBgRow: React.FC<{ isExtra?: boolean; highlight?: boolean }> = ({
  isExtra = false,
  highlight = false,
}) => (
  <div className="block-row">
    {Array(isExtra ? 2 : 5)
      .fill(null)
      .map((_, idx) => (
        <div
          key={idx}
          className={classnames("block", {
            "block-extra": isExtra,
          })}
          style={
            {
              "--highlight-on": highlight ? 1 : 0,
            } as any
          }
        ></div>
      ))}
  </div>
);

const CARD_IMG_URL_BASE = "../src/assets//";
const CARD_CODE = 26077387;
const CARD_COVER_URL = "../src/assets//cover.jpeg";

const BoardBg: React.FC = () => (
  <div id="board-bg">
    <BoardBgRow />
    <BoardBgRow />
    <BoardBgRow isExtra highlight />
    <BoardBgRow />
    <BoardBgRow />
  </div>
);

const Card: React.FC<{
  code: number;
  r?: number;
  c?: number;
  h?: number;
  defense?: boolean;
  facedown?: boolean;
  opponent?: boolean;
  hand?: boolean;
  highlight?: boolean;
  fly?: boolean;
  chained?: boolean;
  transTime?: number;
  focus?: boolean;
  onClick?: MouseEventHandler<{}>;
  style?: CSSProperties;
}> = ({
  code,
  r = 0,
  c = 0,
  h = 1,
  defense = false,
  facedown = false,
  opponent = false,
  hand = false,
  highlight = false,
  fly = false,
  chained = false,
  transTime = 0.3,
  focus = false,
  onClick,
  style = {},
}) => {
  return (
    <div
      className={classnames("card", {
        "card-defense": defense,
        fly,
      })}
      style={
        {
          "--h": focus ? 100 : h,
          "--r": r,
          "--c": c,
          "--shadow": h > 0 ? 1 : 0,
          "--opponent-deg": opponent ? "180deg" : "0deg",
          "--is-hand": hand || focus ? 1 : 0,
          "--trans-time": `${transTime}s`,
          "--highlight-on": highlight ? 1 : 0,
          "--scale-focus": focus ? 2.5 : 1,
          "--card-img": facedown
            ? `url(${CARD_COVER_URL})`
            : `url(${CARD_IMG_URL_BASE + code + ".jpg"})`,
          ...style,
        } as any
      }
      onClick={onClick}
    >
      {chained ? <Chain /> : <></>}
    </div>
  );
};

export const Board: React.FC = () => {
  const snap = useSnapshot(store);

  const mapState = (state: CardState, sequence: number) => {
    return { inner: state, sequence };
  };

  const cards = snap.magics
    .map(mapState)
    .concat(snap.monsters.map(mapState))
    .concat(snap.deck.map(mapState))
    .concat(snap.hands.map(mapState));
  cards.sort((a, b) => a.inner.id - b.inner.id);

  const [focus, setFocus] = useState(false);

  return (
    <>
      <div id="controller">
        <button onClick={() => store.move()}>A1</button>
        <button onClick={() => store.move(true)}>A2</button>
        <button onClick={() => (store.modalVisible = !snap.modalVisible)}>
          A3
        </button>
        <button onClick={() => setFocus((prev) => !prev)}>A4</button>
      </div>
      <div id="life-bar-container">
        <div id="life-bar">8000</div>
        <div id="life-bar">8000</div>
      </div>
      <div id="camera">
        <div id="board">
          <BoardBg />
          {cards.map((card) => (
            <Card
              key={card.inner.id}
              code={CARD_CODE}
              r={
                card.inner.zone == DECK_ZONE || card.inner.zone == HAND_ZONE
                  ? card.inner.zone - 1
                  : card.inner.zone
              }
              c={card.inner.zone == DECK_ZONE ? -1 : card.sequence}
              defense={card.inner.defense}
              facedown={card.inner.zone == DECK_ZONE}
              hand={card.inner.zone == HAND_ZONE}
              highlight={card.inner.effect}
              chained={card.inner.chained}
              onClick={() => {
                alert(`card-${card.inner.id} is clicked!`);
              }}
            />
          ))}
          <Card
            code={CARD_CODE}
            r={focus ? 2 : 0}
            c={focus ? 2 : 0}
            focus={focus}
          />
        </div>
      </div>
    </>
  );
};
