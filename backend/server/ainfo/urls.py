from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .api import RegisterApi
from .views import user_info, create_super_user, enrol_student, get_curriculum
urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterApi.as_view()),
    path('user_info/', user_info),
    path('create_super_user/', create_super_user),
    path('enrol_student/', enrol_student),
    path('curriculum_student/', get_curriculum)
]
