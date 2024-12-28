from django.db import models
from django.contrib.auth.models import User




class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.IntegerField()
    history = models.TextField()

    def __str__(self):
        return self.name


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


class Painting(models.Model):
    SIZE_CHOICES = [
        ("20x35", "20x35"),
        ("34x58", "34x58"),
        # Add more sizes here as needed
    ]

    id = models.BigAutoField(primary_key=True)
    price = models.BigIntegerField()
    created_at = models.DateField(auto_now_add=True)
    size = models.CharField(max_length=10, choices=SIZE_CHOICES)  # Restrict sizes

    # Foreign Key Relationships
    icon = models.ForeignKey(Icon, on_delete=models.CASCADE, related_name='paintings')
    champion = models.ForeignKey(Champion, on_delete=models.CASCADE, related_name='paintings')
    skin = models.ForeignKey(Skin, on_delete=models.CASCADE, related_name='paintings')
    summoner = models.ForeignKey(Summoner, on_delete=models.CASCADE, related_name='paintings')
    rank = models.ForeignKey(Rank, on_delete=models.CASCADE, related_name='paintings')
    rune = models.ForeignKey(Rune, on_delete=models.CASCADE, related_name='paintings')
    sec_rune = models.ForeignKey(SecRune, on_delete=models.CASCADE, related_name='paintings')

    def __str__(self):
        return f"Painting {self.id} - Size: {self.size}"