from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .api import RegisterApi
from .views import *
urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterApi.as_view()),
    path('user_info/', user_info),
    path('create_super_user/', create_super_user),
    path('student/enroll/', enrol_student),
    path('student/years_of_study', get_student_year_of_study),
    path('student/curriculum/', get_curriculum),
    path('student/optional_courses', year_of_study_optional_courses),
    path('student/grades', student_grades),
    path('teacher/course_students', course_students),
    path('teacher/grades', teacher_grades)
]