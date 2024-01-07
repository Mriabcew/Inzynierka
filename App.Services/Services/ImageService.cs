using App.DTO.DTOModels;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Services
{
    public class ImageService : IImageService
    {
        private readonly string _imageUploadPath;
        private readonly IAuctionService _auctionService;

        public ImageService(IConfiguration configuration, IAuctionService auctionService)
        {
          
            _imageUploadPath = configuration.GetValue<string>("ImageUploadPath");
            _auctionService = auctionService;
        
        }

       

       public async Task SaveImageAsync(AuctionDTO auction)
{
            if (auction.Images == null || !auction.Images.Any())
            {
                throw new ArgumentException("Przekazano nieprawidłowe obrazy.");
            }

            try
            {
                foreach (var image in auction.Images)
                {
                    //if (string.IsNullOrEmpty(image.base64))
                    //{
                    //    // Dodaj odpowiednią obsługę błędu, np. rzucenie wyjątku lub wypisanie informacji do logów
                    //    Console.WriteLine("Błąd: DataURL w obrazie jest puste.");
                    //    continue;  // Opcjonalnie, możesz przejść do następnego obrazu
                    //}

                    //// Konwersja ciągu base64 na bajty
                    //byte[] imageBytes = Convert.FromBase64String(image.DataURL.Split(',')[1]);

                    //// Generuj unikalną nazwę pliku (możesz dostosować do swoich potrzeb)
                    //var fileName = Guid.NewGuid().ToString() + ".png"; // Zakładam, że obrazy są w formacie PNG
                    //var filePath = Path.Combine(_imageUploadPath, fileName);

                    //// Zapisz bajty obrazu na dysku
                    //await File.WriteAllBytesAsync(filePath, imageBytes);

                    //// Tutaj możesz dodać logikę zapisu informacji o obrazie do bazy danych, jeśli to konieczne
                    //_auctionService.UpdateImage(auction);

                    //Console.WriteLine($"Obraz zapisano pomyślnie: {fileName}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Błąd podczas zapisywania obrazu: {ex.Message}");
                throw;
            }
}

    }
}
