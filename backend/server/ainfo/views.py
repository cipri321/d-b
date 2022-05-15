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
            return Response(status=status.HTTP_200_OK, data=model_to_dict(user))
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
                teacher = Teacher_details(user_id=request.user, faculty=Faculty.objects.get(name=faculty), title_id=Titles.objects.get(name=title), chief_of_department=chief_of_dep=='yes')
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
            body = json.loads(request.body.decode('utf-8'))
            year_of_study = body['year_of_study_id']
            enrollment = Enrollment(student_id=Student_details.objects.get(user_id=request.user), year_of_study_id=year_of_study)
            enrollment.save()
            return Response(status=status.HTTP_200_OK, data=model_to_dict(enrollment))

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
            curriculum = Curriculum.objects.get(year_of_study_id=Student_details.objects.get(user_id=request.user).year_of_study)
            course_list = serializers.serialize('json', curriculum.courses.all())
            return Response(status=status.HTTP_200_OK, data=course_list)

    except Exception as e:
        print(str(e))
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


