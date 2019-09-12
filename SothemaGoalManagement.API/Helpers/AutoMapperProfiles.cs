using System.Linq;
using AutoMapper;
using SothemaGoalManagement.API.Dtos;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>().ForMember(dest => dest.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            });

            CreateMap<User, UserForSearchResultDto>().ForMember(dest => dest.DepartmentName, opt =>
                        {
                            opt.MapFrom(src => src.Department.Name);
                        }).ForMember(dest => dest.FullName, opt =>
                        {
                            opt.ResolveUsing(u => u.FirstName.FullName(u.LastName));
                        });

            CreateMap<User, UserForDetailDto>().ForMember(dest => dest.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            });

            CreateMap<Photo, PhotosForDetailDto>();

            CreateMap<ProfileForUpdateDto, User>();

            CreateMap<UserForUpdateDto, User>();

            CreateMap<Photo, PhotoForReturnDto>();

            CreateMap<PhotoForCreationDto, Photo>();

            CreateMap<UserForRegisterDto, User>();

            CreateMap<MessageForCreationDto, Message>().ReverseMap();

            CreateMap<Message, MessageToReturnDto>()
                .ForMember(m => m.SenderPhotoUrl, opt => opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, opt => opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));

            CreateMap<Department, DepartmentToReturnDto>();

            CreateMap<UserStatus, UserStatusToReturnDto>();

            CreateMap<Strategy, StrategyForListDto>().ForMember(dest => dest.OwnerName, opt =>
            {
                opt.ResolveUsing(u => u.Owner.FirstName.FullName(u.Owner.LastName));
            });

            CreateMap<StrategyForCreationDto, Strategy>();

            CreateMap<Strategy, StrategyToReturnDto>().ForMember(dest => dest.OwnerName, opt =>
            {
                opt.ResolveUsing(u => u.Owner.FirstName.FullName(u.Owner.LastName));
            });

            CreateMap<AxisForCreationDto, Axis>();

            CreateMap<Axis, AxisToReturnDto>();

            CreateMap<AxisForUpdateDto, Axis>();

        }
    }
}