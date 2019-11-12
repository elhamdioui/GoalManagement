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

            CreateMap<User, UserForSearchResultDto>().ForMember(dest => dest.LastEvaluationFile, opt =>
            {
                opt.MapFrom(src => src.EvaluationFileInstances.OrderByDescending(efi => efi.Year).FirstOrDefault().Title);
            });

            CreateMap<User, UserForDetailDto>().ForMember(dest => dest.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            });

            CreateMap<Photo, PhotosForDetailDto>();

            CreateMap<ProfileForUpdateDto, User>();

            CreateMap<UserForUpdateDto, User>().ForMember(dest => dest.UserName, opt =>
            {
                opt.MapFrom(src => src.Email);
            }).ForMember(dest => dest.NormalizedUserName, opt =>
            {
                opt.MapFrom(src => src.Email.ToUpper());
            }).ForMember(dest => dest.NormalizedEmail, opt =>
            {
                opt.MapFrom(src => src.Email.ToUpper());
            });

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

            CreateMap<StrategyForUpdateDto, Strategy>();

            CreateMap<Strategy, StrategyToReturnDto>().ForMember(dest => dest.OwnerName, opt =>
            {
                opt.ResolveUsing(u => u.Owner.FirstName.FullName(u.Owner.LastName));
            });

            CreateMap<AxisForCreationDto, Axis>();

            CreateMap<Axis, AxisToReturnDto>();

            CreateMap<AxisForUpdateDto, Axis>();

            CreateMap<AxisPole, AxisPoleToReturnDto>();

            CreateMap<BehavioralSkillForCreationDto, BehavioralSkill>();

            CreateMap<BehavioralSkillForUpdateDto, BehavioralSkill>();

            CreateMap<BehavioralSkill, BehavioralSkillToReturnDto>().ForMember(dest => dest.CreatedByName, opt =>
            {
                opt.ResolveUsing(u => u.CreatedBy.FirstName.FullName(u.CreatedBy.LastName));
            });

            CreateMap<EvaluationFileForCreationDto, EvaluationFile>();

            CreateMap<EvaluationFileForUpdateDto, EvaluationFile>().ForMember(x => x.BehavioralSkills, opt => opt.Ignore()); ;


            CreateMap<AxisInstance, AxisInstanceToReturnDto>();

            CreateMap<EvaluationFileInstance, EvaluationFileInstanceToReturnDto>().ForMember(dest => dest.AxisInstances, opt =>
            {
                opt.ResolveUsing(u => u.AxisInstances);
            }).ForMember(dest => dest.OwnerName, opt =>
            {
                opt.ResolveUsing(u => u.Owner.FirstName.FullName(u.Owner.LastName));
            }).ForMember(dest => dest.OwnerTitle, opt =>
            {
                opt.ResolveUsing(u => u.Owner.Title);
            }).ForMember(dest => dest.OwnerId, opt =>
            {
                opt.ResolveUsing(u => u.Owner.Id);
            }).ForMember(dest => dest.EmployeeNumber, opt =>
            {
                opt.ResolveUsing(u => u.Owner.EmployeeNumber);
            }).ForMember(dest => dest.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Owner.Photos.FirstOrDefault(p => p.IsMain).Url);
            });

            CreateMap<GoalType, GoalTypeToReturnDto>();

            CreateMap<GoalForCreationDto, Goal>();

            CreateMap<GoalForUpdateDto, Goal>();

            CreateMap<Goal, GoalToReturnDto>();
        }
    }
}