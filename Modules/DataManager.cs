// This class Datamanger has the following responsibilities:
// 1. It must observe the shared folder and retrieve the JSON file when it is written. There should be a delay in this method.
// 2. A copy must be written to a backup folder every time a new JSON file is detected.
// 3. The new JSON file must be inserted into the database.
// 4. Upon each action, a message must be sent to the View layer through the Controller, specifying the update made.
// Developed by Allan Frank for the 2nd-semester project.


namespace Semester2.Modules
{
    public class DataManager
    {
        // Path to the source folder that needs to be monitored
        private readonly string sourceFolderPath = "/Users/allanfrank/Code";
        // Path to the destination folder where files will be moved
        private readonly string destinationFolderPath = "/Users/allanfrank/CS2";
        // FileSystemWatcher to monitor changes in the directory
        private FileSystemWatcher watcher;
        private DBMS dbms; 


        // Constructor of DataManager
        public DataManager(DBMS dbmsInstance)
        {
            // Store the DBMS instance passed to the constructor
            this.dbms = dbmsInstance;
            // Move any existing .json files to the destination before setting up the watcher
            MoveExistingJsonFiles();

            // Initialize the FileSystemWatcher to monitor the source folder
            watcher = new FileSystemWatcher(sourceFolderPath);

            // Set filters to watch for changes in file names within the directory
            watcher.NotifyFilter = NotifyFilters.FileName;
            watcher.Filter = "*.json"; // Monitor only .json files

            // Add an event handler to execute when a new .json file is created
            watcher.Created += OnCreated;

            // Start monitoring the directory
            watcher.EnableRaisingEvents = true;
        }

        // Method to move existing .json files from source to destination
        private void MoveExistingJsonFiles()
        {
            // Get all .json files in the source directory
            string[] jsonFiles = Directory.GetFiles(sourceFolderPath, "*.json");
            foreach (var file in jsonFiles)
            {
                string fileName = Path.GetFileName(file); // Get the file name
                string destinationFilePath = Path.Combine(destinationFolderPath, fileName); // Combine for new destination path

                try
                {
                    // Move the file to the new destination
                    File.Move(file, destinationFilePath);
                    Console.WriteLine($"Existing file moved: {fileName}"); // Log success message
                    // After moving, send the JSON file content to the DBMS
                    SendJsonToDBMS(destinationFilePath);
                }
                catch (Exception ex)
                {
                    // Log error message if the file move fails
                    Console.WriteLine($"An error occurred moving existing file {fileName}: {ex.Message}");
                }
            }
        }

        // Event handler called when a new .json file is created in the source folder
        private void OnCreated(object sender, FileSystemEventArgs e)
        {
            int attempts = 0;
            bool fileMoved = false;
            // Attempt to move the file up to 2 times
            while (!fileMoved && attempts < 2)
            {
                try
                {
                    string destinationFilePath = Path.Combine(destinationFolderPath, e.Name); // Prepare the new path
                    File.Move(e.FullPath, destinationFilePath); // Try to move the file
                    Console.WriteLine($"File moved: {e.Name}"); // Log success message
                    // After moving, send the JSON file content to the DBMS
                    SendJsonToDBMS(destinationFilePath);
                    fileMoved = true;
                }
                catch (IOException)
                {
                    // If IOException occurs, pause and retry after short delay
                    System.Threading.Thread.Sleep(100);
                    attempts++;
                }
                catch (Exception ex)
                {
                    // Log error message if an exception occurs and break the loop
                    Console.WriteLine($"An error occurred: {ex.Message}");
                    break;
                }
            }
        }
            // Method to read JSON file content and send it to the DBMS
        private void SendJsonToDBMS(string filePath)
        {
            try
            {
                string jsonData = File.ReadAllText(filePath);
                dbms.ProcessJsonData(jsonData); // Assuming a method to process JSON data exists in DBMS class
                Console.WriteLine("JSON data sent to DBMS.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send JSON data to DBMS: {ex.Message}");
            }
        }
    }
    
}


//  class Program
//     {
//         public static void Main(string[] args)
//     {
//         DataManager observer = new DataManager();
//         Console.WriteLine("Observing folder for new .json files. Press 'Enter' to exit.");
//         Console.ReadLine();
//     }
//     }