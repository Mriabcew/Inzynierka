using App.SQLQueryEngine;

namespace App.SQLQuerryClient
{
    internal class Program
    {
        static void Main()
        {
            // Tworzymy instancję klasy SQLEngine
            SQLEngine sqlEngine = new SQLEngine("Auctions");

            // Ustawiamy zapytanie NLP
            sqlEngine.NPLQuery = @"Komputery stacjonarne od 2500 do 3000 zł";

            // Pobieramy zapytanie SQL
            string sqlQuery = sqlEngine.GetSQLQuery();

            // Wyświetlamy wynik
            Console.WriteLine($"NPL Query: {sqlEngine.NPLQuery}\n\n");
            Console.WriteLine($"Generated SQL Query: {sqlQuery}");
        }
    }

}
