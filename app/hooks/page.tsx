"use client";

import SomeChild from "@/components/SomeChild";
import { useState, useMemo, useCallback } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
const Hooks = () => {
  // use Memo
  // 値をブラウザのメモリに保存できる、重い処理に使うけど使う、メモリ圧迫するので使う場所考える
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);
  const square = useMemo(() => {
    let i = 0;
    while (i < 200000) {
      i++;
    } //重い処理がここにあると際レンダー時に毎回これをするのでラグくなる。関係のない動作の時は毎回実行したくないのでuseMemoで重い処理をwrapする。
    console.log("クリックされました");
    return count02 * count02;
  }, [count02]);
  //count02が依存関係　関係ないものが変わった時はメモリに保存されていた前の値をそのまま使う。
  //今回squareが返すのは計算結果の数値 square= number　square()ではない

  // useCallback 関数のメモ化
  const [counter, setCounter] = useState(0);
  const showCount = useCallback(() => {
    alert("これは重い処理です");
  }, [counter]);
  // counterを依存関係に、conuterが更新された時のみこの関数を実行。useMemoの関数版

  // カスタムフック
  const [age, setAge] = useLocalStorage("age", 29); //第一引数キー、第二value　ローカルストレージにこうやって渡せるhooksを作りたい

  return (
    <div>
      <h1>use Memo</h1>
      <div>カウント１：{count01}</div>
      <div>カウント２:{count02}</div>
      <div>結果：{square}</div>
      <button onClick={() => setCount01(count01 + 1)}>＋</button>
      <button onClick={() => setCount02(count02 + 1)}>＋</button>

      <hr />
      <h1>useCallBack</h1>
      <SomeChild showCount={showCount} />
      {/* useCallbackを使っているので、今回counterが変わらない限り再レンダー時に参照しているshowCount関数も同じ→このコンポーネント自体も毎回レンダリングされることはない */}
      {/* ただしコンポーネント側でReact.memo(SomeChild);とメモ化する必要あり。このコンポーネントに渡している関数をusecallbackを使えばこのコンポーネント自体も再度無駄にレンダリングされることがない */}

      <hr />
      <h1>カスタムフック</h1>
      <p>{age}</p>
      <button onClick={() => setAge(80)}>年齢をセット</button>
    </div>
  );
};
export default Hooks;
