//DBMS:
//Its responsibilities include maintaining database consistency, 
//securing against unauthorized access, 
//establishing connections to the databases
// Executing CRUD operations.
//Developed by Allan Frank for the 2nd-semester project.




using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Semester2.Modules
{
    public class DBMS
    {
        // Static member to hold a single instance using Lazy<T> for thread safety
        private static readonly Lazy<DBMS> instance = new Lazy<DBMS>(() => new DBMS());

        // Private constructor to prevent instance creation
        private DBMS() { }

        // Public static property to access the single instance
        public static DBMS Instance
        {
            get
            {
                return instance.Value;
            }
        }

        // Method to get data as JSON string
        public string GetDataAsJson(int RPINumber, string RPIName)
        {
            // Simulated example of fetching and returning data in JSON format
            return "{\"RPINumber\": " + RPINumber + ", \"RPIName\": \"" + RPIName + "\"}";
        }

        // Method to process JSON data
        public void ProcessJsonData(string jsonData)
        {
            // Implementation to store or process JSON data
            Console.WriteLine("Processing received JSON data...");
        }
    }
}
