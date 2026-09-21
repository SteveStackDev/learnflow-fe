from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('judge', '0004_submission_fields'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='problem',
            name='code',
        ),
        migrations.RemoveField(
            model_name='problem',
            name='slug',
        ),
        migrations.AddField(
            model_name='problem',
            name='image_description',
            field=models.TextField(blank=True, default=''),
        ),
    ]
