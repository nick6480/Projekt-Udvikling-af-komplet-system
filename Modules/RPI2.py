import json
import psutil
import platform
from datetime import datetime
import time

class SystemInformation:

    def __init__(self):
        self.counter = 1  # Initialiser tæller

    def get_system_information(self):
        # Hent systemtid og dato
        now = datetime.now()
        current_time = now.strftime("%H:%M:%S")
        current_date = now.strftime("%Y-%m-%d")

        # Hent systemoplysninger
        cpu_info = psutil.cpu_percent(interval=1, percpu=True)
        memory_info = psutil.virtual_memory()
        disk_info = psutil.disk_usage('/')
        os_info = platform.uname()
        
        # Saml systemoplysninger i et dictionary
        system_data = {
            "System Time": current_time,
            "System Date": current_date,
            "CPU Usage (%)": cpu_info,
            "Memory": {
                "Total (bytes)": memory_info.total,
                "Available (bytes)": memory_info.available,
            },
            "Disk": {
                "Total (bytes)": disk_info.total,
                "Free (bytes)": disk_info.free,
            },
            "OS": {
                "System": os_info.system,
                "Node Name": os_info.node,
                "Release": os_info.release,
                "Version": os_info.version,
                "Machine": os_info.machine,
                "Processor": os_info.processor,
            }
        }

        # Opret filnavn
        file_name = f"{str(self.counter)}.json"
        self.counter += 1  # Inkrementér tæller for næste iteration

        # Skriv data til JSON-filen
        with open(file_name, 'w') as file:
            json.dump(system_data, file, indent=4)
        
        print("Data er blevet gemt i " + file_name)

    def run(self):
        # Kør opgaven
        for i in range(20, 0, -1):
            print(f"Task will run in {i} minute(s)...")
            self.get_system_information()
            if i > 1:
                time.sleep(60)  # Vent i 60 sekunder mellem hver iteration
            else:
                print("Task completed.")

if __name__ == "__main__":
    system_info = SystemInformation()
    system_info.run()
