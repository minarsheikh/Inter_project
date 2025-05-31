from rest_framework import serializers
from .models import Document, QAHistory

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'

class ManSerializer(serializers.ModelSerializer):
    class Meta:
        model = QAHistory
        fields = '__all__'

