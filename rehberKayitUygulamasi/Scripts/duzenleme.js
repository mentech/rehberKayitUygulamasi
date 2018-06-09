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

$('#dataTables_empty').attr('color', 'red');

// search için jquery nin datatable'ını kullandım
$(function () {
    $("#tblKayitlar").DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        "bAutoWidth": false,
        "language": {
           // json u manuel çekip kullandım "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"

            "sProcessing": "İşleniyor...",
            "sLengthMenu": "Sayfada _MENU_ Kayıt Göster",
            "sZeroRecords": "Rehberinizde bu şekilde kayıtlı birisi bulunamadı. said reiz başkannnnn için  tıklayın ",
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
            if (result) {

                var id = btn.data("id");
                $.ajax({
                    type: "GET",
                    URL: "/rehber/sil/" + id,
                    success: function () {
                        btn.parent().parent().remove();
                        URL: "/rehber/sil/" + id
                    }
                });
            }
        })
    });
});