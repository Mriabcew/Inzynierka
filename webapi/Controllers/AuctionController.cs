using App.DAL.Interfaces;
using App.DTO.DTOModels;
using App.Services.Interfaces;
using App.Services.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace webapi.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class AuctionController : ControllerBase
    {
        private readonly IAuctionService _auctionService;
        private readonly IImageService _imageService;

        public AuctionController(IAuctionService auctionService, IConfiguration configuration,IImageRepository imageRepository)
        {
            _auctionService = auctionService;
            _imageService = new ImageService(configuration,auctionService,imageRepository);
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
           var auctions = await _auctionService.GetAll();
           return Ok(auctions);
        }

        [HttpGet]
        [Route("GetAllByCategory/{categoryId}")]
        public async Task<IActionResult> GetAllFromCategory(Guid categoryId)
        {
            var auctions = await _auctionService.GetByCategory(categoryId);
            return Ok(auctions);
        }

        [HttpPost]
        [Route("AddNew")]
        [RequestFormLimits(MultipartBodyLengthLimit = long.MaxValue)]
        public async Task<IActionResult> AddNew([FromBody] AuctionDTO auctionModel)
        {
            if (auctionModel.Id == Guid.Empty)
            {
                auctionModel.Id = Guid.NewGuid();
            }

            foreach(var image in auctionModel.Images)
            {
                image.AuctionId = auctionModel.Id;
                image.Id = Guid.NewGuid();
            }

            await _auctionService.AddNew(auctionModel);
            await _imageService.SaveImageAsync(auctionModel);

            return Ok(auctionModel);
        }

        [HttpPost]
        [Route("GetAllByUserId")]
        public async Task<IActionResult> GetAllAuctionsByUser([FromBody] Guid userId)
        {
            var auctions = await _auctionService.GetByUser(userId);

            if (auctions == null)
            {
                return NotFound();
            }

            return Ok(auctions);
        }

        [HttpPost]
        [Route("Update")]
        public async Task<IActionResult> Update([FromBody] AuctionDTO auctionModel)
        {
            var auction = await _auctionService.Update(auctionModel);

            return Ok(auction);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<AuctionDTO>> GetById(Guid id)
        {
            var auction = await _auctionService.GetById(id);
            if(auction == null)
            {
                return NotFound();

            }
            return Ok(auction);

        }

        [HttpPost]
        [Route("Edit/{auctionId}")]
        public async Task<IActionResult> UpdateAuction([FromBody] AuctionDTO auctionModel)
        {
            var auction = await _auctionService.GetById(auctionModel.Id);
            if (auction == null)
            {
                return NotFound();

            }

            await _auctionService.Update(auctionModel);
            await _imageService.UpdateImages(auctionModel);

            return Ok("Auction updated");
        }

        [HttpDelete]
        [Route("Delete/{Id}")]
        public async Task<IActionResult> DeleteAuction(Guid Id)
        {
            var auction = await _auctionService.GetById(Id);
            if(auction == null)
            {
                return NotFound(); 
            }
            await _auctionService.Delete(auction);
            await _imageService.DeleteImages(auction);
            return Ok("Auction deleted");
            
        }



    }
}
