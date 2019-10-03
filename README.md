# README

## usersテーブル
|Column  |Type        |Options|
|--------|------------|-------|
|name    |string(15) |null: false, unique: true, index: true|
|email   |string(255)|null: false, unique: true             |
|password|string(255)|null: false, unique: true             |

### Association
- has_many :groups, through: :groups_users
- has_many :groups_users
- has_many :messages


## groupsテーブル
|Column  |Type        |Options|
|--------|------------|-------|
|name    |string(255)|null: false|

### Association
- has_many :users, through: :groups_users
- has_many :users
- has_many :messages

## groups_usersテーブル
|Column  |Type      |Options|
|--------|----------|-------|
|user_id |references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column  |Type        |Options|
|--------|------------|-------|
|content |string      |                              |
|image   |string      |                              |
|user_id |references  |null: false, foreign_key: true|
|group_id|references  |null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
