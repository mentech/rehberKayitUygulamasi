using System.Web;
using System.Web.Mvc;

namespace rehberKayitUygulamasi
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
