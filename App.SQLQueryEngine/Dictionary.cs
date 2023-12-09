using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.SQLQueryEngine
{
    internal class Dictionary
    {
        // Zmiana modyfikatora dostępu
        public static Dictionary<string, string> NlpToSqlDictionary { get; set; }

        // Dodanie statycznej metody inicjalizującej słownik
        static Dictionary()
        {
            NlpToSqlDictionary = new Dictionary<string, string>
            {
                {"lub", "OR"},
                {"równa", "="},
                {"jest", "="},
                {"nie", "NOT"},
                {"like", "LIKE"},
                {"poniżej", "<"},
                {"powyżej", ">"},
                {"do", "<" },
                {"między", "BETWEEN"},
                {"grupa", "GROUP BY"},
                {"posortowane", "ORDER BY"},
                {"rosnąco", "ASC"},
                {"malejąco", "DESC"},
                {"sumuj", "SUM"},
                {"średnia", "AVG"},
                {"minimalna", "MIN"},
                {"maksymalna", "MAX"},
                {"liczba", "COUNT"},
                {"unikalna", "DISTINCT"},
                {"od", ">"},
                {"jak", "LIKE"},
                {"względem", "BY"},
                {"łącz", "JOIN"},
                {"lewa", "LEFT"},
                {"prawa", "RIGHT"},
                {"pełna", "FULL"},
                {"wewnętrzna", "INNER"},
                {"na", "ON"},
            };
        }
    }
}