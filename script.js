const toggleButton = document.querySelector('.menu-toggle');
const sidebar = document.getElementById('sidebar');
const closeButton = document.querySelector('.close-menu');
const menuLinks = document.querySelectorAll('nav a');
const contentArea = document.getElementById('content-area');

// ตัวแปรเก็บสถานะ
let currentAudio = null;
let lastClickTime = 0;
const CLICK_DELAY = 1000; // 1 วินาที

// เปิดเมนู
toggleButton.addEventListener('click', () => {
  sidebar.classList.add('active');
});

// ปิดเมนู
closeButton.addEventListener('click', () => {
  sidebar.classList.remove('active');
});

// โหลดบทเรียน
menuLinks.forEach(link => {
  link.addEventListener('click', async (e) => {
    e.preventDefault();
    sidebar.classList.remove('active');
    const lessonFile = link.getAttribute('data-lesson');

    if (lessonFile === "welcome") {
      contentArea.innerHTML = `
        <div id="welcome" class="lesson-content active">
          <div class="lesson-card">
            <h2>ຍິນດີຕ້ອນຮັບ</h2>
            <p>ເລືອກບົດຮຽນຈາກເມນູທາງຊ້າຍ</p>
          </div>
        </div>`;
      return;
    }

    try {
      const response = await fetch(lessonFile);
      const html = await response.text();
      contentArea.innerHTML = html;
      attachSoundButtons(); // รีเซ็ตและผูกปุ่มเสียงใหม่ทุกครั้ง
    } catch (error) {
      contentArea.innerHTML = `<p style="color:red">ບໍ່ສາມາດໂຫຼດບົດຮຽນໄດ້</p>`;
    }
  });
});

// ฟังก์ชันเล่นเสียง (มี delay 1 วินาที)
function attachSoundButtons() {
  const soundButtons = document.querySelectorAll('.btn-speak');
  
  // ลบ event listeners เดิมออกก่อน
  soundButtons.forEach(button => {
    button.replaceWith(button.cloneNode(true));
  });

  // เลือกปุ่มใหม่หลังจาก clone
  const newSoundButtons = document.querySelectorAll('.btn-speak');
  
  newSoundButtons.forEach(button => {
    button.addEventListener('click', function() {
      const currentTime = Date.now();
      
      // ตรวจสอบว่ายังอยู่ในช่วง delay หรือไม่
      if (currentTime - lastClickTime < CLICK_DELAY) {
        return; // ยังไม่ครบ 1 วินาที, ไม่ทำอะไร
      }
      
      // อัพเดทเวลากดล่าสุด
      lastClickTime = currentTime;
      
      // ถ้ามีเสียงกำลังเล่นอยู่ ให้หยุดและรีเซ็ตก่อน
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      
      // เล่นเสียงใหม่
      const soundFile = this.getAttribute('data-sound');
      currentAudio = new Audio(soundFile);
      currentAudio.play();
    });
  });
}

// เรียกครั้งแรก
attachSoundButtons();
