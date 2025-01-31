##
# Required interface for this concern:
# - track_owner
# - track_visibility
# - track_comment
# - competitor - profile and suit will be filled to track from competitor
module AcceptsNestedTrack
  extend ActiveSupport::Concern

  included do
    attr_accessor :track_attributes, :track_from

    after_commit :enque_jobs

    before_validation :create_track_from_file

    def self.validate_duplicates_on_file_with(validator)
      define_method(:duplication_on_file_validator) { validator }
    end

    validate_duplicates_on_file_with NullDuplicatesValidator
  end

  class NullDuplicatesValidator
    def self.call(*_args)
      false
    end
  end

  private

  def create_track_from_file # rubocop:disable Metrics/AbcSize
    return if track_from != 'from_file'

    if track_attributes&.fetch(:file).blank?
      errors.add(:base, :track_file_blank)
      throw(:abort)
    end

    track_file = Track::File.create(file: track_attributes[:file])

    check_duplicates_for track_file

    params = track_attributes.merge(
      owner: track_owner,
      kind: track_activity,
      track_file_id: track_file.id,
      profile_id: competitor.profile_id,
      suit_id: competitor.suit_id,
      visibility: tracks_visibility,
      comment: track_comment
    ).except(:file)

    self.track = CreateTrackService.call(params)
  end

  def enque_jobs
    ResultsJob.perform_later track_id
    OnlineCompetitionJob.perform_later track_id
  end

  def check_duplicates_for(track_file)
    has_duplicates = duplication_on_file_validator.call(self, track_file)
    throw(:abort) if has_duplicates
  end
end
