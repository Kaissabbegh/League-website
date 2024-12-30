from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Champion,Rank,Rune,Skin,Summoner,SecRune,Icon,Client,Order
from .serializers import ChampionSerializer,IconSerializer,OrderSerializer,SkinSerializer,UserSerializer,UserSerializerWithToken,SecRuneSerializer,RuneSerializer,SummonerSerializer,RankSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        data = super().validate(attrs)
        
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        return data
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user=request.user
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)



@api_view(['POST'])
def registerUser(request):
    data = request.data  # Extract the body of the request
    if not data:
        return Response({'details': 'No data received'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Ensure required fields are present
    required_fields = ['phone', 'email', 'password']
    for field in required_fields:
        if field not in data:
            return Response({'details': f"'{field}' is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.create(
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),
        )
        Client.objects.create(
            user=user, 
            phone=data['phone'] 
        )
        # Client.objects.create(user=user)
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'details': 'user with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)



















@api_view(['GET'])
def getChamps(request):
    champions = Champion.objects.all()
    serializer = ChampionSerializer(champions,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_skins_for_champion(request, pk):
    # Fetch the champion by primary key
    champion = Champion.objects.get(pk=pk) 
    # Get all skins related to the champion
    skins = champion.skins.all()
    # Serialize the skins queryset
    serializer = SkinSerializer(skins, many=True)
    # Return the serialized data
    return Response(serializer.data)

@api_view(['GET'])
def getRunes(request):
    champions = Rune.objects.all()
    serializer = RuneSerializer(champions,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getRanks(request):
    rank = Rank.objects.all()
    serializer = RankSerializer(rank,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getSums(request):
    sums = Summoner.objects.all()
    serializer = SummonerSerializer(sums,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getSecRunes(request):
    secrune = SecRune.objects.all()
    serializer = SecRuneSerializer(secrune,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getIcons(request):
    icon = Icon.objects.all()
    serializer = IconSerializer(icon,many=True)
    return Response(serializer.data)






@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCOrder(request):  
    user = request.user
    order = Order.objects.filter(User=user).order_by('-created_at')
    properties_serializer = OrderSerializer(order, many=True)  
    return Response(properties_serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createOrder(request):
    data = request.data
    user = request.user  
    image=request.FILES.get('image')  
    try:
        order = Order.objects.create(
            user=user,   
            price = data['price'],    
            size = data['size'],
            icon =  Icon.objects.get(id=data['icon']), 
            skin = Skin.objects.get(id=data['skin']), 
            sum1 = Summoner.objects.get(id=data['sum1']), 
            sum2 = Summoner.objects.get(id=data['sum2']), 
            rank = Rank.objects.get(id=data['rank']), 
            rune = Rune.objects.get(id=data['title']), 
            sec_rune = SecRune.objects.get(id=data['title']),
            payment_method= data['title'], 
            payment = image, 
        )
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
    except Exception as e:
        message = {'details': str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)