using SuppliesDotCom.Common.Interfaces;
using SuppliesDotCom.Model.CustomModel;
using Omu.ValueInjecter;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SuppliesDotCom.Bal.Mapper
{
    public interface IMapper<TModel, TEditViewModel>
        where TModel : class, new()
        where TEditViewModel : new()
    {
        TEditViewModel MapModelToViewModel(TModel model);
        TModel MapViewModelToModel(TEditViewModel editViewModel, TModel model);
    }

    public class Mapper<TModel, TEditViewModel> : IMapper<TModel, TEditViewModel>
        where TModel : class, new()
        where TEditViewModel : new()
    {
        public virtual TEditViewModel MapModelToViewModel(TModel model)
        {
            var editViewModel = new TEditViewModel();
            editViewModel.InjectFrom(model)
                .InjectFrom<NormalToNullables>(model)
                .InjectFrom<EntitiesToInts>(model);
            return editViewModel;
        }
        public virtual TModel MapViewModelToModel(TEditViewModel editViewModel)
        {
            var model = new TModel();
            model.InjectFrom(editViewModel)
                .InjectFrom<IntsToEntities>(editViewModel)
               .InjectFrom<NullablesToNormal>(editViewModel);
            return model;
        }
        public virtual TModel MapViewModelToModel(TEditViewModel editViewModel, TModel model)
        {
            model.InjectFrom(editViewModel)
                .InjectFrom<IntsToEntities>(editViewModel)
               .InjectFrom<NullablesToNormal>(editViewModel);
            return model;
        }
    }

    public class EntitiesToInts : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            if (c.SourceProp.Name != c.TargetProp.Name) return false;
            var s = c.SourceProp.Type;
            var t = c.TargetProp.Type;

            if (!s.IsGenericType || !t.IsGenericType
                || s.GetGenericTypeDefinition() != typeof(ICollection<>)
                || t.GetGenericTypeDefinition() != typeof(IEnumerable<>)) return false;

            bool isMatch = t.GetGenericArguments()[0] == (typeof(int))
                   && (s.GetGenericArguments()[0].IsSubclassOf(typeof(BaseModel)));
            return isMatch;
        }

        protected override object SetValue(ConventionInfo c)
        {
            object value = c.SourceProp.Value == null ? null : (c.SourceProp.Value as IEnumerable<BaseModel>).Select(o => o);
            return value;
        }
    }

    public class IntsToEntities : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            if (c.SourceProp.Name != c.TargetProp.Name) return false;
            var s = c.SourceProp.Type;
            var t = c.TargetProp.Type;

            if (!s.IsGenericType || !t.IsGenericType
                || s.GetGenericTypeDefinition() != typeof(IEnumerable<>)
                || t.GetGenericTypeDefinition() != typeof(ICollection<>)) return false;

            return s.GetGenericArguments()[0] == (typeof(int))
                   && (t.GetGenericArguments()[0].IsSubclassOf(typeof(BaseModel)));
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Value == null) return null;
            var T = c.TargetProp.Type.GetGenericArguments()[0];
            dynamic repo = typeof(IDataRepository<>).MakeGenericType(T);
            dynamic list = Activator.CreateInstance(typeof(List<>).MakeGenericType(T));

            foreach (var i in ((IEnumerable<int>)c.SourceProp.Value))
            {
                list.Add(repo.Get(i));
            }

            return list;
        }
    }
    public class NormalToNullables : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            //ignore int = 0 and DateTime = to 1/01/0001
            if (c.SourceProp.Type == typeof(DateTime) && (DateTime)c.SourceProp.Value == default(DateTime) ||
                (c.SourceProp.Type == typeof(int) && (int)c.SourceProp.Value == default(int)))
                return false;

            return (c.SourceProp.Name == c.TargetProp.Name &&
                    c.SourceProp.Type == Nullable.GetUnderlyingType(c.TargetProp.Type));
        }
    }

    public class NullablesToNormal : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name &&
                   Nullable.GetUnderlyingType(c.SourceProp.Type) == c.TargetProp.Type;
        }
    }



    public class EntityToNullInt : LoopValueInjection
    {
        protected override bool TypesMatch(Type sourceType, Type targetType)
        {
            return sourceType.IsSubclassOf(typeof(BaseModel)) && targetType == typeof(int?);
        }

        protected override object SetValue(object v)
        {
            if (v == null) return null;
            return (v as BaseModel);
        }
    }
}
