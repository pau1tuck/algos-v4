# server/coderunner/serializers.py

from rest_framework import serializers


class CodeExecutionSerializer(serializers.Serializer):
    user_code = serializers.CharField()
    test_cases = serializers.ListField(child=serializers.CharField())
    test_code = serializers.CharField()
