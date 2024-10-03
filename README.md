# 思い出ノートWeb版
学内で行われているビジネスチャレンジプロジェクトに採択されたことから開発を進めている。
モバイル版も物メンバーが並行して開発している。（https://github.com/wataru55/AITOTO）

## 開発ルール

### 1. ブランチ運用

2 種類のブランチ ↓↓↓
main / develop からのマージのみ行うブランチ。マージするとすぐに自動デプロイされるため、マージする前にしっかり動作確認をする。
develop / feature での各々の変更をまとめてテストするブランチ。
feature / 作業の内容がわかる名前にする。feature は付けなくて良い。

### 2. コミットメッセージ

コミットメッセージの先頭にプレフィックスを付ける。キリの良いところでコミットするように心がける。

`add:`　機能の追加

`fix:`　バグの修正

`update:`　バグ以外の修正(UI 修正等)

`delete:`　機能等の削除
