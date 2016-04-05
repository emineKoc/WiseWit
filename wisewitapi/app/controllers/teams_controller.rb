class TeamsController < ApplicationController
  before_action :set_team, only: [:show, :update,:destroy]

  before_action :authenticate

  def index
    @teams = Team.all
    render json: @teams
  end

  def create

    @team = Team.new(team_params)

    if @team.save
      render json: @team
    else
      render json: @team.errors, status: :unprocessable_entity
    end

  end

  def show
    @team = Team.find(params[:id])
    render json: @team
  end

  def update
    if @team.update(task_params)
      render json: @team
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @team.destroy
  end

  private

  def team_params
    params.require(:team).permit(:name, :description)
  end

  def set_team
    @team = Team.find(params[:id])
  end


end
