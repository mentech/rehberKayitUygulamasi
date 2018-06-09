//--stackowerflow dan bulduğum textbox'a sadece int girmeye izin veren function -------------------------------------->
   
        function isNumberKey(evt) {
            var charCode = (evt.which) ? evt.which : event.keyCode;
            if (charCode != 46 && charCode > 31
                && (charCode < 48 || charCode > 57))
                return false;

            return true;
        }

// detayın dibi: eğer kullanıcı zaten kayıtlı olan bir tel numarasını başka adla kaydetmeye çalışırsa hata mesajı gösterilir
// sonrasında tel numarasını veya ad kısmını silip tekrar kaydetmeye çalışırsa
// client tarafında kontroller yapılacağı için bu hata mesajınında servise gitmeden gösterilmemesi için yazılmıştır :)

function hataMesajiniSil() {
    document.getElementById("msj").style.display = "none";
}


// search için jquery nin datatable'ını kullandım
$(function () {
    var clientTablosu = $("#tblKayitlar").DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        
        "language": {
           // json u manuel çekip kullandım "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"

            "sProcessing": "İşleniyor...",
            "sLengthMenu": "Sayfada _MENU_ Kayıt Göster",
            "sZeroRecords": "Rehberinizde Arama Sonucuna Göre Eşleşen Kayıt Bulunmadı ",
            "sInfo": "  _TOTAL_ Kayıttan _START_ - _END_ Arası Kayıtlar",
            "sInfoEmpty": "Kayıt Yok",
            "sInfoFiltered": "( _MAX_ Kayıt İçerisinden Bulunan)",
            "sInfoPostFix": "",
            "sSearch": "Arama:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "İlk",
                "sPrevious": "Önceki",
                "sNext": "Sonraki",
                "sLast": "Son"
            }
        }
    });
    $("#tblKayitlar").on("click", ".btnkaydiSil", function () {
        var isim = $(this).data("isim");
        var btn = $(this);
        bootbox.confirm(isim+ " adlı kaydı silmek istediğinizden emin misiniz?", function (result) {
            if (result)
            {
                var form = $('#__AjaxAntiForgeryForm');
                var token = $('input[name="__RequestVerificationToken"]', form).val();
                
                var id = btn.data("id");
                $.ajax({
                    
                    type: "POST",
                    url: '/rehber/sil/' + id,
                    dataType: "html",
                    data: {
                        __RequestVerificationToken: token,
                        
                    },
                    
                    success: function () {
                        $(this).closest("tr").remove();
                        btn.parent().parent().remove();
                        
                        console.log("kayıt silidni");
                                              
                    }
                });
            }
        })
    });
    
});

