from django.db import models
from django.contrib.auth.models import User




class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    full_name=models.CharField(max_length=255)
    city=models.CharField(max_length=255)
    address=models.CharField(max_length=255)
    zip=models.CharField(max_length=255)
    def __str__(self):
        return self.user.username


class Icon(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='icons/')
    category = models.BigIntegerField()

    def __str__(self):
        return self.name


class Champion(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='champions/')

    def __str__(self):
        return self.name


class Skin(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    border = models.BooleanField()
    image = models.ImageField(upload_to='skins/')
    champion = models.ForeignKey(
        Champion, on_delete=models.CASCADE, related_name='skins'
    )  # Relationship with Champion

    def __str__(self):
        return f"{self.name} (Skin for {self.champion.name})"


class Rune(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='runes/')

    def __str__(self):
        return self.name


class SecRune(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='sec_runes/')

    def __str__(self):
        return self.name


class Summoner(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='summoners/')

    def __str__(self):
        return self.name


class Rank(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='ranks/')

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    id = models.BigAutoField(primary_key=True)
    price = models.CharField(max_length=5) 
    created_at = models.DateField(auto_now_add=True)
    size = models.CharField(max_length=10)  # Restrict sizes

    # Foreign Key Relationships
    icon = models.ForeignKey(Icon, on_delete=models.CASCADE, related_name='paintings')
    skin = models.ForeignKey(Skin, on_delete=models.CASCADE, related_name='paintings')
    sum1 = models.ForeignKey(Summoner, on_delete=models.CASCADE, related_name='paintings1')
    sum2 = models.ForeignKey(Summoner, on_delete=models.CASCADE, related_name='paintings')
    rank = models.ForeignKey(Rank, on_delete=models.CASCADE, related_name='paintings')
    rune = models.ForeignKey(Rune, on_delete=models.CASCADE, related_name='paintings')
    sec_rune = models.ForeignKey(SecRune, on_delete=models.CASCADE, related_name='paintings')
    payment_method= models.CharField(max_length=255)
    payment = models.ImageField(upload_to='payment/')
    

    def __str__(self):
        return f"Painting {self.id} - Size: {self.size}"