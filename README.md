# Line Mini App Development Environment

このプロジェクトは、Lineミニアプリの開発環境です。LIFF（LINE Front-end Framework）を使用して、LINEアプリ内で動作するWebアプリケーションを開発できます。

## 🚀 機能

- **LIFF SDK統合**: LINE Front-end Frameworkを使用した開発
- **ユーザー認証**: LINEログイン機能
- **プロフィール表示**: ユーザーのプロフィール情報表示
- **メッセージ送信**: LINEチャットへのメッセージ送信機能
- **レスポンシブデザイン**: モバイルファーストのUI
- **開発モード**: LIFF SDKが利用できない環境でのモック機能

## 📁 プロジェクト構造

```
LineMiniApp/
├── index.html          # メインHTMLファイル
├── css/
│   └── style.css      # スタイルシート
├── js/
│   └── app.js         # メインJavaScriptファイル
├── package.json        # 依存関係管理
└── README.md          # このファイル
```

## 🛠️ セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm start
```

または

```bash
npm run dev
```

開発サーバーが起動し、ブラウザで `http://localhost:3000` にアクセスできます。

## 🔧 設定

### LIFF IDの設定

実際のLINEミニアプリとして動作させるには、LIFF IDを設定する必要があります。

1. [LINE Developers Console](https://developers.line.biz/) にアクセス
2. 新しいプロバイダーを作成
3. LINE Loginチャネルを作成
4. LIFFアプリを追加
5. 取得したLIFF IDを `js/app.js` の `liffId` に設定

```javascript
// js/app.js
this.liffId = 'your-liff-id-here';
```

## 🎯 使用方法

### 開発モード

LIFF SDKが利用できない環境（ローカル開発など）では、モック機能が自動的に有効になります。

1. アプリを起動
2. 「モックログイン（開発用）」ボタンをクリック
3. テスト用のプロフィール情報が表示されます

### 本番モード

実際のLINEアプリ内で動作させる場合：

1. LIFF IDを設定
2. LINEアプリ内でミニアプリを開く
3. ログインボタンをクリックしてLINE認証
4. プロフィール情報が表示され、メッセージ送信が可能

## 📱 機能詳細

### 認証機能
- LINEログイン/ログアウト
- ユーザープロフィール取得
- ログイン状態の管理

### UI機能
- モダンなレスポンシブデザイン
- アニメーション効果
- エラーハンドリング
- ステータス表示

### メッセージ機能
- LINEチャットへのメッセージ送信
- LINEアプリ内でのみ動作

## 🎨 カスタマイズ

### スタイルの変更

`css/style.css` を編集してデザインをカスタマイズできます。

### 機能の追加

`js/app.js` の `LineMiniApp` クラスに新しいメソッドを追加して機能を拡張できます。

## 🔍 デバッグ

### ブラウザの開発者ツール

1. F12キーを押して開発者ツールを開く
2. Consoleタブでログを確認
3. NetworkタブでAPI通信を確認

### よくある問題

**LIFF初期化エラー**
- LIFF IDが正しく設定されているか確認
- ネットワーク接続を確認

**ログインエラー**
- LINEアプリ内で実行しているか確認
- ブラウザでは開発モードを使用

## 📚 参考資料

- [LINE Developers Documentation](https://developers.line.biz/docs/)
- [LIFF API Reference](https://developers.line.biz/docs/reference/liff/)
- [LINE Mini App Guidelines](https://developers.line.biz/docs/messaging-api/mini-app/)

## 🤝 貢献

このプロジェクトへの貢献を歓迎します。プルリクエストやイシューの報告をお気軽にお願いします。

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🆘 サポート

問題が発生した場合は、以下を確認してください：

1. 依存関係が正しくインストールされているか
2. 開発サーバーが正常に起動しているか
3. ブラウザのコンソールでエラーメッセージを確認

---

**注意**: このプロジェクトは開発環境用です。本番環境で使用する前に、適切なセキュリティ設定とエラーハンドリングを追加してください。 