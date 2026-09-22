from django.db import models


class Problem(models.Model):
    title = models.CharField(max_length=255)
    image_description = models.TextField(blank=True, default="")

    statement = models.TextField()

    input_description = models.TextField(blank=True, default="")
    output_description = models.TextField(blank=True, default="")
    constraints = models.TextField(blank=True, default="")

    topic = models.CharField(max_length=100, default="Array & Hashing")
    points = models.IntegerField(default=500)

    difficulty = models.CharField(
        max_length=20,
        choices=[
            ("easy", "Easy"),
            ("medium", "Medium"),
            ("hard", "Hard"),
        ],
        default="easy",
    )

    status = models.CharField(
        max_length=20,
        choices=[
            ("Active", "Active"),
            ("Draft", "Draft"),
            ("Archived", "Archived"),
        ],
        default="Active",
    )

    examples = models.JSONField(default=list, blank=True)
    subtasks = models.JSONField(default=list, blank=True)
    hints = models.TextField(blank=True, default="")
    author_name = models.CharField(max_length=255, default="FySet Team", blank=True)

    time_limit = models.FloatField(default=2.0)
    memory_limit = models.IntegerField(default=256)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"#{self.id} {self.title}"


class TestCase(models.Model):
    problem = models.ForeignKey(
        Problem,
        on_delete=models.CASCADE,
        related_name="testcases",
    )

    input_data = models.TextField()
    expected_output = models.TextField()

    points = models.IntegerField(default=100)
    is_hidden = models.BooleanField(default=False)
    order = models.IntegerField(default=1)
    is_sample = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.problem.title} - Test {self.id}"


class Submission(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("RUNNING", "Running"),
        ("AC", "Accepted"),
        ("WA", "Wrong Answer"),
        ("TLE", "Time Limit Exceeded"),
        ("RE", "Runtime Error"),
        ("CE", "Compilation Error"),
    ]

    LANGUAGE_CHOICES = [
        ("cpp", "C++"),
        ("python", "Python 3"),
        ("java", "Java"),
        ("javascript", "JavaScript"),
    ]

    problem = models.ForeignKey(
        Problem,
        on_delete=models.CASCADE,
        related_name="submissions",
    )

    source_code = models.TextField()

    language = models.CharField(
        max_length=20,
        choices=LANGUAGE_CHOICES,
        default="cpp",
    )

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="PENDING",
    )

    score = models.IntegerField(default=0)
    max_score = models.IntegerField(default=500)
    passed_tests = models.IntegerField(default=0)
    total_tests = models.IntegerField(default=0)
    test_results = models.JSONField(default=list, blank=True)
    subtasks_result = models.JSONField(default=list, blank=True)
    logs = models.JSONField(default=list, blank=True)

    execution_time = models.FloatField(null=True, blank=True)
    memory_used = models.FloatField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Submission #{self.id} ({self.language}) - {self.status} [{self.score}/{self.max_score} pt]"