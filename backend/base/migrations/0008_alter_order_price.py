# Generated by Django 5.0.6 on 2024-12-31 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_alter_order_size'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='price',
            field=models.CharField(max_length=5),
        ),
    ]
