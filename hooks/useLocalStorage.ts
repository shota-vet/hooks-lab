import react from "react";
import { useState, useEffect } from "react";

const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  // ① 初回読み込み時のみ
  const [value, setValue] = useState<T>(() => {
    const saved = window.localStorage.getItem(key);
    if (saved !== null) return JSON.parse(saved);
    return defaultValue;
  });
  // valueの初期値を設定→元々あるならそれ使い、ないなら渡す
  //   getItemは初回だけ,useStateの中に関数がある場合初回のみ実行、これはlocalStorageアクセスを毎回やっても無駄だから　Age,29というのは初期化処理で初回に一回やればいい）
  // localstorageの中にkeyとvalueを設定しないといけない→ボタンを押した時に設定されるようにする

  // ② ここで初めて上の値がlocalstorageに保存される。また、値が変わったら保存。
  // setValue(80)のボタンが押されたら１の部分は初回のみなので実行されずここからスタート、ここで初めてkeyとvalueをセットする
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  // ③ stateと同じ形で返す
  return [value, setValue];
};

export default useLocalStorage;

// window.localStorage.setItem("age", "29");
// window オブジェクトの中のlocalStorage オブジェクトのsetItem というメソッドを呼んでいる.window省略可能。

// JSON.stringify(obj);　「JSON形式の文字列に変換する」　window.JSON.stringify(obj);と同じ
// localStorage,API送信、ファイル保存など文字列しか保存できない場所に保存する時に文字列に変換して保存する。

// localStorageとはログイン情報、フォーム入力値、設定情報、ダークモード設定などを文字列で保存している。

// localStorage の主なメソッド一覧
// メソッド	役割
// setItem(key, value)	保存
// getItem(key)	取得
// removeItem(key)	削除
// clear()	全削除
// key(index)	キー取得
// length	保存数

// 🔥 windowとは？
// ブラウザそのもの
// イメージ：
// window = {
//   fetch: function,
//   alert: function,
//   localStorage: {...},
//   document: {...},
//   console: {...},
//   setTimeout: function,
// }

// window
//  ├─ document　今表示されているHTMLのページ
//  ├─ localStorage
//  ├─ console
//  ├─ fetch　fetch はブラウザ環境では window の中にある関数
//  ├─ alert
//  └─ location

// windowは一番外側。

// ③ localStorageは何をしている？

// localStorageは：

// ページをリロードしたときのための保険

// 流れ
// ① setAge(80)

// state = 80

// 再レンダー

// useEffect → localStorageに "80" 保存

// ② ただの再レンダー

// state は 80 のまま

// localStorageは関係ない

// ③ ブラウザをリロード

// Reactのstateは消える

// useState初期化関数が実行される

// localStorageから "80" を読む

// 初期値80になる
