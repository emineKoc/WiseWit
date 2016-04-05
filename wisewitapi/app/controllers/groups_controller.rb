class GroupsController < ApplicationController
    before_action :find_group, only: [:show, :update,:destroy]

    before_action :authenticate

    def index
      @groups = Group.all
      render json: @groups
    end

    def create

      @group = Group.new(group_params)

      if @group.save
        render json: @group
      else
        render json: @group.errors, status: :unprocessable_entity
      end

    end

    def show
      @group = Group.find(params[:id])
      render json: @group
    end

    def update
      if @group.update(task_params)
        render json: @group
      else
        render json: @group.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @group.destroy
    end

    private

    def group_params
      params.require(:group).permit(:name, :description, :members)
    end

    def find_group
      @team = Group.find(params[:id])
    end

end
