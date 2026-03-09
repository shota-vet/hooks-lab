import React from "react";
type Props = {
  showCount: () => void;
};
const SomeChild = ({ showCount }: Props) => {
  return (
    <div>
      <button onClick={showCount}>子コンポーネントのボタン</button>
    </div>
  );
};

export default React.memo(SomeChild);
