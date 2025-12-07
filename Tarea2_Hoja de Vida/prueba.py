from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Inicia el navegador (usa Chrome en este ejemplo)
driver = webdriver.Chrome()

# Abre la página web
driver.get("https://www.google.com")

# Encuentra el campo de texto (en este caso el buscador de Google)
caja = driver.find_element(By.NAME, "q")

# Texto a escribir
texto = "no se porque pienso que escribir de esta manera probara que mi capacidad para escribir mucho mas rapido y sin acentos sea mi unica forma de escribir mas rapido en esta pagina pero aun asi tengo que seguir comprobando esto y hago este texto para comprobar de nuevo mis habilidades y mi velocidad asi que solo estoy poniendo palabras o frases aleatorias para llenar suficientes palabras o lineas para darme cuenta mi velocidad al escribir este texto y que asi de alguna manera ponga una barra y tratar de superarla haciendo el mismo test varias veces hasta que pueda escribirlo todo aunque no se si llegara el dia en que pueda escribir todo esto en menos de un minuto"

# Forma 1: instantáneo (lo pega todo de una vez)
caja.send_keys(texto)

# Si quieres simular velocidad (muy rápido pero no instantáneo):
for letra in texto:
    caja.send_keys(letra)
    time.sleep(0.001)  # velocidad (ajusta más bajo para más rápido)

# Opcional: enviar el texto (como presionar Enter)
caja.send_keys(Keys.RETURN)
