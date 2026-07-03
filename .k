    @discord.ui.button(label="Kayıt Et", style=discord.ButtonStyle.blurple, custom_id="kayit_et_butonu")
    async def kayit_et_click(self, interaction: discord.Interaction, button: discord.Button):
        # Sunucudaki rolleri ID'leri ile tanımla
        kayitsiz_rol = interaction.guild.get_role(112233445566778899) # Kayıtsız Rol ID
        uye_rol = interaction.guild.get_role(998877665544332211)     # Üye Rol ID
        
        # Mesajın ait olduğu (yeni gelen) üyeyi bulalım
        # Not: Bu basit mantık, embed mantığına göre hedef üyeyi çekmek için geliştirilebilir.
        # Şimdilik tıklayan yetkiliye onay mesajı verir:
        await interaction.response.send_message(f"Kayıt sistemi hazır!", ephemeral=True)
