from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework.decorators import api_view, renderer_classes, permission_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.forms.models import model_to_dict
import json
from .models import *
from django.core import serializers


# Create your views here.

@api_view(('GET',))
@csrf_exempt
@renderer_classes((JSONRenderer, TemplateHTMLRenderer))
def user_info(request):
    try:
        if request.method == 'GET':
            user = request.user
            info = {"user": model_to_dict(user, exclude=['date_joined', 'password'])}
            if Student_details.objects.filter(user_id=user).exists():
                student = Student_details.objects.filter(user_id=user).first()
                info['student_details'] = {
                    "group": student.group_id.name
                }
            if Teacher_details.objects.filter(user_id=user).exists():
                teacher = Teacher_details.objects.filter(user_id=user).first()
                info['teacher_details'] = {
                    "faculty": teacher.faculty.name,
                    "title": teacher.title_id.name,
                    "chief_of_department": str(teacher.chief_of_department)
                }
            return Response(status=status.HTTP_200_OK, data=json.dumps(info))
    except Exception as e:
        print(str(e))
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(('POST',))
@csrf_exempt
@permission_classes([])
@renderer_classes((JSONRenderer, TemplateHTMLRenderer))
def create_super_user(request):
    try:
        if request.method == 'POST':
            body = json.loads(request.body.decode('utf-8'))
            if body['superUserKey'] == 'CreateSuperUserKey':
                user = User.objects.create_superuser(
                    username=body['username'],
                    email=body['email'],
                    first_name=body['first_name'],
                    last_name=body['last_name'],
                )
                user.set_password(body['password'])
                user.save()
                return Response(status=status.HTTP_200_OK, data=model_to_dict(user))
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
    except Exception as e:
        print(str(e))
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(('POST',))
@csrf_exempt
@permission_classes([])
@renderer_classes((JSONRenderer, TemplateHTMLRenderer))
def create_details(request):
    try:
        if request.method == 'POST':
            body = json.loads(request.body.decode('utf-8'))
            type = body['type']
            if type == 'student':
                group = body['group']
                student = Student_details(user_id=request.user, group_id=Group.objects.get(name=group))
                student.save()
                return Response(status=status.HTTP_200_OK, data=model_to_dict(student))
            elif type == 'teacher':
                faculty = body['faculty']
                title = body['title']
                chief_of_dep = body['chief_of_dep']
                teacher = Teacher_details(user_id=request.user, faculty=Faculty.objects.get(name=faculty),
                                          title_id=Titles.objects.get(name=title),
                                          chief_of_department=chief_of_dep == 'yes')
                teacher.save()
                return Response(status=status.HTTP_200_OK, data=model_to_dict(teacher))


    except Exception as e:
        print(str(e))
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(('POST',))
@csrf_exempt
@permission_classes([])
@renderer_classes((JSONRenderer, TemplateHTMLRenderer))
def enrol_student(request):
    try:
        if request.method == 'POST':
            student_enrollments = Enrollment.objects.filter(
                student_id=Student_details.objects.get(user_id=request.user))
            if (student_enrollments.count() >= 2):
                return Response(status=status.HTTP_202_ACCEPTED, data="Already two enrollments")
            body = json.loads(request.body.decode('utf-8'))
            year_of_study = body['year_of_study_id']
            enrollment = Enrollment(student_id=Student_details.objects.get(user_id=request.user),
                                    year_of_study_id=Year_of_study.objects.get(id=year_of_study))
            enrollment.save()
            return Response(status=status.HTTP_200_OK, data=model_to_dict(enrollment))

    except Exception as e:
        print(str(e))
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(('GET',))
@csrf_exempt
@permission_classes([])
@renderer_classes((JSONRenderer, TemplateHTMLRenderer))
def get_students_from_group(request):
    try:
        if request.method == 'GET':
            group = request.GET.get('group_id')
            students_from = Student_details.objects.get(group_id=Group.objects.get(id=group))
        return Response(status=status.HTTP_200_OK, data=serializers.serialize('json', students_from))
    except Exception as e:
        print(str(e))
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(('GET',))
@csrf_exempt
@permission_classes([])
@renderer_classes((JSONRenderer, TemplateHTMLRenderer))
def get_student_year_of_study(request):
    try:
        if request.method == 'GET':
            enrollments = Enrollment.objects.filter(student_id=Student_details.objects.get(user_id=request.user))
            years_of_study = []
            for enrollment in enrollments:
                years_of_study.append({
                    "id": enrollment.year_of_study_id.id,
                    "degree": enrollment.year_of_study_id.degree,
                    "name": enrollment.year_of_study_id.name,
                    "faculty": enrollment.year_of_study_id.faculty_id.name,

                })
            return Response(status=status.HTTP_200_OK, data=json.dumps(years_of_study))
    except Exception as e:
        print(str(e))
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(('GET',))
@csrf_exempt
@permission_classes([])
@renderer_classes((JSONRenderer, TemplateHTMLRenderer))
def get_curriculum(request):
    try:
        if request.method == 'GET':
            year_of_study = request.GET.get('year_of_study_id')
            curriculum = Curriculum.objects.get(year_of_study_id=year_of_study)
            course_list = serializers.serialize('json', curriculum.courses.all())
            return Response(status=status.HTTP_200_OK, data=course_list)

    except Exception as e:
        print(str(e))
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(('POST', 'GET'))
@csrf_exempt
@permission_classes([])
@renderer_classes((JSONRenderer, TemplateHTMLRenderer))
def year_of_study_optional_courses(request):
    try:
        if request.method == 'GET':
            year_of_study = request.GET.get('year_of_study_id')
            curriculum_courses = Curriculum_course.objects.filter(
                curriculum_id=Curriculum.objects.get(year_of_study_id=Year_of_study.objects.get(id=year_of_study)))
            optional_course = []
            for curriculum_course in curriculum_courses:
                course = curriculum_course.course_id
                if course.optional == 'O':
                    optional_course.append(course)
            return Response(status=status.HTTP_200_OK, data=serializers.serialize('json', optional_course))

    except Exception as e:
        print(str(e))
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(('GET', 'POST'))
@csrf_exempt
@permission_classes([])
@renderer_classes((JSONRenderer, TemplateHTMLRenderer))
def student_grades(request):
    try:
        if request.method == 'GET':
            year_of_study = request.GET.get('year_of_study_id')
            curriculum_courses = Curriculum_course.objects.filter(
                curriculum_id=Curriculum.objects.get(year_of_study_id=Year_of_study.objects.get(id=year_of_study)))
            grades = dict()
            for curriculum_course in curriculum_courses:
                course = curriculum_course.course_id
                grade = Grades.objects.filter(student_id=Student_details.objects.get(user_id=request.user),
                                              course_id=course)
                if grade.count() > 0:
                    grades[course.name] = grade.first().grade
            return Response(status=status.HTTP_200_OK, data=json.dumps(grades))

    except Exception as e:
        print(str(e))
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(('GET', 'POST'))
@csrf_exempt
@permission_classes([])
@renderer_classes((JSONRenderer, TemplateHTMLRenderer))
def course_students(request):
    try:
        if request.method == 'GET':
            course_id = request.GET.get('course_id')
            course = Course.objects.get(id=course_id)
            if course:
                students = course.students.all()
                cur_courses = Curriculum_course.objects.filter(course_id=course)
                for cur_course in cur_courses:
                    students = students.union(cur_course.curriculum_id.year_of_study_id.enrolled.all())

                return Response(status=status.HTTP_200_OK, data=serializers.serialize('json', students))
            return Response(status=status.HTTP_200_OK, data='No students')

    except Exception as e:
        print(str(e))
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(('GET', 'POST'))
@csrf_exempt
@permission_classes([])
@renderer_classes((JSONRenderer, TemplateHTMLRenderer))
def teacher_grades(request):
    try:
        if request.method == 'POST':
            td = Teacher_details.objects.get(user_id=request.user)
            if not td:
                return Response(status=status.HTTP_403_FORBIDDENc)
            body = json.loads(request.body.decode('utf-8'))
            student_id = body['student_id']
            course_id = body['course_id']
            grade = int(body['grade'])
            g = Grades(student_id=Student_details.objects.get(id=student_id),
                       course_id=Course.objects.get(id=course_id), grade=grade)
            g.save()
            return Response(status=status.HTTP_200_OK, data=model_to_dict(g))

    except Exception as e:
        print(str(e))
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
