import discord
from discord.ext import commands
from discord.ui import Button, View
import os
from dotenv import load_dotenv

# .env dosyasındaki değişkenleri yükler
load_dotenv()

intents = discord.Intents.default()
intents.members = True  # Üye girişlerini yakalamak için aktif olmalı
intents.message_content = True

bot = commands.Bot(command_prefix=".", intents=intents)

# Buton İşlevselliği
class KayitButonu(View):
    def __init__(self):
        super().__init__(timeout=None) # Butonun süresinin dolmaması için (Persistent View)

    @discord.ui.button(label="Kayıt Et", style=discord.ButtonStyle.blurple, custom_id="kayit_et_butonu")
    async def kayit_et_click(self, interaction: discord.Interaction, button: discord.Button):
        # Yetkili rol kontrolü (Örn: Kayıt Yetkilisi rolüne sahip mi?)
        # Geliştirmek istersen buraya rol kontrolü ekleyebilirsin.
        
        await interaction.response.send_message(f" Kulanıcı kayıt işlemine alındı! (Tıklayan: {interaction.user.mention})", ephemeral=True)

@bot.event
async def on_ready():
    # Bot kapansa bile butonların çalışmaya devam etmesi için view'ı kaydediyoruz
    bot.add_view(KayitButonu())
    print(f"{bot.user.name} olarak giriş yapıldı!")

@bot.event
async def on_member_join(member: discord.Member):
    # Ayarlar (Buradaki ID'leri kendi sunucuna göre doldurmalısın)
    KAYIT_KANAL_ID = 123456789012345678  # kayıt-odasi kanal ID'si
    KAYIT_YETKILISI_ROLE_ID = 112233445566778899  # @Kayıt Yetkilisi rol ID'si
    TITANIZM_ROLE_ID = 998877665544332211  # @TİTANİZM rol ID'si
    
    channel = member.guild.get_channel(1522550831482667048)
    if not channel:
        return

    # Toplam üye sayısı
    toplam_uye = member.guild.member_count

    # Görseldeki gibi Embed Tasarımı
    embed = discord.Embed(
        title="📥 Sunucumuza Biri Geldi!",
        description="**Merhaba, hoş geldin! Lütfen buraya merhaba yazar mısın?**\n\n"
                    f"👤 **Mevcut Kişi Sayısı:** {toplam_uye}\n"
                    "📝 Yetkililerimiz seninle en kısa sürede ilgilenecektir.",
        color=discord.Color.red()  # Sol şerit kırmızı
    )
    
    # Sağ taraftaki küçük resim (Thumbnail)
    # Görseldeki profil/kapak resminin linkini buraya koyabilirsin
    embed.set_thumbnail(url="https://via.placeholder.com/150") 
    
    # Zaman damgası (Footer altında anlık saati gösterir)
    embed.timestamp = discord.utils.utcnow()

    # Rol etiketleri içeren düz metin kısmı
    mention_text = f"📥 Biri geldi kayıt edin <@&{1522551053604749413}>

    # Mesajı embed ve butonla birlikte gönder
    await channel.send(content=mention_text, embed=embed, view=KayitButonu())

# Botu çalıştır (.env dosyasından tokeni çeker)
bot.run(os.getenv("TOKEN"))
