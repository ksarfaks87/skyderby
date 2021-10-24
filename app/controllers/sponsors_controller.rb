class SponsorsController < ApplicationController
  include SponsorableLoading

  before_action :set_sponsor, only: [:destroy]

  def new
    @sponsor = Sponsor.new

    respond_to do |format|
      format.js
    end
  end

  def create
    @sponsor = @sponsorable.sponsors.new sponsor_params

    if @sponsor.save
      @sponsor
    else
      respond_with_error
    end
  end

  def destroy
    if @sponsor.destroy
      respond_to do |format|
        format.js
        format.json { head :no_content }
      end
    else
      respond_with_error
    end
  end

  private

  def respond_with_error
    respond_to do |format|
      format.js { render template: 'errors/ajax_errors', locals: { errors: @sponsor.errors } }
      format.json { render json: @sponsor.errors, status: :unprocessible_entry }
    end
  end

  def set_sponsor
    @sponsor = Sponsor.find(params[:id])
  end

  def sponsor_params
    params.require(:sponsor).permit(:name, :website, :logo, :event_id)
  end
end
