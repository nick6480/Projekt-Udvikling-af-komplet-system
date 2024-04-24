// DataRepository and iDataRepository:
// 1. These are responsible for handling data requests from the View layer through the Controller.
// 2. Formulate requests so that the DBMS can receive, retrieve, and return the desired data.
// Developed by Allan Frank for the 2nd-semester project.

using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace Semester2.Modules
{
    public interface iDataRepository
    {
        string GetDataAsJson(int RPINumber, string RPIName);
    }
}