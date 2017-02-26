class Order < ApplicationRecord
  has_many :meals
  validates_associated :meals
  validates :restaurant_name, presence: true, length: { minimum: 2 }
  validates :status, inclusion: {in: %w(ordered finalized delivered) }
end
