using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace SuppliesDotCom.Common
{
    public static class HtmlExtensions
    {
        public static MvcHtmlString ValidatedEditorFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression)
        {
            if (htmlHelper.ViewData.ModelMetadata.ModelType == null)
            {
                return new MvcHtmlString(String.Empty);
            }

            TagBuilder tagBuilder = new TagBuilder("input");
            var name = ExpressionHelper.GetExpressionText(expression);
            string validation = String.Empty;
            //Try to get the attributes for the property
            Object[] objects = typeof(TModel).GetProperty(name).GetCustomAttributes(true);
            foreach (Attribute attribute in objects)
            {
                if (attribute.GetType() == typeof(RequiredAttribute))
                {
                    validation += "validate[required]";
                }
                if (attribute.GetType() == typeof(RangeAttribute))
                {
                    var min = ((RangeAttribute)attribute).Minimum;
                    var max = ((RangeAttribute)attribute).Maximum;
                    validation += String.Format("validate[required, min[{0}],max[{1}]]", min, max);
                }
                if (attribute.GetType() == typeof(StringLengthAttribute))
                {
                    var minimumLength = ((StringLengthAttribute)attribute).MinimumLength;
                    var maximumLength = ((StringLengthAttribute)attribute).MaximumLength;
                    string validator = String.Format("maxSize[{0}]", maximumLength);

                    if (minimumLength >= 0)
                    {
                        validator += String.Format(",minSize[{0}]", minimumLength);
                    }
                    validation += String.Format("validate[required, {0}", validator);
                }
            }

            tagBuilder.GenerateId(name);
            tagBuilder.AddCssClass(validation);
            return new MvcHtmlString(tagBuilder.ToString());
        }

        /// <summary>
        /// Text Box For
        /// </summary>
        /// <typeparam name="TModel"></typeparam>
        /// <typeparam name="TProperty"></typeparam>
        /// <param name="htmlHelper"></param>
        /// <param name="expression"></param>
        /// <returns></returns>
        public static MvcHtmlString TextBoxForWithValidation<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression)
        {
            var metaData = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);
            var controlID = ExpressionHelper.GetExpressionText(expression);

            var fieldValidation = ApplyFieldValidationMetadata(htmlHelper, metaData, controlID);

            var tagBuilder = new TagBuilder("input");
            var validationBuilder = new StringBuilder("validate[");

            foreach (var rule in fieldValidation.ValidationRules)
            {
                switch (rule.ValidationType)
                {
                    case "required":
                        validationBuilder.AppendFormat("{0}", rule.ValidationType);
                        break;
                    case "range":
                        validationBuilder.AppendFormat(",custom[integer]");
                        if (rule.ValidationParameters["min"] != null)
                        {
                            validationBuilder.AppendFormat("min[{0}", rule.ValidationParameters["min"]);
                        }
                        if (rule.ValidationParameters["max"] != null)
                        {
                            validationBuilder.AppendFormat("max[{0}", rule.ValidationParameters["max"]);
                        }
                        break;
                }
            }
            validationBuilder.Append("]");

            tagBuilder.MergeAttribute("class", validationBuilder.ToString());
            tagBuilder.GenerateId(controlID);
            tagBuilder.MergeAttribute("type", "text");

            return new MvcHtmlString(tagBuilder.ToString());
        }

        /// <summary>
        /// Apply Field Validation Meta Data
        /// </summary>
        /// <param name="htmlHelper"></param>
        /// <param name="modelMetadata"></param>
        /// <param name="modelName"></param>
        /// <returns></returns>
        private static FieldValidationMetadata ApplyFieldValidationMetadata(HtmlHelper htmlHelper, ModelMetadata modelMetadata, string modelName)
        {
            FormContext formContext = htmlHelper.ViewContext.FormContext;
            FieldValidationMetadata fieldMetadata = formContext.GetValidationMetadataForField(modelName, true /* createIfNotFound */);

            // write rules to context object
            IEnumerable<ModelValidator> validators = ModelValidatorProviders.Providers.GetValidators(modelMetadata, htmlHelper.ViewContext);
            foreach (ModelClientValidationRule rule in validators.SelectMany(v => v.GetClientValidationRules()))
            {
                fieldMetadata.ValidationRules.Add(rule);
            }

            return fieldMetadata;
        }

        /// <summary>
        /// Gets the order by expression.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sortColumn">The sort column.</param>
        /// <returns></returns>
        public static Func<T, object> GetOrderByExpression<T>(string sortColumn)
        {
            Func<T, object> orderByExpr = null;
            if (!String.IsNullOrEmpty(sortColumn))
            {
                Type sponsorResultType = typeof(T);

                if (sponsorResultType.GetProperties().Any(prop => prop.Name == sortColumn))
                {
                    System.Reflection.PropertyInfo pinfo = sponsorResultType.GetProperty(sortColumn);
                    orderByExpr = (data => pinfo.GetValue(data, null));
                }
            }
            return orderByExpr;
        }

        /// <summary>
        /// Orders the by dir.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source">The source.</param>
        /// <param name="dir">The dir.</param>
        /// <param name="OrderByColumn">The order by column.</param>
        /// <returns></returns>
        public static List<T> OrderByDir<T>(IEnumerable<T> source, string dir, Func<T, object> OrderByColumn)
        {
            return dir.ToUpper() == "ASC"
                ? source.OrderBy(OrderByColumn).ToList()
                : source.OrderByDescending(OrderByColumn).ToList();
        }
    }
}