from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework.decorators import api_view, renderer_classes, permission_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.forms.models import model_to_dict
import json


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


