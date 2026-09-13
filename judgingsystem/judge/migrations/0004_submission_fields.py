from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('judge', '0003_problem_subtasks'),
    ]

    operations = [
        migrations.AlterField(
            model_name='submission',
            name='language',
            field=models.CharField(
                choices=[
                    ('cpp', 'C++'),
                    ('python', 'Python 3'),
                    ('java', 'Java'),
                    ('javascript', 'JavaScript'),
                ],
                default='cpp',
                max_length=20,
            ),
        ),
        migrations.AddField(
            model_name='submission',
            name='score',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='submission',
            name='max_score',
            field=models.IntegerField(default=500),
        ),
        migrations.AddField(
            model_name='submission',
            name='passed_tests',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='submission',
            name='total_tests',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='submission',
            name='test_results',
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name='submission',
            name='subtasks_result',
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name='submission',
            name='logs',
            field=models.JSONField(blank=True, default=list),
        ),
    ]
