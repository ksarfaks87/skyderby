class ApplicationController < ActionController::Base
  include DeviseOverrides
  include AuthorizationErrorHandling

  include SetCurrentRequestDetails

  include Pundit
  include MobileFormatOverride
  include ConditionalGet

  include ProtectFromForgery
  include Internationalization

  include CurrentAnnouncements

  layout :layout_by_resource

  def layout_by_resource
    if devise_controller?
      'sessions'
    else
      'application'
    end
  end
end
