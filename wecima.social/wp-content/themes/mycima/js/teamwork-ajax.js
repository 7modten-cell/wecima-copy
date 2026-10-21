jQuery(document).ready(function($) {
    var perPage = 6; // عدد العناصر المراد إظهارها في كل مرة
    var offset = $('.Inner--List--Teamwork li').length; // عدد العناصر المعروضة حاليًا

    $('.MoreTeamworkList').on('click', function() {
        var button = $(this);
        var postID = button.data('term');

        $.ajax({
            url: ajaxurl, // ووردبريس يتعرف على هذا المتغير تلقائيًا
            type: 'POST',
            data: {
                action: 'load_more_teamwork',
                post_id: postID,
                offset: offset,
                per_page: perPage
            },
            success: function(response) {
                if (response === 'no_more') {
                    button.text('لا يوجد المزيد'); // تغيير نص الزر عند عدم وجود المزيد من العناصر
                    button.addClass('disabled'); // إضافة فئة لتعطيل النمط إذا لزم الأمر
                } else {
                    $('.Inner--List--Teamwork').append(response);
                    offset += perPage; // تحديث الـ offset بعد إضافة العناصر الجديدة
                }
            }
        });
    });
});
