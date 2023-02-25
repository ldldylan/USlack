class ApplicationController < ActionController::API
    # Requests are created on the frontend and processed on the backend. So their keys should be converted from camelCase to snake_case. You'll do this by using a before_action controller filter to transform the keys in your params before you hit any controller actions. Head to app/controllers/application_controller.rb and add the following:
    include ActionController::RequestForgeryProtection
    protect_from_forgery with: :exception

    before_action :snake_case_params, :attach_authenticity_token

    rescue_from StandardError, with: :unhandled_error
    rescue_from ActionController::InvalidAuthenticityToken,
        with: :invalid_authenticity_token


    # for phase 2 testing only:
    # skip_before_action :verify_authenticity_token 
    def current_user
        # user whose `session_token` == token in `session` cookie
        @current_user ||= User.find_by(session_token: session[:session_token]) 
    end
    
    def login!(user)
        # reset `user`'s `session_token` and store in `session` cookie
        @current_user = user
        session[:session_token] = user.reset_session_token!
    end

    def logout!
        # reset the `current_user`'s session cookie, if one exists
        # clear out token from `session` cookie
        @current_user.reset_session_token! if @current_user
        session[:session_token] = nil
        @current_user = nil # so that subsequent calls to `current_user` return nil
    end
    
    def require_logged_in
        unless current_user
            render json: { message: 'Unauthorized' }, status: :unauthorized 
        end
    end
    
    # def test
    #     if params.has_key?(:login)
    #         login!(User.first)
    #     elsif params.has_key?(:logout)
    #         logout!
    #     end
        
    #     if current_user
    #         render json: { user: current_user.slice('id', 'username', 'session_token') }
    #     else
    #         render json: ['No current user']
    #     end
    # end

    private
    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end

    def attach_authenticity_token
        # debugger
        headers['X-CSRF-Token'] = masked_authenticity_token(session)
    end

    def invalid_authenticity_token
        render json: { message: 'Invalid authenticity token' }, 
        status: :unprocessable_entity
    end
    
    def unhandled_error(error)
        if request.accepts.first.html?
            raise error
        else
            @message = "#{error.class} - #{error.message}"
            @stack = Rails::BacktraceCleaner.new.clean(error.backtrace)
            render 'api/errors/internal_server_error', status: :internal_server_error
            
            logger.error "\n#{@message}:\n\t#{@stack.join("\n\t")}\n"
        end
    end
end

