from django.urls import path
from .views import UploadDocumentView, DocumentListView, QAView

urlpatterns = [
    path('upload/', UploadDocumentView.as_view(), name='upload-document'),
    path('documents/', DocumentListView.as_view(), name='document-list'),
    path('ask/', QAView.as_view(), name='qa-endpoint'),
]