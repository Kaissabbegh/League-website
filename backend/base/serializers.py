from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Champion,Rank,Rune,Skin,Summoner,SecRune,Icon,Client
from rest_framework_simplejwt.tokens import RefreshToken


class SkinSerializer(serializers.ModelSerializer):
    class Meta:
        model= Skin
        fields='__all__'


class ChampionSerializer(serializers.ModelSerializer):
    skins = SkinSerializer(many=True, read_only=True)  # Reference the related_name

    class Meta:
        model = Champion
        fields = ['id', 'name', 'image', 'skins'] 



class RuneSerializer(serializers.ModelSerializer):
    class Meta:
        model= Rune
        fields='__all__'

class RankSerializer(serializers.ModelSerializer):
    class Meta:
        model= Rank
        fields='__all__'

class SummonerSerializer(serializers.ModelSerializer):
    class Meta:
        model= Summoner
        fields='__all__'

class SecRuneSerializer(serializers.ModelSerializer):
    class Meta:
        model= SecRune
        fields='__all__'

class IconSerializer(serializers.ModelSerializer):
    class Meta:
        model= Icon
        fields='__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    name=serializers.SerializerMethodField(read_only=True)
    _id=serializers.SerializerMethodField(read_only=True)
    isAdmin=serializers.SerializerMethodField(read_only=True)
    profile = UserProfileSerializer(source='userprofile', read_only=True)
    class Meta:
        model = User
        fields= ['id','_id','name','username','email','isAdmin','profile']
    def get__id(self,obj):
        return obj.id
    def get_isAdmin(self,obj):
        return obj.is_staff
    def get_name(self,obj):
        name = obj.first_name
        if name=='':
            name=obj.email
        return name

class UserSerializerWithToken(UserSerializer):
    token=serializers.SerializerMethodField(read_only=True)
    profile = UserProfileSerializer(source='userprofile', read_only=True)
    class Meta:
        model = User
        fields= ['id','_id','name','username','email','isAdmin','token','profile']
    def get_token(self,obj):
        token=RefreshToken.for_user(obj)
        return str(token.access_token)