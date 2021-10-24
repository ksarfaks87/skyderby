class ProfilesController < ApplicationController
  before_action :set_profile, only: %i[edit update destroy]

  def index
    authorize Profile

    @profiles =
      Profile
      .includes(:country, :owner)
      .search(params[:search])
      .order(:name)
      .paginate(page: params[:page], per_page: 25)

    respond_to do |format|
      format.html
      format.js
      format.json
    end
  end

  def show
    profile = Profile.includes(:badges, :country).find(params[:id])
    authorize profile

    @profile = Profiles::Overview.new(profile)

    respond_to do |format|
      format.html
    end
  end

  def edit
    authorize @profile

    respond_to do |format|
      format.html
    end
  end

  def update
    authorize @profile

    if @profile.update profile_params
      respond_to do |format|
        format.html { redirect_to @profile }
        format.json { @profile }
      end
    else
      respond_to do |format|
        format.html { redirect_to edit_profile_path(@profile) }
        format.json { render json: @profile.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    authorize @profile

    respond_to do |format|
      if @profile.destroy
        format.html { redirect_to profiles_path }
        format.js
      else
        format.html { render :show }
        format.js do
          render template: 'errors/ajax_errors',
                 locals: { errors: @profile.errors },
                 status: :unprocessable_entity
        end
      end
    end
  end

  private

  def set_profile
    @profile = Profile.find(params[:id])
  end

  def profile_params
    params.require(:profile).permit(:name, :userpic, :country_id)
  end
end
