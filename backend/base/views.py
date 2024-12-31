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
from rest_framework.exceptions import NotFound


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
@permission_classes([IsAuthenticated])
def createOrder(request):
    data = request.data
    try:
        # Reconstruct `cartInfo` data
        cart_info = {
            'skin': {
                'id': data.get('cartInfo[skin][id]'),
                'name': data.get('cartInfo[skin][name]'),
                'border': data.get('cartInfo[skin][border]'),
                'image': data.get('cartInfo[skin][image]'),
                'champion': data.get('cartInfo[skin][champion]'),
            },
            'icon': {
                'category': data.get('cartInfo[icon][category]'),
                'id': data.get('cartInfo[icon][id]'),
                'image': data.get('cartInfo[icon][image]'),
                'name': data.get('cartInfo[icon][name]'),
            },
            'rune': {
                'id': data.get('cartInfo[rune][id]'),
                'name': data.get('cartInfo[rune][name]'),
                'image': data.get('cartInfo[rune][image]'),
            },
            'secRune': {
                'id': data.get('cartInfo[secRune][id]'),
                'name': data.get('cartInfo[secRune][name]'),
                'image': data.get('cartInfo[secRune][image]'),
            },
            'sum1': {
                'id': data.get('cartInfo[sum1][id]'),
                'name': data.get('cartInfo[sum1][name]'),
                'image': data.get('cartInfo[sum1][image]'),
            },
            'sum2': {
                'id': data.get('cartInfo[sum2][id]'),
                'name': data.get('cartInfo[sum2][name]'),
                'image': data.get('cartInfo[sum2][image]'),
            },
            'rank': {
                'id': data.get('cartInfo[rank][id]'),
                'name': data.get('cartInfo[rank][name]'),
                'image': data.get('cartInfo[rank][image]'),
            },
            'size': data.get('cartInfo[size]'),
            'name': data.get('cartInfo[name]'),
            'skinName': data.get('cartInfo[skinName]'),
        }
        
        # Validate and extract payment proof
        payment_proof = request.FILES.get('paymentProof')
        if not payment_proof:
            return JsonResponse({"error": "Payment proof is required."}, status=400)
        
        # Create order and related objects
        order = Order.objects.create(
            user=request.user,
            price=data.get('price'),
            size=cart_info['size'],
            icon=Icon.objects.get(id=cart_info['icon']['id']),
            skin=Skin.objects.get(id=cart_info['skin']['id']),
            sum1=Summoner.objects.get(id=cart_info['sum1']['id']),
            sum2=Summoner.objects.get(id=cart_info['sum2']['id']),
            rank=Rank.objects.get(id=cart_info['rank']['id']),
            rune=Rune.objects.get(id=cart_info['rune']['id']),
            sec_rune=SecRune.objects.get(id=cart_info['secRune']['id']),
            payment_method=data.get('paymentMethod'),
            payment=payment_proof,
        )
        return JsonResponse({"message": "Order created successfully!", "order_id": order.id}, status=201)
    
    except (Icon.DoesNotExist, Skin.DoesNotExist, Summoner.DoesNotExist,
            Rank.DoesNotExist, Rune.DoesNotExist, SecRune.DoesNotExist) as e:
        return JsonResponse({"error": f"Related object not found: {str(e)}"}, status=400)
    
    except KeyError as e:
        return JsonResponse({"error": f"Missing or incorrect data: {str(e)}"}, status=400)
    
    except Exception as e:
        print(f"Unexpected error: {e}")
        return JsonResponse({"error": "An unexpected error occurred."}, status=500)



