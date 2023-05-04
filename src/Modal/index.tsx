import "./index.css";

import React from "react";

export const Modal: React.FC = () => (
  <div className="card-modal">
    <div className="card-modal-container">
      <img src="../src/assets//26077387.jpg" width={200} />
      <div className="card-modal-name">闪刀姬-零衣</div>
      <div className="card-modal-attribute">【 战斗族 / 效果】【暗】</div>
      <div className="card-modal-atk">ATL/1500 DEF/1500</div>
      <div className="card-modal-effect">
        这个卡名的①②的效果1回合各能使用1次。
        ①：把这张卡解放才能发动。从额外卡组把1只「闪刀姬」怪兽在额外怪兽区域特殊召唤。这个效果在对方回合也能发动。
        ②：这张卡在墓地存在的状态，自己场上的表侧表示的「闪刀姬」连接怪兽因对方的效果从场上离开的场合或者被战斗破坏的场合才能发动。这张卡特殊召唤。
      </div>
    </div>
  </div>
);
