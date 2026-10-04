$(document).ready(function ($) {
    // جلب البيانات من ملف content.json وتعبئتها ديناميكياً
    $.getJSON('content.json', function (data) {
        // 1. الإحصائيات
        $('#stat_1_number').text(data.stat_1_number);
        $('#stat_1_text').text(data.stat_1_text);
        $('#stat_2_number').text(data.stat_2_number);
        $('#stat_2_text').text(data.stat_2_text);
        $('#stat_3_number').text(data.stat_3_number);
        $('#stat_3_text').text(data.stat_3_text);

        // تفعيل العدادات بعد جلب الأرقام
        $('.counter').counterUp({
            delay: 10,
            time: 1200
        });

        // 2. الهيرو (الرئيسية)
        $('#hero_title').text(data.hero_title);
        $('#hero_text').text(data.hero_text);
        $('#hero_image').attr('src', data.hero_image);

        // 3. من نحن
        $('#about_p1').text(data.about_p1);
        $('#about_p2').text(data.about_p2);
        $('#about_p3').text(data.about_p3);
        $('#about_image').attr('src', data.about_image);

        // 4. الخدمات (السلايدر) ديناميكياً
        let servicesHtml = '';
        data.services.forEach(service => {
            servicesHtml += `
                <div class="item bg-white border border-gray-300 rounded-lg p-5 shadow-lg flex flex-col justify-between h-full min-h-95 sm:min-h-105">
                    <div>
                        <div class="mb-3 rounded-md overflow-hidden min-h-20">
                            <img src="${service.image}" alt="service" class="w-full h-full object-cover">
                        </div>
                        <strong class="text-xl text-third block mb-2">${service.title}</strong>
                        <p class="text-sm leading-relaxed">${service.description}</p>
                    </div>
                </div>
            `;
        });

        const $carousel = $('#services-carousel');
        $carousel.html(servicesHtml);

        // تفعيل السلايدر
        $carousel.owlCarousel({
            rtl: true,
            loop: true,
            margin: 20,
            nav: true,
            dots: true,
            touchDrag: true,
            center: true,
            navText: [
                '<i class="fa-solid fa-chevron-right"></i>',
                '<i class="fa-solid fa-chevron-left"></i>'
            ],
            responsive: {
                0: { items: 1, nav: false },
                768: { items: 2 },
                1000: { items: 3 }
            }
        });

        // 5. العنوان وساعات الدوام
        $('#address_location').text(data.address_location);
        $('#working_hours').text(data.working_hours);

        // 6. اتصل بنا (الهاتف والبريد)
        $('#phone_text').text(data.phone);
        $('#email_text').text(data.email);
    });
});

// side list var
const btnList = document.querySelector(".btn-list");
const ul = document.getElementById("nav-menu");
const xBtn = document.getElementById("x");

// side list 
if (btnList) {
    btnList.onclick = () => {
        ul.style.left = "0px";
        xBtn.classList.remove("hidden");
    };
}

if (xBtn) {
    xBtn.onclick = () => {
        ul.style.left = "-300px";
        xBtn.classList.add("hidden");
    };
}

// contact form & WhatsApp integration
document.addEventListener('DOMContentLoaded', function () {
    var sendBtn = document.getElementById('send');
    var statusEl = document.getElementById('status');
    var WHATSAPP_NUMBER = '972593419076';

    function showStatus(message, ok) {
        if (!statusEl) return;
        statusEl.textContent = message;
        statusEl.className = 'min-h-[1.5rem] text-sm ' + (ok ? 'text-olive' : 'text-melon');
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', function () {
            var nameInput = document.getElementById('name');
            var emailInput = document.getElementById('email');
            var msg = document.getElementById('msg');

            if (!nameInput.value.trim()) {
                showStatus('اكتب اسمك من فضلك.', false);
                nameInput.focus();
                return;
            }

            var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
            if (!emailOk) {
                showStatus('أدخل بريد إلكتروني صحيح.', false);
                emailInput.focus();
                return;
            }

            if (msg.value.trim().length < 5) {
                showStatus('اكتب رسالتك (5 أحرف على الأقل).', false);
                msg.focus();
                return;
            }

            var text =
                'رسالة من موقع الجمعية\n' +
                'الاسم: ' + nameInput.value.trim() + '\n' +
                'البريد: ' + emailInput.value.trim() + '\n' +
                'الرسالة: ' + msg.value.trim();

            window.open(
                'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text),
                '_blank', 'noopener'
            );

            showStatus('تم فتح واتساب. اضغطي إرسال هناك لإكمال الرسالة.', true);
            nameInput.value = '';
            emailInput.value = '';
            msg.value = '';
        });
    }
});

if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
        if (!user) {
            window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin/";
            });
        }
    });
}