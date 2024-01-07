using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Common.Checkers
{
    public static class UserChecker
    {
        public static bool VerifyPassword(string password, string hashPassword) => BCrypt.Net.BCrypt.Verify(password, hashPassword);
    }
}
