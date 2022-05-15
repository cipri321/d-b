from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Example(models.Model):
    id = models.AutoField(primary_key=True)

class Group(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=10)


class Student_details(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    group_id = models.ForeignKey(Group, on_delete=models.CASCADE)


class Titles(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)


class Faculty(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)

class Teacher_details(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    title_id = models.ForeignKey(Titles, on_delete=models.CASCADE)
    chief_of_department = models.BooleanField()


class Year_of_study(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    degree = models.CharField(max_length=50)
    faculty_id = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    enrolled = models.ManyToManyField(Student_details, through='Enrollment')


class Course(models.Model):
    types = [
        ('O', 'Optional'),
        ('N', 'Not Optional'),
    ]
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    optional = models.CharField(max_length=1, choices=types)
    students = models.ManyToManyField(Student_details, through='Optional_preferences')


class Curriculum(models.Model):
    id = models.AutoField(primary_key=True)
    year_of_study_id = models.ForeignKey(Year_of_study, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course, through='Curriculum_course')


class Optional_preferences(models.Model):
    id = models.AutoField(primary_key=True)
    priority = models.IntegerField()
    student_id = models.ForeignKey(Student_details, on_delete=models.CASCADE)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)


class Curriculum_course(models.Model):
    id = models.AutoField(primary_key=True)
    curriculum_id = models.ForeignKey(Curriculum, on_delete=models.CASCADE)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)


class Enrollment(models.Model):
    id = models.AutoField(primary_key=True)
    student_id = models.ForeignKey(Student_details, on_delete=models.CASCADE)
    year_of_study_id = models.ForeignKey(Year_of_study, on_delete=models.CASCADE)


class Grades(models.Model):
    id = models.AutoField(primary_key=True)
    student_id = models.ForeignKey(Student_details, on_delete=models.CASCADE)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    grade = models.IntegerField()


class CourseProposition(models.Model):
    id = models.AutoField(primary_key=True)
    teacher_id = models.ForeignKey(Teacher_details, on_delete=models.CASCADE)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)

