class Meal < ApplicationRecord
  validates :name, presence: true, length: { minimum: 2 }
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :order_id, presence: true, numericality: { only_integer: true }
  belongs_to :order
  validates :order, presence: true
  validates :user_id, uniqueness: { scope: :order_id, message: 'only one meal per user in order' }
end
