# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160408143117) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "factors", force: :cascade do |t|
    t.text    "name"
    t.string  "type"
    t.integer "project_id"
  end

  add_index "factors", ["project_id"], name: "index_factors_on_project_id", using: :btree

  create_table "groups", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.string   "members",     default: [], array: true
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ideas", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "project_id"
  end

  add_index "ideas", ["project_id"], name: "index_ideas_on_project_id", using: :btree

  create_table "projects", force: :cascade do |t|
    t.string  "name"
    t.integer "user_id"
    t.integer "group_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string  "name"
    t.text    "description"
    t.integer "user"
    t.text    "members"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "name"
  end

  add_foreign_key "factors", "projects"
  add_foreign_key "ideas", "projects"
end
