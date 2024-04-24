import json
import psutil
import os
import datetime
import time
import random

class Sensor:
    def __init__(self):
        pass

    def read_temperature(self):
        # Implementer logikken til at læse temperaturdata fra sensoren her
        temperature = random.uniform(20, 30)
        return temperature

    def get_network_status(self):
        # Implementer logikken til at hente netværksstatus (f.eks. om internettet er tilgængeligt)
        return "Connected" if psutil.net_if_stats()['eth0'].isup else "Disconnected"

    def get_system_time(self):
        return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def get_operating_system(self):
        return os.uname()

    def send_data(self, data):
        # Implementer logikken til at sende data til Raspberry Pi
        # F.eks. ved at sende det over netværket
        pass

class RaspberryPi:
    def __init__(self, data_folder):
        self.data_folder = data_folder
        self.json_handler = JsonHandler()
        self.file_counter = 1

    def receive_data(self, data):
        # Modtag data fra sensoren
        self.save_data_to_json(data)
        self.send_data_to_folder(data)

    def save_data_to_json(self, data):
        timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        filename = os.path.join(self.data_folder, f"IoT{timestamp}_{self.file_counter}.json")
        self.json_handler.save_to_json(data, filename)
        self.file_counter += 1

    def send_data_to_folder(self, data):
        # Send dataene til en delt mappe til lagring
        pass

class JsonHandler:
    @staticmethod
    def save_to_json(data, filename):
        with open(filename, "w") as json_file:
            json.dump(data, json_file, indent=4)
        print(f"Data gemt i fil: {filename}")

    @staticmethod
    def load_from_json(filename):
        with open(filename, "r") as json_file:
            data = json.load(json_file)
        return data

def main():
    data_folder = "/path/to/shared/folder"  # Skift til den delte mappe på din Raspberry Pi
    raspberry_pi = RaspberryPi(data_folder)
    sensor = Sensor()

    while True:
        data = {
            "UP/DOWN": sensor.get_network_status(),
            "Hastighed": random.uniform(0, 100),
            "Dataoverførelser": random.uniform(0, 100),
            "Temperatur": sensor.read_temperature(),
            "Systemtid og dato": sensor.get_system_time(),
            "Operativsystem": sensor.get_operating_system()
        }
        raspberry_pi.receive_data(data)
        time.sleep(120)  # Vent i 2 minutter inden du indsamler næste runde af data

if __name__ == "__main__":
    main()
