from rest_framework.serializers import ModelSerializer
from .models import User

class RegisterUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = self.Meta.model(**validated_data)

        user.set_password(password)
        user.save()

        return user


