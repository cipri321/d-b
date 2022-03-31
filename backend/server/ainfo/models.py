from django.db import models

# Create your models here.
class Example(models.Model):
    id=models.AutoField(primary_key=True)

class Year_of_study(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40)
    degree = models.CharField(max_length=40)
    faculty_id = models.ForeignKey(Faculty, on_delete=models.Cascade)
    enrolled = models.ManyToManyField(Student_details, through='Enrollment')

class Course(models.Model):
    types = [
        ('O', 'Optional'),
        ('N', 'Not Optional'),
        ]
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40)
    optional = models.CharField(max_length=1, choices=types)
    students = models.ManyToManyField(Student_details, through='Optional_preferences')

class Curriculum(models.Model):
    id = models.AutoField(primary_key=True)
    year_of_study_id = models.ForeignKey(Year_of_study, on_delete=models.Cascade)
    courses = models.ManyToManyField(Course, through='Curriculum_course')

class Optional_preferences(models.Model):
    id = models.AutoField(primary_key=True)
    priority = models.IntegerField()
    student_id = models.ForeignKey(Student_details, on_delete=models.Cascade)
    course_id = models.ForeignKey(Course, on_delete=models.Cascade)

class Curriculum_course(models.Model):
    id = models.AutoField(primary_key=True)
    curriculum_id = models.ForeignKey(Curriculum, on_delete=models.Cascade)
    course_id = models.ForeignKey(Course, on_delete=models.Cascade)

class Enrollment(models.Model):
    id = models.AutoField(primary_key=True)
    student_id = models.ForeignKey(Student_details, on_delete=models.Cascade)
    year_of_study_id = models.ForeignKey(Year_of_study, on_delete=models.Cascade)








