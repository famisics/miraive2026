# ui-next-template

Turborepo モノレポ構成の Next.js + Hono フルスタックテンプレートです。

## 機能

- **Next.js 15 (App Router)** — React 19 ベースのフロントエンド、Turbopack 開発サーバー
- **Hono API** — Cloudflare Workers / Next.js 内蔵の両形式に対応した軽量 API
- **型安全な RPC** — `hc<AppType>` による API クライアントの型推論
- **Turborepo** — インクリメンタルビルドとキャッシュによる高速モノレポ管理
- **Drizzle ORM** — Turso (SQLite) と Supabase (PostgreSQL) の切り替え可能な DB 対応
- **microCMS** — ヘッドレス CMS との統合
- **Tailwind CSS v4 + shadcn/ui** — モダンなコンポーネントベーススタイリング
- **セキュリティヘッダー** — HSTS、X-Frame-Options、Permissions-Policy などをミドルウェアで設定

## 必要条件

- **Bun** v1.3.6 以上 (パッケージマネージャー)
- **Node.js** v20 以上
- **[ni](https://github.com/antfu/ni)** — パッケージマネージャー非依存コマンド (推奨)

外部サービス (いずれか使用するものを設定):

- [Turso](https://turso.tech/) — SQLite クラウドデータベース
- [Supabase](https://supabase.com/) — PostgreSQL クラウドデータベース
- [microCMS](https://microcms.io/) — ヘッドレス CMS

## インストール方法

```bash
# リポジトリをクローン
git clone https://github.com/famisics/ui-next-template.git
cd ui-next-template

# 依存関係をインストール
ni

# 環境変数を設定
cp .env.example .env
# .env を編集して必要な値を入力
```

## 環境変数

`.env.example` をコピーして `.env` を作成し、使用するサービスの値を設定してください。

| 変数名 | 説明 | 必須 | デフォルト |
|--------|------|:----:|-----------|
| `NEXT_PUBLIC_APP_URL` | アプリケーションの公開 URL | 任意 | `http://localhost:3000` |
| `TURSO_DATABASE_URL` | Turso LibSQL の接続 URL | Turso 使用時必須 | — |
| `TURSO_AUTH_TOKEN` | Turso 認証トークン | Turso 使用時必須 | — |
| `SUPABASE_DATABASE_URL` | Supabase PostgreSQL の接続 URL | Supabase 使用時必須 | — |
| `MICROCMS_SERVICE_DOMAIN` | microCMS サービスドメイン | CMS 使用時必須 | — |
| `MICROCMS_API_KEY` | microCMS API キー | CMS 使用時必須 | — |

## 使い方

### 開発サーバーの起動

```bash
nr dev          # 全プロジェクト (Web + API) を並列起動
nr web:dev      # Web のみ起動 (http://localhost:51002)
nr api:dev      # API のみ起動 (http://localhost:8787)
```

### ビルド

```bash
nr build        # 全プロジェクトをビルド
```

### デプロイ

```bash
nr web:vercel:deploy    # Web を Vercel へデプロイ
nr web:workers:deploy   # Web を Cloudflare Workers へデプロイ (OpenNext.js)
```

## 開発用コマンド

```bash
nr ci           # 品質チェック一括実行 (lint:fix + typecheck + format)
nr lint         # ESLint チェック
nr lint:fix     # ESLint 自動修正
nr typecheck    # TypeScript 型チェック
nr format       # Prettier コード整形
```

### データベース操作

各パッケージディレクトリ (`packages/db-turso/` または `packages/db-supabase/`) 内で実行:

```bash
nr db:generate  # スキーマ変更から migration を生成
nr db:push      # スキーマを DB へ直接反映 (Turso のみ)
nr db:migrate   # マイグレーションを実行 (Supabase のみ)
nr db:studio    # Drizzle Studio を起動 (DB GUI)
```

## API エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| `GET` | `/health` | ヘルスチェック |
| `GET` | `/users` | ユーザー一覧取得 |
| `GET` | `/users/:id` | ユーザー詳細取得 |
| `POST` | `/users` | ユーザー作成 |
| `PUT` | `/users/:id` | ユーザー更新 |
| `DELETE` | `/users/:id` | ユーザー削除 |

## CI/CD

GitHub Actions で `main` ブランチへの push/PR 時に自動実行:

1. Bun のセットアップとキャッシュ
2. `bun install --frozen-lockfile`
3. `bun run ci` (lint:fix + typecheck + format)

## 参考リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Hono ドキュメント](https://hono.dev/)
- [Drizzle ORM ドキュメント](https://orm.drizzle.team/)
- [Turborepo ドキュメント](https://turbo.build/repo/docs)
- [shadcn/ui ドキュメント](https://ui.shadcn.com/)
