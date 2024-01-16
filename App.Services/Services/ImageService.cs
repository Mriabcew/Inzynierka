using App.Common.Converters;
using App.DAL.Interfaces;
using App.DTO.DTOModels;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
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
        private readonly IImageRepository _imageRepository;

        public ImageService(IConfiguration configuration, IAuctionService auctionService, IImageRepository imageRepository)
        {

            _imageUploadPath = configuration.GetValue<string>("ImageUploadPath");
            _auctionService = auctionService;
            _imageRepository = imageRepository;

        }

        public async Task DeleteImages(AuctionDTO auction)
        {
            if(auction == null || !auction.Images.Any())
            {
                throw new ArgumentException(
                    "Przekazano nieprawidłowe obrazy");
            }

            try
            {
                foreach(var image in auction.Images)
                {
                    await _imageRepository.DeleteImageAsync(image.ToEntity());
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Błąd podczas przetwarzania obrazu: {ex.Message}");
            }
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
                    try
                    {
                        // Konwertuj do bajtów bez dodawania nagłówka
                        byte[] imageBytes = Convert.FromBase64String(image.base64);

                        // Generuj unikalną nazwę pliku
                        var fileName = Guid.NewGuid().ToString() + ".jpg";
                        var filePath = Path.Combine(_imageUploadPath, fileName);

                        // Zapisz bajty obrazu na dysku

                        // Tutaj możesz dodać logikę zapisu informacji o obrazie do bazy danych, jeśli to konieczne
                        await _imageRepository.AddNewPhoto(image.ToEntity());
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Błąd podczas przetwarzania obrazu: {ex.Message}");
                        // Dodaj dodatkową logikę obsługi błędu, jeśli to konieczne
                    }
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Błąd podczas zapisywania obrazu: {ex.Message}");
                throw;
            }
        }

        public async Task UpdateImages(AuctionDTO auction)
        {
            if (auction.Images == null || !auction.Images.Any())
            {
                throw new ArgumentException("Przekazano nieprawidłowe obrazy.");
            }

            try
            {
                foreach (var image in auction.Images)
                {
                    try
                    {
                        await _imageRepository.DeleteImageAsync(image.ToEntity());
                        var fileName = Guid.NewGuid().ToString() + ".jpg";
                        var filePath = Path.Combine(_imageUploadPath, fileName);

                        image.AuctionId = auction.Id;
                        await _imageRepository.AddNewPhoto(image.ToEntity());
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Błąd podczas przetwarzania obrazu: {ex.Message}");
                    }
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
