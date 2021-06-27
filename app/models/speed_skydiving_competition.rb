class SpeedSkydivingCompetition < ApplicationRecord
  enum status: { draft: 0, published: 1, finished: 2, surprise: 3 }
  enum visibility: { public_event: 0, unlisted_event: 1, private_event: 2 }

  belongs_to :responsible, class_name: 'User', inverse_of: :responsible_of_events
  belongs_to :place

  has_many :categories, foreign_key: :event_id, inverse_of: :event, dependent: :restrict_with_error
  has_many :rounds, foreign_key: :event_id, inverse_of: :event, dependent: :restrict_with_error
end
