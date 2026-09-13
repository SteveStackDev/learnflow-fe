from django.contrib import admin

from .models import Problem, TestCase, Submission


@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "difficulty",
        "time_limit",
        "memory_limit",
        "created_at",
    )

    list_filter = ("difficulty",)
    search_fields = ("title", "slug")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(TestCase)
class TestCaseAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "problem",
        "is_sample",
    )

    list_filter = ("is_sample",)
    search_fields = ("problem__title",)


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "problem",
        "language",
        "status",
        "execution_time",
        "memory_used",
        "created_at",
    )

    list_filter = (
        "status",
        "language",
    )

    search_fields = (
        "source_code",
        "problem__title",
    )

    readonly_fields = (
        "created_at",
    )