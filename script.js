const toggleButton = document.querySelector('.menu-toggle');
const sidebar = document.getElementById('sidebar');
const closeButton = document.querySelector('.close-menu');
const menuLinks = document.querySelectorAll('nav a');
const contentArea = document.getElementById('content-area');

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
      attachSoundButtons(); // รีผูกปุ่มเสียงใหม่ทุกครั้ง
    } catch (error) {
      contentArea.innerHTML = `<p style="color:red">ບໍ່ສາມາດໂຫຼດບົດຮຽນໄດ້</p>`;
    }
  });
});

// ฟังก์ชันเล่นเสียง
function attachSoundButtons() {
  const soundButtons = document.querySelectorAll('.btn-speak');
  soundButtons.forEach(button => {
    button.addEventListener('click', () => {
      const soundFile = button.getAttribute('data-sound');
      const audio = new Audio(soundFile);
      audio.play();
    });
  });
}

// เรียกครั้งแรก
attachSoundButtons();