using System.Linq;
using System.Web.Mvc;
using rehberKayitUygulamasi.Models;


namespace rehberKayitUygulamasi.Controllers
{
    public class RehberController : Controller
    {
        
        dbRehberimEntities db = new dbRehberimEntities();
        
        // var olan bütün kayıtları gösterir
        public ActionResult Index()
        {
           var kayitlistesi= db.tblKayitlars.ToList();

            return View(kayitlistesi);
        }
        
        [HttpGet]
        //yeni kayıt isteği atılınca çalışır
        public ActionResult kayitFormu()
        {
            
            return View(new tblKayitlar());
        }
        
        [ValidateAntiForgeryToken]
        [HttpPost]
        //post isteği atılırsa çalışır
        public ActionResult kayitFormu(tblKayitlar kayit)
        {
            if (!ModelState.IsValid)
            {
                return View(kayit);
            }
            if (kayit.Id==0)
            {
                
                var kayitZatenVar = from b in db.tblKayitlars
                            where (b.tel==kayit.tel)
                            select b;
                //yeni kaydedilecek kaydın tel numarasının zaten var olup olmadığını kontrol eder
                if (kayitZatenVar.Count()==0)
                {
                    
                    db.tblKayitlars.Add(kayit);
                }
                else
                {

                    ViewBag.HtmlStr = "Bu telefon numarası " + kayitZatenVar.First().ad + " adı ile zaten kayıtlı!";
                    return View("kayitFormu", kayit);
                }
                
            }
            else
            {
                //numara zaten kayıtlı mı değil mi kontrol için 
                var kayitZatenVar = from b in db.tblKayitlars
                                    where (b.tel == kayit.tel)
                                    select b;
                var guncellenecekKayit = db.tblKayitlars.Find(kayit.Id);

                // hiç değişiklik yapmadan kaydedilirse çalışır, sql e ikide bir istek atmaya gerek yok :) 
                if (kayit==kayitZatenVar.First())
                {
                    
                    return RedirectToAction("Index");
                }
                //aynı kayıt güncellenecekse çalışır
                else if (kayitZatenVar.Count() != 0 && kayitZatenVar.First().Id!=guncellenecekKayit.Id)
                {

                    ViewBag.HtmlStr = "Bu telefon numarası "+kayitZatenVar.First().ad +" adı ile zaten kayıtlı!";
                    return View("kayitFormu", kayit);
                }
                //url den id si olmayan bir model atılırsa çalışır
                else if (guncellenecekKayit==null)
                {
                    return HttpNotFound();
                }
                guncellenecekKayit.ad = kayit.ad;
                guncellenecekKayit.soyAd = kayit.soyAd;
                guncellenecekKayit.tel = kayit.tel;
            }
            
            db.SaveChanges();

            return RedirectToAction("Index","Rehber");
        }
        
        //formda düzenle butonuna basılınca bu method çağırılır
        public ActionResult guncelle(int id)
        {
            var kayit = db.tblKayitlars.Find(id);
            if (kayit==null)
            {
                return HttpNotFound();
            }

            return View("kayitFormu",kayit);
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        //token ile korumalı kayıt silme methodu
        public ActionResult sil(int id)
        {
            try
            {
                db.tblKayitlars.Remove(db.tblKayitlars.Find(id));
                db.SaveChanges();
            }
            catch (System.Exception)
            {

               
            }
           

            return RedirectToAction("Index", "Rehber");
        }
        
    }
}