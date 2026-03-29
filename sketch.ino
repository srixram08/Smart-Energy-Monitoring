#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Wokwi-GUEST";
const char* password = "";

String apiKey = "DHEGVW9Z6Q4AT2IE";

int pir = 27;
int led = 4;

void setup() {
  pinMode(pir, INPUT);
  pinMode(led, OUTPUT);
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  Serial.println("Connected");
}

void loop() {
  int motion = digitalRead(pir);
  int power = random(100, 500);

  if (motion == HIGH) {
    digitalWrite(led, HIGH);
  } else {
    digitalWrite(led, LOW);
  }

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    String url = "http://api.thingspeak.com/update?api_key=" + apiKey +
                 "&field1=" + String(power) +
                 "&field2=" + String(motion);

    http.begin(url);
    int code = http.GET();

    Serial.println("Sent: " + String(code));
    http.end();
  }

  delay(15000);
}