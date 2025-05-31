from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .models import Document, QAHistory
from .serializers import DocumentSerializer
import openai
import os

# Put your API key here (not recommended for production)
openai.api_key = os.getenv("OPENAI_API_KEY")

class UploadDocumentView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        file_obj = request.FILES.get('file')
        title = request.data.get('title', file_obj.name if file_obj else 'Untitled')

        if not file_obj:
            return Response({"error": "No file provided"}, status=400)

        doc = Document(title=title, file=file_obj)
        doc.save()
        return Response({"message": "File uploaded successfully."}, status=201)

class DocumentListView(APIView):
    def get(self, request):
        documents = Document.objects.all().order_by('-uploaded_at')
        serializer = DocumentSerializer(documents, many=True)
        return Response(serializer.data)

class QAView(APIView):
    def post(self, request):
        question = request.data.get("question", "")
        if not question:
            return Response({"error": "Question is required"}, status=400)

        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": question}
                ],
                max_tokens=150,
                temperature=0.7,
            )
            answer = response.choices[0].message.content.strip()

            # Save QA pair in DB
            qa = QAHistory.objects.create(question=question, answer=answer)
            return Response({"answer": answer}, status=200)

        except Exception as e:
            return Response({"error": f"OpenAI API error: {str(e)}"}, status=500)
