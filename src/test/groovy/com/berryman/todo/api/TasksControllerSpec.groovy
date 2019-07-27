package com.berryman.todo.api

import com.berryman.todo.api.TasksController
import com.berryman.todo.model.Task
import com.berryman.todo.repository.TaskRepository
import spock.lang.Specification

class TasksControllerSpec extends Specification {

    final TASK_ID = 1
    final ANOTHER_TASK_ID = 2
    final TASK_DESCRIPTION = "the-task-description"
    final ANOTHER_TASK_DESCRIPTION = "another-task-description"
    final IS_TASK_COMPLETE = false
    final ANOTHER_IS_TASK_COMPLETE = true

    final mockTaskRepository = Mock(TaskRepository)

    final tasksController = new TasksController(mockTaskRepository)

    def "findTaskById should return a task with given id"() {

        given:
        final task = buildTask(TASK_ID, TASK_DESCRIPTION, IS_TASK_COMPLETE)
        final taskOptional = Optional.of(task)

        and:
        1 * mockTaskRepository.findById(TASK_ID) >> taskOptional

        when:
        final result = tasksController.findTaskById(TASK_ID)

        then:
        result.getBody().getId() == TASK_ID
        result.getBody().getDescription() == TASK_DESCRIPTION
        result.getBody().isComplete() == IS_TASK_COMPLETE

    }

    def "findAllTasks should return all tasks"() {

        given:
        final task = buildTask(TASK_ID, TASK_DESCRIPTION, IS_TASK_COMPLETE)
        final task1 = buildTask(ANOTHER_TASK_ID, ANOTHER_TASK_DESCRIPTION, ANOTHER_IS_TASK_COMPLETE)

        and:
        1 * mockTaskRepository.findAll() >> [task, task1]

        when:
        final result = tasksController.findAllTasks()

        then:
        result.getBody().get(0).getId() == TASK_ID
        result.getBody().get(0).getDescription() == TASK_DESCRIPTION
        result.getBody().get(0).isComplete() == IS_TASK_COMPLETE
        result.getBody().get(1).getId() == ANOTHER_TASK_ID
        result.getBody().get(1).getDescription() == ANOTHER_TASK_DESCRIPTION
        result.getBody().get(1).isComplete() == ANOTHER_IS_TASK_COMPLETE

    }

    def "addTask should add a task and return it if successful"() {

        given:
        final task = buildTask(TASK_ID, TASK_DESCRIPTION, IS_TASK_COMPLETE)

        and:
        1 * mockTaskRepository.save(task) >> task

        when:
        final result = tasksController.addTask(task)

        then:
        result.getBody().getId() == TASK_ID
        result.getBody().getDescription() == TASK_DESCRIPTION
        result.getBody().isComplete() == IS_TASK_COMPLETE

    }

    def "updateTask should update a task and return it if successful"() {

        given:
        final task = buildTask(TASK_ID, TASK_DESCRIPTION, IS_TASK_COMPLETE)
        final task1 = buildTask(TASK_ID, ANOTHER_TASK_DESCRIPTION, ANOTHER_IS_TASK_COMPLETE)
        final taskOptional = Optional.of(task)

        and:
        1 * mockTaskRepository.findById(TASK_ID) >> taskOptional
        1 * mockTaskRepository.save(_ as Task) >> task1

        when:
        final result = tasksController.updateTask(TASK_ID, task1)

        then:
        result.getBody().getId() == TASK_ID
        result.getBody().getDescription() == ANOTHER_TASK_DESCRIPTION
        result.getBody().isComplete() == ANOTHER_IS_TASK_COMPLETE

    }

    def buildTask(id, description, complete) {
        final task = new Task()
        task.setId(id)
        task.setDescription(description)
        task.setComplete(complete)
        return task
    }



}
