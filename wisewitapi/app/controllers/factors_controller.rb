class FactorsController < ApplicationController
    before_action :find_factor, only: [:show, :update, :destroy]
    # before_action :authenticate_request!
    # before_action :authenticate
    # this feature will be open to anyone before signed in for now.
    def index
      @factor = Factor.all
      render json: @factor
    end

    def create

      @factor = Factor.new(factor_params)

      if @factor.save
        render json: @factor
      else
        render json: @factor.errors, status: :unprocessable_entity
      end

    end

    def show
      render json: @factor
    end

    def update
      if @factor.update(factor_params)
        render json: @factor
      else
        render json: @factor.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @factor.destroy
    end

    private

    def factor_params
      params.require(:factor).permit(:name, :category, :project_id)
    end

    def find_factor
      @factor = Factor.find(params[:id])
    end

end
