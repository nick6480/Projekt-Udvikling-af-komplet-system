//LogInService:
//Its responsibility lies in handling LogIn requests from the View layer through the Controller.
// 1. Formulate requests so that the DBMS can receive, retrieve, and return the desired data.
//Developed by Allan Frank for the 2nd-semester project.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Semester2.Modules
{
    public class UserRepository
    {
       public bool ValidateLength(string name, string password)
    {
        return name.Length == 7 && password.Length == 7;
    } 
    }
}