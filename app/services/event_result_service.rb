class EventResultService
  def initialize(track, round, wind_cancellation: false)
    @track = track
    @event = round.event
    @task = round.discipline.to_sym
    @wind_cancellation = wind_cancellation
  end

  def calculate
    points = subtract_wind(track_points) if @wind_cancellation

    track_segment = WindowRangeFinder.new(track_points).execute(
      from_altitude: @event.range_from,
      to_altitude: @event.range_to)

    track_segment.public_send(@task)
  rescue WindowRangeFinder::ValueOutOfRange
    return 0
  end

  private

  attr_reader :track

  def subtract_wind(points)
    wind_data = WindCancellation::WindData.new(@event.place.weather_data)
    points = WindCancellation::WindSubtraction.new(points, wind_data).execute
  end

  def track_points
    @track_points ||= PointsQuery.execute(
      track,
      trimmed: true,
      only: %i[gps_time altitude latitude longitude]
    )
  end
end
