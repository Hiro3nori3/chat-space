# DB設計

## usersテーブル
|column|type|option|
|:-:|:-:|:-:|
|name|string|NOT NULL, unique true|
|email|string|NOT NULL, unique true|
|password|integer|NOT NULL|

## アソシエーション
has_many :messages  
has_many :groups, through: :group_users  
has_many :group_users

---

## messagesテーブル
|column|type|option|
|:-:|:-:|:-:|
|body|text||
|image|text||
|group_id|references|foreign_key: true|
|user_id|references|foreign_key: true|

## アソシエーション
belongs_to :user  
belongs_to :group

---

## groupsテーブル
|column|type|option|
|:-:|:-:|:-:|
|name|string||

## アソシエーション

has_many :messages  
has_many :group_users  
has_many :users, through: :group_users

---

## group_usersテーブル
|column|type|option|
|:-:|:-:|:-:|
|group_id|references|foreign_key: true|
|user_id|references|foreign_key: true|

## アソシエーション

belongs_to :user  
belongs_to :group
