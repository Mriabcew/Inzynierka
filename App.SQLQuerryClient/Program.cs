using App.SQLQueryEngine;

namespace App.SQLQuerryClient
{
    internal class Program
    {
        static void Main()
        {
            // Tworzymy instancję klasy SQLEngine
            SQLEngine sqlEngine = new SQLEngine();

            // Ustawiamy zapytanie NLP
            sqlEngine.NPLQuery = @"od 10 do 50 zł";

            // Pobieramy zapytanie SQL
            string sqlQuery = sqlEngine.GetSQLQuery();

            // Wyświetlamy wynik
            Console.WriteLine($"NPL Query: {sqlEngine.NPLQuery}\n\n");
            Console.WriteLine($"Generated SQL Query: {sqlQuery}");
        }
    }

}
