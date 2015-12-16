﻿#pragma warning disable 1591
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ASP
{
    using System;
    using System.Collections.Generic;
    
    #line 3 "..\..\Signum\Views\SearchControl.cshtml"
    using System.Configuration;
    
    #line default
    #line hidden
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Text;
    using System.Web;
    using System.Web.Helpers;
    using System.Web.Mvc;
    using System.Web.Mvc.Ajax;
    using System.Web.Mvc.Html;
    using System.Web.Routing;
    using System.Web.Security;
    using System.Web.UI;
    using System.Web.WebPages;
    
    #line 5 "..\..\Signum\Views\SearchControl.cshtml"
    using Newtonsoft.Json;
    
    #line default
    #line hidden
    
    #line 2 "..\..\Signum\Views\SearchControl.cshtml"
    using Signum.Engine.DynamicQuery;
    
    #line default
    #line hidden
    using Signum.Entities;
    
    #line 1 "..\..\Signum\Views\SearchControl.cshtml"
    using Signum.Entities.DynamicQuery;
    
    #line default
    #line hidden
    
    #line 4 "..\..\Signum\Views\SearchControl.cshtml"
    using Signum.Entities.Reflection;
    
    #line default
    #line hidden
    using Signum.Utilities;
    using Signum.Web;
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("RazorGenerator", "2.0.0.0")]
    [System.Web.WebPages.PageVirtualPathAttribute("~/Signum/Views/SearchControl.cshtml")]
    public partial class _Signum_Views_SearchControl_cshtml : System.Web.Mvc.WebViewPage<Context>
    {
        public _Signum_Views_SearchControl_cshtml()
        {
        }
        public override void Execute()
        {
            
            #line 7 "..\..\Signum\Views\SearchControl.cshtml"
   
    Model.ReadOnly = false; /*SearchControls Context should never inherit Readonly property of parent context */
    FindOptions findOptions = (FindOptions)ViewData[ViewDataKeys.FindOptions];
    QueryDescription queryDescription = (QueryDescription)ViewData[ViewDataKeys.QueryDescription];
    var entityColumn = queryDescription.Columns.SingleEx(a => a.IsEntity);
    Type entitiesType = Lite.Extract(entityColumn.Type);
    Implementations implementations = entityColumn.Implementations.Value;
    var settings = Finder.QuerySettings(findOptions.QueryName);
    findOptions.Pagination = findOptions.Pagination ?? settings.Pagination ?? FindOptions.DefaultPagination;
    
    ViewData[ViewDataKeys.FindOptions] = findOptions;

    var prefix = Model.Compose("sfSearchControl");

            
            #line default
            #line hidden
WriteLiteral("\r\n<div");

WriteAttribute("id", Tuple.Create(" id=\"", 981), Tuple.Create("\"", 993)
            
            #line 21 "..\..\Signum\Views\SearchControl.cshtml"
, Tuple.Create(Tuple.Create("", 986), Tuple.Create<System.Object, System.Int32>(prefix
            
            #line default
            #line hidden
, 986), false)
);

WriteLiteral(" \r\n     class=\"sf-search-control SF-control-container\"");

WriteLiteral(" \r\n     data-prefix=\"");

            
            #line 23 "..\..\Signum\Views\SearchControl.cshtml"
             Write(Model.Prefix);

            
            #line default
            #line hidden
WriteLiteral("\"");

WriteLiteral(" \r\n     data-find-url=\"");

            
            #line 24 "..\..\Signum\Views\SearchControl.cshtml"
               Write(Finder.FindRoute(findOptions.QueryName));

            
            #line default
            #line hidden
WriteLiteral("\"");

WriteLiteral(" \r\n     data-queryName=\"");

            
            #line 25 "..\..\Signum\Views\SearchControl.cshtml"
                Write(QueryUtils.GetKey(findOptions.QueryName));

            
            #line default
            #line hidden
WriteLiteral("\"");

WriteLiteral(" \r\n     >\r\n");

            
            #line 27 "..\..\Signum\Views\SearchControl.cshtml"
    
            
            #line default
            #line hidden
            
            #line 27 "..\..\Signum\Views\SearchControl.cshtml"
     if (settings.SimpleFilterBuilder != null)
    {
        findOptions.ShowFilters = false;

            
            #line default
            #line hidden
WriteLiteral("        <div");

WriteAttribute("id", Tuple.Create(" id=\"", 1333), Tuple.Create("\"", 1374)
            
            #line 30 "..\..\Signum\Views\SearchControl.cshtml"
, Tuple.Create(Tuple.Create("", 1338), Tuple.Create<System.Object, System.Int32>(Model.Compose("simpleFilerBuilder")
            
            #line default
            #line hidden
, 1338), false)
);

WriteLiteral(" class=\"form-horizontal\"");

WriteLiteral(">\r\n");

WriteLiteral("            ");

            
            #line 31 "..\..\Signum\Views\SearchControl.cshtml"
       Write(settings.SimpleFilterBuilder.Control(Html, Model, queryDescription));

            
            #line default
            #line hidden
WriteLiteral("\r\n        </div>\r\n");

            
            #line 33 "..\..\Signum\Views\SearchControl.cshtml"
    }

            
            #line default
            #line hidden
WriteLiteral("\r\n");

            
            #line 35 "..\..\Signum\Views\SearchControl.cshtml"
    
            
            #line default
            #line hidden
            
            #line 35 "..\..\Signum\Views\SearchControl.cshtml"
      
        bool filtersAlwaysHidden = !findOptions.ShowHeader || !findOptions.ShowFilters && !findOptions.ShowFilterButton;
    
            
            #line default
            #line hidden
WriteLiteral("\r\n\r\n    <div");

WriteAttribute("style", Tuple.Create(" style=\"", 1656), Tuple.Create("\"", 1713)
, Tuple.Create(Tuple.Create("", 1664), Tuple.Create("display:", 1664), true)
            
            #line 39 "..\..\Signum\Views\SearchControl.cshtml"
, Tuple.Create(Tuple.Create("", 1672), Tuple.Create<System.Object, System.Int32>(filtersAlwaysHidden ? "none" : "block"
            
            #line default
            #line hidden
, 1672), false)
);

WriteLiteral(">\r\n");

            
            #line 40 "..\..\Signum\Views\SearchControl.cshtml"
        
            
            #line default
            #line hidden
            
            #line 40 "..\..\Signum\Views\SearchControl.cshtml"
          
            ViewData[ViewDataKeys.FilterOptions] = findOptions.FilterOptions;
            ViewData[ViewDataKeys.FiltersVisible] = findOptions.ShowFilters;
            ViewData[ViewDataKeys.ShowAddColumn] = string.IsNullOrEmpty(Model.Prefix) && findOptions.AllowChangeColumns;
            Html.RenderPartial(Finder.Manager.FilterBuilderView); 
        
            
            #line default
            #line hidden
WriteLiteral("\r\n    </div>\r\n\r\n\r\n\r\n\r\n    <div");

WriteLiteral(" class=\"sf-query-button-bar\"");

WriteAttribute("style", Tuple.Create(" style=\"", 2143), Tuple.Create("\"", 2200)
            
            #line 51 "..\..\Signum\Views\SearchControl.cshtml"
, Tuple.Create(Tuple.Create("", 2151), Tuple.Create<System.Object, System.Int32>(findOptions.ShowHeader ? null : "display:none"
            
            #line default
            #line hidden
, 2151), false)
);

WriteLiteral(">\r\n");

            
            #line 52 "..\..\Signum\Views\SearchControl.cshtml"
        
            
            #line default
            #line hidden
            
            #line 52 "..\..\Signum\Views\SearchControl.cshtml"
         if (!filtersAlwaysHidden)
        {

            
            #line default
            #line hidden
WriteLiteral("            <a");

WriteAttribute("class", Tuple.Create("  class=\"", 2265), Tuple.Create("\"", 2366)
, Tuple.Create(Tuple.Create("", 2274), Tuple.Create("sf-query-button", 2274), true)
, Tuple.Create(Tuple.Create(" ", 2289), Tuple.Create("sf-filters-header", 2290), true)
, Tuple.Create(Tuple.Create(" ", 2307), Tuple.Create("btn", 2308), true)
, Tuple.Create(Tuple.Create(" ", 2311), Tuple.Create("btn-default", 2312), true)
            
            #line 54 "..\..\Signum\Views\SearchControl.cshtml"
, Tuple.Create(Tuple.Create(" ", 2323), Tuple.Create<System.Object, System.Int32>(findOptions.ShowFilters ? "active" : ""
            
            #line default
            #line hidden
, 2324), false)
);

WriteAttribute("onclick", Tuple.Create("\r\n            onclick=\"", 2367), Tuple.Create("\"", 2442)
            
            #line 55 "..\..\Signum\Views\SearchControl.cshtml"
, Tuple.Create(Tuple.Create("", 2390), Tuple.Create<System.Object, System.Int32>(JsFunction.SFControlThen(prefix, "toggleFilters()")
            
            #line default
            #line hidden
, 2390), false)
);

WriteAttribute("title", Tuple.Create("\r\n            title=\"", 2443), Tuple.Create("\"", 2584)
            
            #line 56 "..\..\Signum\Views\SearchControl.cshtml"
, Tuple.Create(Tuple.Create("", 2464), Tuple.Create<System.Object, System.Int32>(findOptions.ShowFilters ? JavascriptMessage.hideFilters.NiceToString() : JavascriptMessage.showFilters.NiceToString()
            
            #line default
            #line hidden
, 2464), false)
);

WriteLiteral(">\r\n                <span");

WriteLiteral(" class=\"glyphicon glyphicon glyphicon-filter\"");

WriteLiteral("></span>\r\n            </a>\r\n");

            
            #line 59 "..\..\Signum\Views\SearchControl.cshtml"
        }

            
            #line default
            #line hidden
WriteLiteral("        <button");

WriteLiteral(" type=\"button\"");

WriteLiteral(" class=\"sf-query-button sf-search btn btn-primary\"");

WriteAttribute("id", Tuple.Create(" id=\"", 2772), Tuple.Create("\"", 2803)
            
            #line 60 "..\..\Signum\Views\SearchControl.cshtml"
    , Tuple.Create(Tuple.Create("", 2777), Tuple.Create<System.Object, System.Int32>(Model.Compose("qbSearch")
            
            #line default
            #line hidden
, 2777), false)
);

WriteLiteral(">");

            
            #line 60 "..\..\Signum\Views\SearchControl.cshtml"
                                                                                                           Write(SearchMessage.Search.NiceToString());

            
            #line default
            #line hidden
WriteLiteral("</button>\r\n        <script");

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral(">\r\n            $(\"#");

            
            #line 62 "..\..\Signum\Views\SearchControl.cshtml"
           Write(Model.Compose("qbSearch"));

            
            #line default
            #line hidden
WriteLiteral("\").click(function(e){ $(\"#");

            
            #line 62 "..\..\Signum\Views\SearchControl.cshtml"
                                                               Write(Model.Compose("sfSearchControl"));

            
            #line default
            #line hidden
WriteLiteral("\").SFControl().then(function(c){c.search();}) });\r\n            $(\"#");

            
            #line 63 "..\..\Signum\Views\SearchControl.cshtml"
           Write(Model.Compose("tblFilterBuilder"));

            
            #line default
            #line hidden
WriteLiteral("\").keyup(function(e){ if (e.which == 13) { $(\"#");

            
            #line 63 "..\..\Signum\Views\SearchControl.cshtml"
                                                                                            Write(Model.Compose("qbSearch"));

            
            #line default
            #line hidden
WriteLiteral("\").click(); } });\r\n        </script>\r\n\r\n");

            
            #line 66 "..\..\Signum\Views\SearchControl.cshtml"
        
            
            #line default
            #line hidden
            
            #line 66 "..\..\Signum\Views\SearchControl.cshtml"
         if (findOptions.Create)
        {

            
            #line default
            #line hidden
WriteLiteral("            <a");

WriteLiteral(" class=\"sf-query-button btn btn-default sf-line-button sf-create\"");

WriteAttribute("id", Tuple.Create(" id=\"", 3332), Tuple.Create("\"", 3369)
            
            #line 68 "..\..\Signum\Views\SearchControl.cshtml"
    , Tuple.Create(Tuple.Create("", 3337), Tuple.Create<System.Object, System.Int32>(Model.Compose("qbSearchCreate")
            
            #line default
            #line hidden
, 3337), false)
);

WriteAttribute("title", Tuple.Create(" title=\"", 3370), Tuple.Create("\"", 3534)
            
            #line 68 "..\..\Signum\Views\SearchControl.cshtml"
                                             , Tuple.Create(Tuple.Create("", 3378), Tuple.Create<System.Object, System.Int32>(SearchMessage.CreateNew0_G.NiceToString().ForGenderAndNumber().FormatWith(implementations.IsByAll ? "?" : implementations.Types.CommaOr(a => a.NiceName()))
            
            #line default
            #line hidden
, 3378), false)
);

WriteAttribute("onclick", Tuple.Create(" onclick=\"", 3535), Tuple.Create("\"", 3601)
            
            #line 68 "..\..\Signum\Views\SearchControl.cshtml"
                                                                                                                                                                                                                    , Tuple.Create(Tuple.Create("", 3545), Tuple.Create<System.Object, System.Int32>(JsFunction.SFControlThen(prefix, "create_click(event)")
            
            #line default
            #line hidden
, 3545), false)
);

WriteLiteral(">\r\n                <span");

WriteLiteral(" class=\"glyphicon glyphicon-plus\"");

WriteLiteral("></span>\r\n            </a>\r\n");

            
            #line 71 "..\..\Signum\Views\SearchControl.cshtml"
        }

            
            #line default
            #line hidden
WriteLiteral("\r\n");

            
            #line 73 "..\..\Signum\Views\SearchControl.cshtml"
        
            
            #line default
            #line hidden
            
            #line 73 "..\..\Signum\Views\SearchControl.cshtml"
         if (findOptions.ShowContextMenu)
        {


            
            #line default
            #line hidden
WriteLiteral("            <div");

WriteLiteral(" class=\"btn-group\"");

WriteLiteral(">\r\n                <button");

WriteLiteral(" class=\"sf-query-button sf-tm-selected btn btn-default dropdown-toggle\"");

WriteLiteral(" data-toggle=\"dropdown\"");

WriteAttribute("id", Tuple.Create(" id=\"", 3910), Tuple.Create("\"", 3944)
            
            #line 77 "..\..\Signum\Views\SearchControl.cshtml"
                                          , Tuple.Create(Tuple.Create("", 3915), Tuple.Create<System.Object, System.Int32>(Model.Compose("btnSelected")
            
            #line default
            #line hidden
, 3915), false)
);

WriteLiteral(" disabled=\"disabled\"");

WriteLiteral(">\r\n");

WriteLiteral("                    ");

            
            #line 78 "..\..\Signum\Views\SearchControl.cshtml"
               Write(JavascriptMessage.Selected);

            
            #line default
            #line hidden
WriteLiteral("\r\n                    (<span");

WriteAttribute("id", Tuple.Create(" id=\"", 4043), Tuple.Create("\"", 4081)
            
            #line 79 "..\..\Signum\Views\SearchControl.cshtml"
, Tuple.Create(Tuple.Create("", 4048), Tuple.Create<System.Object, System.Int32>(Model.Compose("btnSelectedSpan")
            
            #line default
            #line hidden
, 4048), false)
);

WriteLiteral(">0</span>)\r\n                <span");

WriteLiteral(" class=\"caret\"");

WriteLiteral("></span>\r\n                </button>\r\n                <ul");

WriteLiteral(" class=\"dropdown-menu\"");

WriteAttribute("id", Tuple.Create(" id=\"", 4207), Tuple.Create("\"", 4249)
            
            #line 82 "..\..\Signum\Views\SearchControl.cshtml"
, Tuple.Create(Tuple.Create("", 4212), Tuple.Create<System.Object, System.Int32>(Model.Compose("btnSelectedDropDown")
            
            #line default
            #line hidden
, 4212), false)
);

WriteLiteral(">\r\n                    <li>Error: DropDown not initialized</li>\r\n                " +
"</ul>\r\n            </div>\r\n");

            
            #line 86 "..\..\Signum\Views\SearchControl.cshtml"
        }

            
            #line default
            #line hidden
WriteLiteral("\r\n");

WriteLiteral("        ");

            
            #line 88 "..\..\Signum\Views\SearchControl.cshtml"
   Write(ButtonBarQueryHelper.GetButtonBarElementsForQuery(new QueryButtonContext
       {
           Url = Url,
           ControllerContext = this.ViewContext,
           QueryName = findOptions.QueryName,
           ManualQueryButtons = (ToolBarButton[])ViewData[ViewDataKeys.ManualToolbarButtons],
           EntityType = entitiesType,
           Prefix = Model.Prefix
       }).ToStringButton(Html));

            
            #line default
            #line hidden
WriteLiteral("\r\n\r\n");

            
            #line 98 "..\..\Signum\Views\SearchControl.cshtml"
        
            
            #line default
            #line hidden
            
            #line 98 "..\..\Signum\Views\SearchControl.cshtml"
         if ((bool?)ViewData[ViewDataKeys.AvoidFullScreenButton] != true)
        { 

            
            #line default
            #line hidden
WriteLiteral("             <a");

WriteAttribute("id", Tuple.Create(" id=\"", 4888), Tuple.Create("\"", 4923)
            
            #line 100 "..\..\Signum\Views\SearchControl.cshtml"
, Tuple.Create(Tuple.Create("", 4893), Tuple.Create<System.Object, System.Int32>(Model.Compose("sfFullScreen")
            
            #line default
            #line hidden
, 4893), false)
);

WriteLiteral(" class=\"sf-query-button btn btn-default\"");

WriteLiteral(" href=\"#\"");

WriteLiteral(">\r\n                <span");

WriteLiteral(" class=\"glyphicon glyphicon-new-window\"");

WriteLiteral("></span>\r\n            </a>\r\n");

            
            #line 103 "..\..\Signum\Views\SearchControl.cshtml"
        }

            
            #line default
            #line hidden
WriteLiteral("\r\n    </div>\r\n    <div");

WriteAttribute("id", Tuple.Create(" id=\"", 5097), Tuple.Create("\"", 5130)
            
            #line 106 "..\..\Signum\Views\SearchControl.cshtml"
, Tuple.Create(Tuple.Create("", 5102), Tuple.Create<System.Object, System.Int32>(Model.Compose("divResults")
            
            #line default
            #line hidden
, 5102), false)
);

WriteLiteral(" class=\"sf-search-results-container table-responsive\"");

WriteLiteral(">\r\n        <table");

WriteAttribute("id", Tuple.Create(" id=\"", 5201), Tuple.Create("\"", 5234)
            
            #line 107 "..\..\Signum\Views\SearchControl.cshtml"
, Tuple.Create(Tuple.Create("", 5206), Tuple.Create<System.Object, System.Int32>(Model.Compose("tblResults")
            
            #line default
            #line hidden
, 5206), false)
);

WriteLiteral(" class=\"sf-search-results  table table-hover  table-condensed\"");

WriteLiteral(">\r\n            <thead>\r\n                <tr>\r\n");

            
            #line 110 "..\..\Signum\Views\SearchControl.cshtml"
                    
            
            #line default
            #line hidden
            
            #line 110 "..\..\Signum\Views\SearchControl.cshtml"
                     if (findOptions.AllowSelection)
                    {

            
            #line default
            #line hidden
WriteLiteral("                        <th");

WriteLiteral(" class=\"sf-th-selection\"");

WriteLiteral(">\r\n");

WriteLiteral("                            ");

            
            #line 113 "..\..\Signum\Views\SearchControl.cshtml"
                       Write(Html.CheckBox(Model.Compose("cbSelectAll"), false, new { onclick = JsFunction.SFControlThen(prefix, "toggleSelectAll()") }));

            
            #line default
            #line hidden
WriteLiteral("\r\n                        </th>\r\n");

            
            #line 115 "..\..\Signum\Views\SearchControl.cshtml"
                    }

            
            #line default
            #line hidden
WriteLiteral("                    ");

            
            #line 116 "..\..\Signum\Views\SearchControl.cshtml"
                     if (findOptions.Navigate)
                    {

            
            #line default
            #line hidden
WriteLiteral("                        <th");

WriteLiteral(" class=\"sf-th-entity\"");

WriteLiteral("></th>\r\n");

            
            #line 119 "..\..\Signum\Views\SearchControl.cshtml"
                    }

            
            #line default
            #line hidden
WriteLiteral("                    ");

            
            #line 120 "..\..\Signum\Views\SearchControl.cshtml"
                      List<Column> columns = findOptions.MergeColumns(); 
            
            #line default
            #line hidden
WriteLiteral("\r\n");

            
            #line 121 "..\..\Signum\Views\SearchControl.cshtml"
                    
            
            #line default
            #line hidden
            
            #line 121 "..\..\Signum\Views\SearchControl.cshtml"
                     foreach (var col in columns)
                    {
                        var order = findOptions.OrderOptions.FirstOrDefault(oo => oo.Token.FullKey() == col.Name);
                        OrderType? orderType = null;
                        if (order != null)
                        {
                            orderType = order.OrderType;
                        }
                        
            
            #line default
            #line hidden
            
            #line 129 "..\..\Signum\Views\SearchControl.cshtml"
                   Write(SearchControlHelper.Header(col, orderType));

            
            #line default
            #line hidden
            
            #line 129 "..\..\Signum\Views\SearchControl.cshtml"
                                                                   
                    }

            
            #line default
            #line hidden
WriteLiteral("                </tr>\r\n            </thead>\r\n            <tbody>\r\n");

            
            #line 134 "..\..\Signum\Views\SearchControl.cshtml"
                
            
            #line default
            #line hidden
            
            #line 134 "..\..\Signum\Views\SearchControl.cshtml"
                   int columnsCount = columns.Count + (findOptions.Navigate ? 1 : 0) + (findOptions.AllowSelection ? 1 : 0); 
            
            #line default
            #line hidden
WriteLiteral("\r\n                <tr>\r\n                    <td");

WriteAttribute("colspan", Tuple.Create(" colspan=\"", 6639), Tuple.Create("\"", 6662)
            
            #line 136 "..\..\Signum\Views\SearchControl.cshtml"
, Tuple.Create(Tuple.Create("", 6649), Tuple.Create<System.Object, System.Int32>(columnsCount
            
            #line default
            #line hidden
, 6649), false)
);

WriteLiteral(">");

            
            #line 136 "..\..\Signum\Views\SearchControl.cshtml"
                                           Write(JavascriptMessage.searchForResults.NiceToString());

            
            #line default
            #line hidden
WriteLiteral("</td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r" +
"\n\r\n");

            
            #line 142 "..\..\Signum\Views\SearchControl.cshtml"
    
            
            #line default
            #line hidden
            
            #line 142 "..\..\Signum\Views\SearchControl.cshtml"
      
        ViewData[ViewDataKeys.ShowFooter] = findOptions.ShowFooter;
        ViewData[ViewDataKeys.Pagination] = findOptions.Pagination;
        
            
            #line default
            #line hidden
            
            #line 145 "..\..\Signum\Views\SearchControl.cshtml"
   Write(Html.Partial(Finder.Manager.PaginationSelectorView, Model));

            
            #line default
            #line hidden
            
            #line 145 "..\..\Signum\Views\SearchControl.cshtml"
                                                                   
    
            
            #line default
            #line hidden
WriteLiteral("\r\n</div>\r\n<script");

WriteLiteral(" type=\"text/javascript\"");

WriteLiteral(">\r\n    require([\"");

            
            #line 149 "..\..\Signum\Views\SearchControl.cshtml"
         Write(JsModule.Finder);

            
            #line default
            #line hidden
WriteLiteral("\"], function(Finder) { new Finder.SearchControl($(\"#");

            
            #line 149 "..\..\Signum\Views\SearchControl.cshtml"
                                                                             Write(Model.Compose("sfSearchControl"));

            
            #line default
            #line hidden
WriteLiteral("\"),\r\n");

WriteLiteral("        ");

            
            #line 150 "..\..\Signum\Views\SearchControl.cshtml"
    Write(MvcHtmlString.Create(findOptions.ToJS(Model.Prefix).ToString()));

            
            #line default
            #line hidden
WriteLiteral(",\r\n");

WriteLiteral("        ");

            
            #line 151 "..\..\Signum\Views\SearchControl.cshtml"
   Write(Html.Json(implementations.ToJsTypeInfos(isSearch : true, prefix: prefix)));

            
            #line default
            #line hidden
WriteLiteral(",\r\n");

WriteLiteral("        ");

            
            #line 152 "..\..\Signum\Views\SearchControl.cshtml"
   Write(Html.Json(settings.SimpleFilterBuilder == null ? null : settings.SimpleFilterBuilder.Url(Url)));

            
            #line default
            #line hidden
WriteLiteral(").ready();});\r\n</script>\r\n");

        }
    }
}
#pragma warning restore 1591
