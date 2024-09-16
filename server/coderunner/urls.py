# server/coderunner/urls.py

from django.urls import path
from .views import CodeRunnerView

urlpatterns = [
    path("execute/", CodeRunnerView.as_view(), name="code-execute"),
]
