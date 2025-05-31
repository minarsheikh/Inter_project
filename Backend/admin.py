from django.contrib import admin
from .models import Document, QAHistory

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'status', 'uploaded_at')

@admin.register(QAHistory)
class QAHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'answer', 'created_at')