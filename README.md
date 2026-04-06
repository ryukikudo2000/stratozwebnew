# 社会保険労務士法人ストラテジー コーポレートサイト

## プロジェクト概要

社会保険労務士法人ストラテジーの公式コーポレートサイトです。
東京都港区元赤坂を拠点に、経営者視点の戦略的人事労務サポートを提供する士業法人のウェブサイトです。

---

## ✅ 実装済み機能

### ページ一覧
| ページ | ファイル | 内容 |
|--------|----------|------|
| ホーム | `index.html` | ヒーロー / ニュース / 業務内容 / 強み / 事務所情報 / CTA |
| 業務内容 | `business.html` | 5サービスの詳細説明＋フロー図 |
| 解決事例 | `cases.html` | 6件のケーススタディ（カテゴリフィルター付き） |
| 費用一覧 | `price.html` | 顧問プラン3種 / スポット料金表 / 給与計算料金表 |
| 事務所紹介 | `about.html` | 理念 / 代表プロフィール / 沿革 / 概要 / アクセス |
| よくある質問 | `qa.html` | アコーディオンUI Q&A 13問 |
| コラム一覧 | `column/index.html` | CMSデータ連動・カテゴリフィルター・検索・最新順 |
| コラム詳細 | `column/post.html?slug=xxx` | slug指定・目次自動生成・関連記事・OGP自動出力 |
| コラム管理 | `admin/column.html` | 記事の投稿・編集・削除・下書き管理CMS |
| お問合せ | `contact.html` | フォーム送信（テーブルAPI保存） / 電話・住所情報 |
| プライバシーポリシー | `privacy.html` | 全9条の個人情報保護方針 |

### 共通コンポーネント
- **共通ヘッダー**：ロゴ / 電話番号 / 受付時間 / CTA / グロナビ
- **モバイルナビ**：ハンバーガーメニュー / スライドイン
- **共通フッター**：サイトマップ / 住所 / プライバシーポリシー
- **Back to Top**：スクロール追従

### インタラクション
- スクロールアニメーション（data-aos）
- アコーディオン（Q&Aページ）
- カテゴリフィルター（解決事例・コラム）
- お問合せフォーム送信・バリデーション（REST API連携）
- カウンターアニメーション
- モバイルヘッダー自動スクロール隠し

---

## 🗂️ ファイル構成

```
/
├── index.html          # ホームページ
├── business.html       # 業務内容
├── cases.html          # 解決事例
├── price.html          # 費用一覧
├── about.html          # 事務所紹介
├── qa.html             # よくある質問
├── column.html         # コラム・お知らせ
├── contact.html        # お問合せフォーム
├── privacy.html        # プライバシーポリシー
├── css/
│   └── style.css       # メインスタイルシート
└── js/
    └── main.js         # JavaScript（全機能）
```

---

## 📱 対応状況

| 画面サイズ | 対応 |
|------------|------|
| デスクトップ（1200px以上） | ✅ |
| タブレット（768〜1024px） | ✅ |
| スマートフォン（〜768px） | ✅ |
| 小型端末（〜480px） | ✅ |

---

## 🔗 機能エントリポイント（URI・パラメータ）

| URI | 内容 |
|-----|------|
| `index.html` | トップページ |
| `business.html` | 業務内容一覧 |
| `business.html#risk` | リスクコンサルティング |
| `business.html#ipo` | IPO支援 |
| `business.html#outsourcing` | 人事労務アウトソーシング |
| `business.html#dispatch` | 派遣・職業紹介許可申請 |
| `business.html#subsidy` | 助成金サポート |
| `cases.html` | 解決事例一覧 |
| `price.html` | 費用一覧 |
| `price.html#advisor-fee` | 顧問料金表 |
| `about.html` | 事務所紹介 |
| `qa.html` | Q&A |
| `column/index.html` | コラム一覧（カテゴリフィルター・検索） |
| `column/post.html?slug={slug}` | コラム記事詳細 |
| `admin/column.html` | コラム管理CMS（管理者専用） |
| `contact.html` | お問合せフォーム |
| `privacy.html` | プライバシーポリシー |

---

## 🗄️ データモデル（テーブルAPI）

### columns テーブル（コラム記事）
| フィールド | 型 | 説明 |
|------------|-----|------|
| id | text | UUID（自動） |
| slug | text | URL用英数字識別子（例: labor-risk-2026） |
| title | text | 記事タイトル |
| excerpt | text | 抜粋（一覧・OGP用 120文字程度） |
| body | rich_text | 本文HTML |
| category | text | カテゴリ slug（law / risk / ipo / outsourcing / subsidy / hr / notice） |
| category_label | text | カテゴリ表示名 |
| eyecatch_url | text | アイキャッチ画像URL（省略可） |
| eyecatch_icon | text | 代替 Font Awesome クラス |
| published_date | text | 公開日 YYYY-MM-DD |
| status | text | published / draft |
| featured | bool | 注目記事フラグ（一覧トップ表示） |
| tags | text | タグ（カンマ区切り） |
| meta_title | text | SEO title（省略時は title を使用） |
| meta_desc | text | SEO description（省略時は excerpt を使用） |

### inquiries テーブル（お問合せ）
| フィールド | 型 | 説明 |
|------------|-----|------|
| id | text | 自動UUID |
| name | text | お名前（必須） |
| company | text | 会社名（任意） |
| email | text | メールアドレス（必須） |
| tel | text | 電話番号（任意） |
| category | text | お問合せ種別（必須） |
| message | rich_text | お問合せ内容（必須） |
| created | datetime | 送信日時 |

---

## 🎨 デザインシステム

| 項目 | 値 |
|------|-----|
| プライマリカラー | #1a3a6b（ネイビーブルー） |
| アクセントカラー | #c8972b（ゴールド） |
| フォント | Noto Sans JP / Noto Serif JP |
| アイコン | Font Awesome 6 |

---

## 📧 メール送信通知の設定手順（Formspree）

お問合せフォームの送信通知・自動返信は **[Formspree](https://formspree.io/)** を使用しています。  
以下の手順で設定を完了してください。

### Step 1 — Formspree アカウント作成・フォーム作成

1. [https://formspree.io/](https://formspree.io/) にアクセス
2. 無料アカウントを作成（月50件まで無料）
3. 「+ New Form」をクリックしてフォームを作成
4. フォーム名（例: `STRATOZ Contact`）を入力して作成

### Step 2 — 送信先メールアドレスの設定

1. 作成したフォームの **Settings > Email Notifications** を開く
2. **「To:」** に以下3名を追加：
   - `takeuchi@stratoz.jp`
   - `kudo@stratoz.jp`
   - `umemura@stratoz.jp`
3. **「Subject:」** を以下に設定：
   ```
   【Stratoz】お問い合わせがありました
   ```

### Step 3 — 問い合わせした側への自動返信メール

1. Formspree ダッシュボードで **Plugins**（または **Settings > Auto-Response / Auto-Responder**）を開く
2. **Auto-Response（自動返信）** をオンにする
3. **送信先メールアドレスのフィールド** に **`email`** を指定する（`contact.html` から JSON で `email` として送っているため）
4. **「Subject:」** を例えば次のように設定：
   ```
   お問い合わせありがとうございます｜Stratoz
   ```
5. 本文は送信データの **`_autoresponse`** が使われる（ダッシュボードでテンプレート指定の場合はそちらが優先されることがあります）
6. **Reply-To** は **`_replyto`** も送信しているため、返信先は問い合わせ者のメールになります

※ 自動返信機能は Formspree のプランによって利用可否が異なります。利用できない場合はプランの確認が必要です。

### Step 4 — エンドポイントURLをサイトに設定

1. Formspree ダッシュボードの **Integration** タブから Form Endpoint URL を取得
   - 形式: `https://formspree.io/f/xxxxxxxx`
2. `contact.html` を開き、`<form>` タグの `data-formspree` 属性を更新：
   ```html
   <!-- 変更前 -->
   <form id="contact-form" novalidate
     data-formspree="https://formspree.io/f/YOUR_FORM_ID">
   
   <!-- 変更後（xxxx部分を実際のIDに置き換え） -->
   <form id="contact-form" novalidate
     data-formspree="https://formspree.io/f/xwvndayk">
   ```

### 送信データの内容

| 項目 | 内容 |
|------|------|
| 送信先 | takeuchi@stratoz.jp / kudo@stratoz.jp / umemura@stratoz.jp（3名同時） |
| 件名 | 【Stratoz】お問い合わせがありました |
| 本文 | 送信日時・会社名・お名前・メールアドレス・電話番号・お問合せ内容 |
| 自動返信件名 | お問い合わせありがとうございます｜Stratoz |
| バックアップ保存 | テーブルAPI（`tables/inquiries`）にも自動保存 |

---

## ⏳ 未実装・今後の推奨対応

1. **Formspreeフォームの作成とエンドポイント設定** — 上記「メール送信通知の設定手順」を参照
2. **OGP画像（images/ogp.jpg）の追加** — SNSシェア時のサムネイル
3. **ファビコン（favicon.ico）の追加**
4. **コラム詳細ページ**の作成（現在は記事カードのみ）
5. **Google Analytics / GTMの設置**
6. **Google検索コンソール用sitemap.xml**の作成
7. **実際の地図URL**の反映（現在はダミー座標）

---

## 📞 事務所情報

- **法人名**: 社会保険労務士法人ストラテジー
- **所在地**: 〒107-0051 東京都港区元赤坂1-2-7 赤坂Kタワー4F
- **電話**: 03-6890-3248
- **受付時間**: 平日 9:00〜18:00
- **定休日**: 土・日・祝・年末年始

---

*最終更新: 2025年12月*
