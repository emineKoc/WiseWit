class IdeasController < ApplicationController
    before_action :find_idea, only: [:show, :update, :destroy]
    # before_action :authenticate_request!
    # before_action :authenticate
    # this feature will be open to anyone before signed in for now.
    def index
      @ideas = Idea.all
      render json: @ideas
    end

    def create

      @idea = Idea.new(idea_params)
      if @idea.save
        render json: @idea
      else
        render json: @idea.errors, status: :unprocessable_entity
      end

    end

    def show
      render json: @idea
    end

    def update
      if @idea.update(idea_params)
        render json: @idea
      else
        render json: @idea.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @idea.destroy
    end

    private

    def idea_params
      params.require(:idea).permit(:name, :project_id)
    end

    def find_idea
      @idea = Idea.find(params[:id])
    end

end
