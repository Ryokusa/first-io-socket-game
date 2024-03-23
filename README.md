# Discord マルチプレイ Activity テスト

Discord Embedded SDK でマルチプレイゲームを作ってみるリポジトリ  
クライアントは Vue.js で作成し、サーバーは Express

## 必要なの

- Node.js
- pnpm

## 開発サーバー立ち上げ

フォルダ直下に.env ファイルを作成し、OAuth2 クライアント ID、クライアントシークレットを記述

```env
VITE_DISCORD_CLIENT_ID=YOUR_DISCORD_CLIENT_ID
VITE_DISCORD_CLIENT_SECRET=YOUR_DISCORD_CLIENT_SECRET
```

以下のコマンドで開発サーバーが立ち上がるので、Discord の`URL Mappings`に登録して実行

```powershell
pnpm install
pnpm dev
```
