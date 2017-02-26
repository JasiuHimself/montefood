class Order < ApplicationRecord
  has_many :meals
  validates_associated :meals
  validates :restaurant_name, presence: true, length: { minimum: 2 }
  validates :state, inclusion: {in: ['ordered', 'finalized', 'delivered'] }
end
