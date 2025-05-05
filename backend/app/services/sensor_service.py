from app.core.config import settings
from paho.mqtt.client import Client, ssl
import google.generativeai as genai

import json

from app.schemas.sensor_schema import SensorData


# https://www.hivemq.com/blog/mqtt-client-library-paho-python/
mqtt_client = Client(clean_session=True)
mqtt_client.tls_set(tls_version=ssl.PROTOCOL_TLS)
mqtt_client.username_pw_set(
    username=settings.MQTT_USER,
    password=settings.MQTT_PASS
)

GOOGLE_API_KEY = "AIzaSyAz1Duj7kJDv7YeV82K1CYv73hSfGDf1BQ"
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

def build_prompt(sensor_data: SensorData):
    prompt = f"""You are a sensor data analysis and health care assistant.
You are given sensor data from an air quality monitoring system.
The data includes temperature, humidity, PM2.5, PM10, CO, NO2, and SO2 levels.
Your task is calculate AQI and analyze the data to provide insights on air quality and health recommendations.

Sensor Data:
    - Temperature: {sensor_data.t} °C
    - Humidity: {sensor_data.h} %
    - PM2.5: {sensor_data.pm25} µg/m³
    - PM10: {sensor_data.pm10} µg/m³
    - CO: {sensor_data.co} ppm
    - NO2: {sensor_data.no2} ppm
    - SO2: {sensor_data.so2} ppm
    
Please provide the following response as JSON format with fields:
```json
    "aqi": <AQI value>,
    "aqiLevel": <AQI level in vietnamese words: "Tốt", "Trung bình", "Kém", "Xấu", "Nguy hại">,
    "tLevel": <Temperature level in vietnamese words: "Tốt", "Trung bình", "Kém", "Xấu", "Nguy hại">,
    "hLevel": <Humidity level in vietnamese words: "Tốt", "Trung bình", "Kém", "Xấu", "Nguy hại">,
    "pm25Level": <PM2.5 level in vietnamese words: "Tốt", "Trung bình", "Kém", "Xấu", "Nguy hại">,
    "pm10Level": <PM10 level in vietnamese words: "Tốt", "Trung bình", "Kém", "Xấu", "Nguy hại">,
    "coLevel": <CO level in vietnamese words: "Tốt", "Trung bình", "Kém", "Xấu", "Nguy hại">,
    "no2Level": <NO2 level in vietnamese words: "Tốt", "Trung bình", "Kém", "Xấu", "Nguy hại">,
    "so2Level": <SO2 level in vietnamese words: "Tốt", "Trung bình", "Kém", "Xấu", "Nguy hại">,
    "recommendation": <health recommendations>,
```
"""
    return prompt


def on_connect(client, userdata, flags, rc):
    print('CONNACK received with code %d.' % (rc))


def on_subscribe(client, userdata, mid, granted_qos):
    print("Subscribed: "+str(mid)+" "+str(granted_qos))


def on_message(client, userdata, msg):
    msg_payload = json.loads(msg.payload.decode())
    sensor_data = SensorData(**msg_payload)
    prompt = build_prompt(sensor_data)
    response = model.generate_content(prompt)
    print("Response: ", json.loads(response.text))
    

def mqtt_subscriber():
    mqtt_client.on_connect = on_connect
    mqtt_client.on_subscribe = on_subscribe
    mqtt_client.on_message = on_message
    mqtt_client.connect(settings.MQTT_BROKER, settings.MQTT_PORT)
    mqtt_client.subscribe(settings.MQTT_TOPIC, qos=1)
    mqtt_client.loop_start()


def mqtt_unsubscriber():
    mqtt_client.loop_stop()