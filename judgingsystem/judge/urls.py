from django.urls import path

from .views import (
    problem_list_create,
    problem_detail_update_delete,
    problem_toggle_status,
    problem_stats,
    submit_code,
    run_sample,
    submission_detail,
    submission_list,
    judge_system_status,
)


urlpatterns = [
    # Problem Management REST APIs
    path("problems/", problem_list_create, name="problem_list_create"),
    path("problems/<str:id_or_slug>/", problem_detail_update_delete, name="problem_detail_update_delete"),
    path("problems/<int:problem_id>/toggle-status/", problem_toggle_status, name="problem_toggle_status"),
    path("stats/", problem_stats, name="problem_stats"),
    path("system-status/", judge_system_status, name="judge_system_status"),

    # Submission & Judge APIs
    path("submit/", submit_code, name="submit_code"),
    path("run-sample/", run_sample, name="run_sample"),
    path("submissions/<int:submission_id>/", submission_detail, name="submission_detail"),
    path("submissions/", submission_list, name="submission_list"),
]