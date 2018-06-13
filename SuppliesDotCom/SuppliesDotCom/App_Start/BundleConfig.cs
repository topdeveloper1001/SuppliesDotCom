using SuppliesDotCom.Common;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Optimization;

namespace SuppliesDotCom
{
    public class BundleConfig
    {
        /// <summary>
        /// Registers the bundles.
        /// </summary>
        /// <param name="bundles">The bundles.</param>
        public static void RegisterBundles(BundleCollection bundles)
        {
            var ticks = Helpers.CurrentAssemblyTicks;

            BundleTable.EnableOptimizations = false;
            //bundles.Add(new ScriptBundle("~/bundles/scripts").IncludeDirectory("~/Scripts", "*.js", true));

            bundles.Add(new ScriptBundle("~/bundles/jqCalender").Include(
                     "~/Scripts/jquery.datetimepicker.js"
                     ));

            bundles.Add(new StyleBundle("~/Content/cssCalender").Include(
                     "~/Content/jquery.datetimepicker.css"
                     ));

            //bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
            //            "~/Content/themes/base/jquery.ui.core.css",
            //            "~/Content/themes/base/jquery.ui.resizable.css",
            //            "~/Content/themes/base/jquery.ui.selectable.css",
            //            "~/Content/themes/base/jquery.ui.accordion.css",
            //            "~/Content/themes/base/jquery.ui.autocomplete.css",
            //            "~/Content/themes/base/jquery.ui.button.css",
            //            "~/Content/themes/base/jquery.ui.dialog.css",
            //            "~/Content/themes/base/jquery.ui.slider.css",
            //            "~/Content/themes/base/jquery.ui.tabs.css",
            //            "~/Content/themes/base/jquery.ui.datepicker.css",
            //            "~/Content/themes/base/jquery.ui.progressbar.css",
            //            "~/Content/themes/base/jquery.ui.theme.css"));
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                     "~/Scripts/bootstrap.js"));

            //---------------------- Start of Kendo Files ----------------------
            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //"~/Scripts/Kendo/jquery.*"));
            bundles.Add(new ScriptBundle("~/bundles/kendo").Include(
                "~/Scripts/Kendo/kendo.all.min.js",
                     "~/Scripts/Kendo/kendo.aspnetmvc.min.js",
                "~/Scripts/Kendo/kendo.timezones.min.js"

                     ));

            bundles.Add(new StyleBundle("~/Content/kendo/css").Include(
                     "~/Content/web/kendo.common.min.css",
                     "~/Content/web/kendo.default.min.css",
                     "~/Content/web/kendo.default.mobile.min.css"));
            //bundles.Add(new StyleBundle("~/Content/kendo/css").Include(
            //          "~/Content/web/kendo.common.min.css",
            //          "~/Content/web/kendo.dataviz.default.min.css",
            //          "~/Content/web/kendo.dataviz.min.css",
            //          "~/Content/web/kendo.rtl.min.css",
            //          "~/Content/web/kendo.default.min.css",
            //          "~/Content/web/kendo.default.mobile.min.css",
            //          "~/Content/dataviz/kendo.dataviz.min.css",
            //          "~/Content/dataviz/kendo.dataviz.default.min.css",
            //          "~/Content/mobile/kendo.mobile.all.min.css"));
            //bundles.Add(new StyleBundle("~/Content/mobile/css").Include(
            //            "~/Content/mobile/kendo.mobile.all.min.css"));
            //bundles.Add(new StyleBundle("~/Content/shared/css").Include(
            //            "~/Content/shared/examples-offline.css"));
            //---------------------- End of Kendo Files ----------------------

            bundles.Add(new StyleBundle("~/css/toastNotification/css").Include(
                "~/css/toastNotification/toastr.css"));

            //Bundle for club details
            bundles.Add(new ScriptBundle("~/Scripts/ToastNotification").Include(
                "~/Scripts/ToastNotification/Gruntfile.js",
                "~/Scripts/ToastNotification/karma.conf.js",
                "~/Scripts/ToastNotification/toastr.js"
                ));
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));


            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));


            bundles.Add(new StyleBundle("~/Content/bootstrap/css").Include(
                        "~/Content/css/bootstrap.css",
                        "~/Content/css/bootstrap-theme.css",
                        "~/Content/css/bootstrap-glyphicons.css",
                        "~/Content/css/style.css",
                        "~/Content/css/reset.css"
                        ));

            //newBundle.Orderer = new NonOrderingBundleOrderer();
            //bundles.Add(newBundle);

            bundles.Add(new ScriptBundle("~/bundles/pwd").Include("~/Scripts/jquery.showPassword.js"));
            bundles.Add(new StyleBundle("~/Content/bundles/pwd").Include("~/Content/pwd/screen.css"));


            bundles.IgnoreList.Clear();
        }

        class NonOrderingBundleOrderer : IBundleOrderer
        {
            public IEnumerable<BundleFile> OrderFiles(BundleContext context, IEnumerable<BundleFile> files)
            {
                return files;
            }
        }

        //public class AsIsBundleOrderer : IBundleOrderer
        //{
        //    public virtual IEnumerable<FileInfo> OrderFiles(BundleContext context, IEnumerable<FileInfo> files)
        //    {
        //        return files;
        //    }
        //}
    }
}