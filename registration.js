// تعريف دالة فتح الكاميرا
function openCamera() {
    document.getElementById("cameraStream").style.display = "block";
    
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            const video = document.getElementById("video");
            video.srcObject = stream;
            window.currentStream = stream; // حفظ الـ stream للتحكم فيه لاحقًا
        })
        .catch(error => {
            console.error("حدث خطأ عند محاولة الوصول إلى الكاميرا:", error);
        });
}

// تعريف دالة إيقاف الكاميرا
function stopCamera() {
    if (window.currentStream) {
        window.currentStream.getTracks().forEach(track => track.stop());
        document.getElementById("cameraStream").style.display = "none";
    }
}

// تعريف دالة التقاط الصورة
function capturePhoto() {
    const video = document.getElementById("video");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // رسم الإطار الحالي من الفيديو على اللوحة (canvas)
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // تحويل الصورة الملتقطة إلى Base64
    const photoData = canvas.toDataURL("image/png");
    
    // عرض الصورة الملتقطة في preview
    const capturedImage = document.getElementById("capturedImage");
    capturedImage.src = photoData;
    document.getElementById("photoPreview").style.display = "block";
    
    // تخزين بيانات الصورة مؤقتاً (يمكن استخدامها لاحقاً لإرسالها إلى قاعدة البيانات)
    window.capturedPhotoData = photoData;
}
