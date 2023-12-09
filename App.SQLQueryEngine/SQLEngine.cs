using System;
using System.Collections.Generic;
using System.Linq;

namespace App.SQLQueryEngine
{
    public class SQLEngine
    {
        public string NPLQuery { get; set; }
        public string SQLQuery { get; set; }

        private string endChars = @"aiy";
        private string[] targetWords = { "od", "do", "poniżej", "powyżej" };
        public SQLEngine()
        {
        }

        public string GetSQLQuery()
        {
            NPLQuery = NPLQuery.TrimStart();
            ProcessNLPQuery();
            return SQLQuery;
        }

        private void ProcessNLPQuery()
        {
            string[] words = SplitToWords();
             int indexOfFirstTargetWord = words
    .Select((word, index) => new { Word = word, Index = index })
    .FirstOrDefault(item => targetWords.Contains(item.Word.ToLower()))?.Index ?? -1;
            // Początkowe zapytanie SQL
            SQLQuery = GetDefaultSQLQuery("Auctions");

            // Domyślny warunek dla ceny
            string priceCondition = "<";

            int i = 0;
            string x = null;
            // Iteracja po słowach w zapytaniu NLP
            foreach (var word in words)
            {

                // Jeśli słowo to liczba, ustaw nowy warunek ceny
                if (IsNumeric(word))
                {
                    SQLQuery += $" AND Price {priceCondition} {word}";
                }
                else
                {
                    
                    if (i < indexOfFirstTargetWord)
                    {
                        if (endChars.Contains(word[word.Length - 1]))
                        {
                          x = word.Substring(0, word.Length - 1);
                         
                        }
                        else
                        {
                            x = word;
                        }
                        // Jeśli słowo to nie liczba, dodaj do warunku LIKE dla tytułu i opisu
                        SQLQuery += $" AND (Title LIKE '%{x}%' OR Description LIKE '%{x}%')";
                    }

                }

                // Sprawdź, czy słowo to jedno z kluczowych słów zmieniających warunek ceny
                if (word.ToLower() == "do" || word.ToLower() == "poniżej")
                {
                    priceCondition = "<";
                }
                else if (word.ToLower() == "od" || word.ToLower() == "powyżej")
                {
                    priceCondition = ">";
                }
                i++;
            }
        }

        private string[] SplitToWords()
        {
            return NPLQuery.Split(' ');
        }

        public static string GetDefaultSQLQuery(string tableName)
        {
            return $"SELECT * FROM {tableName} WHERE 1=1";
        }

        public static bool IsNumeric(string input)
        {
            return double.TryParse(input, out _);
        }
    }
}
