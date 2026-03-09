// 配列操作まとめ

const numbers: number[] = [1, 2, 3, 4, 5, 6];

// map操作　要素を変換して「新しい配列」を作る（非破壊）
const doubled = numbers.map((n) => n * 2);
console.log("\n[map]");
console.log("numbers:", numbers);
console.log("doubled", doubled);

// filter操作　条件で絞って「新しい配列」を作る（非破壊）
const evenNumbers = numbers.filter((n) => n % 2 === 0);
console.log("\n[filter]");
console.log("evenNumbers", evenNumbers);

// find: 条件に合う「最初の1件」を返す（見つからなければ undefined）
const users = [
  { id: 1, name: "Shota" },
  { id: 2, name: "Masaki" },
  { id: 3, name: "Kei" },
];
const specificUser = users.find((u) => u.id === 2);
console.log("\n[find]");
console.log("specificUser", specificUser);

// reduce: 配列を1つの値にまとめる（合計・集計など）結果の中身を返す
const total = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("\n[reduce]");
console.log("total:", total);
// accは今までの要素の合計、currは現在の要素。初期値は0。最後のaccを返す

// 5) some / every: 条件を満たす要素がある？全て満たす？かどうかを真偽値で返す
const hasEven = numbers.some((n) => n % 2 === 0);
const allPositive = numbers.every((n) => n > 0);
console.log("\n[some/every]");
console.log("hasEven:", hasEven); // someは条件を満たす要素が1つでもあればtrue
console.log("allPositive:", allPositive); // everyは全ての要素が条件を満たす場合にtrue

// 6) includes: 含まれてる？真偽値で返す
console.log("\n[includes]");
console.log("numbers includes 3:", numbers.includes(3));
console.log("numbers includes 99:", numbers.includes(99));

// 7) sort: 並び替え（⚠ 破壊的：元配列を変更する）
const numsToSort = [5, 2, 10, 1];
const sorted = [...numsToSort].sort((a, b) => a - b); // 非破壊にしたいのでコピーしてsort
console.log("\n[sort]");
console.log("before:", numsToSort);
console.log("sorted:", sorted);
// 昇順にするなら a - b、降順なら b - aと書く

// 8) splice vs slice（参考）
// slice: 非破壊で切り取ってコピー　slice(開始、終了index(終了は含まない、終了書かない場合最後まで))
const sliced = numbers.slice(1, 4); // index 1〜3
console.log("\n[slice]");
console.log("sliced(1,4):", sliced); //[2, 3, 4];

// splice: 破壊的に変更（ここでは例としてコピーに対して実行）
// array.splice(開始index, 削除数, 追加要素...)
const numsForSplice = [...numbers];
numsForSplice.splice(2, 2, 999); // index2から2個削除(index2含む)して999を入れる
console.log("\n[splice] (mutates)");
console.log("after splice:", numsForSplice);

// 9) 実務パターン（Reactで超使う：追加・削除・更新）
// 追加（非破壊）
const added = [...numbers, 7];
// 削除（idや値で消す → filter）
const removed = numbers.filter((n) => n !== 3);
// 更新（ある要素だけ置き換える → map）
const updated = numbers.map((n) => (n === 4 ? 400 : n));
console.log("\n[CRUD patterns]");
console.log("added:", added);
console.log("removed (without 3):", removed);
console.log("updated (4 -> 400):", updated);

// join 配列を文字列に変換
const joined = numbers.join(", ");
console.log("\n[join]");
console.log("joined:", joined); // "1, 2, 3, 4, 5, 6"

// split: 文字列を配列に変換 string.split(区切り文字)
const str = "apple,banana,cherry";
const splitted = str.split(",");
console.log("\n[split]");
console.log("splitted:", splitted); // ["apple", "banana", "cherry"]

const sentence = "hello world shota"; //スペースで区切っている場合
const words = sentence.split(" ");
console.log(words);

const str = "abc"; //１文字ずつ分解して配列にする
console.log(str.split("")); //["a", "b", "c"]
// joinとsplitはセットで覚える。文字列を配列に変換して、また文字列に戻すなど。
const original = "1,2,3";

const arr = original.split(",");
const back = arr.join(",");

console.log(back);
// 実務での使い方
// ① CSV処理
const csvLine = "Taro,20,Tokyo";

const data = csvLine.split(",");
// ② タグ入力
const input = "React,TypeScript,Node";

const tags = input.split(",");

// 文字列によく使うメソッド

// joinの逆のsplit以外にもある。

// ① toUpperCase / toLowerCase
"hello".toUpperCase();
console.log("toUpperCase:", "hello".toUpperCase());
// ② trim（前後の空白削除）
"  hello  ".trim();
// ③ includes（文字列にもある）
"hello world".includes("world");
// ④ replace
"hello world".replace("world", "shota");

// 配列の基本操作
// PUSH　最後に追加する
const arr = [1, 2, 3];
arr.push(4);
console.log("push:", arr); // [1, 2, 3, 4]
// POP　最後の要素を削除する
arr.pop();
console.log("pop:", arr); // [1, 2, 3]
// SHIFT　最初の要素を削除する
arr.shift();
console.log("shift:", arr); // [2, 3]
// UNSHIFT　最初に追加する
arr.unshift(0);
console.log("unshift:", arr); // [0, 2, 3]
