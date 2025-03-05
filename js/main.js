
/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: 'true',
    slidesPerView: 'auto',
    centeredSlides: true,
    
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    breakpoints: {
        992: {
          spaceBetween: 80,
        },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {   
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
  // reset: true
})

sr.reveal(`.home__img, .new__container, .footer__container`)
sr.reveal(`.home__data`, {delay: 500})
sr.reveal(`.giving__content, .gift__card`,{interval: 100})
sr.reveal(`.celebrate__data, .message__form, .footer__img1`,{origin: 'left'})
sr.reveal(`.celebrate__img, .message__img, .footer__img2`,{origin: 'right'})

let timerInterval;
let audio = new Audio('./assets/tistreza.mp3'); // Caminho para o arquivo de áudio

// Função para tocar o som
function playSound() {
  audio.play();
}

// Função para iniciar o temporizador
function startTimer() {
  let timerDisplay = document.getElementById('timer');
  let timeLeft = 2 * 60; // 2 minutos em segundos
  timerInterval = setInterval(function() {
    timeLeft--;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;

    // Verifica se o tempo chegou a zero
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      playSound(); // Toca o som quando o tempo zerar
    }
  }, 1000);
}

// Função para formatar o tempo (ex: 1:09)
function formatTime(time) {
  return time < 10 ? '0' + time : time;
}

// Função para parar o temporizador
function stopTimer() {
  clearInterval(timerInterval);
}

// Função para zerar o temporizador
function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById('timer').textContent = '02:00';
}

// Salvar os dados de peso e repetições
function saveData() {
  const kg = document.getElementById("kg").value;
  const reps = document.getElementById("reps").value;
  
  if (kg && reps) {
    const dataList = document.getElementById("data-list");
    const listItem = document.createElement("li");
    listItem.textContent = `Peso: ${kg} kg - Repetições: ${reps}`;
    dataList.appendChild(listItem);
    
    // Limpar os campos
    document.getElementById("kg").value = "";
    document.getElementById("reps").value = "";
  } else {
    alert("Por favor, preencha os campos de peso e repetições.");
  }
}
        // Função para mostrar ou esconder o bloco de notas
        function toggleNoteContainer() {
          const noteContainer = document.getElementById("noteContainer");
          const toggleButton = document.querySelector(".toggle-btn");
    
          // Alternar a visibilidade do bloco de notas
          if (noteContainer.style.display === "none" || noteContainer.style.display === "") {
            noteContainer.style.display = "block";
            toggleButton.innerText = "Fechar Bloco de Notas"; // Muda o texto do botão
          } else {
            noteContainer.style.display = "none";
            toggleButton.innerText = "Abrir Bloco de Notas"; // Restaura o texto do botão
          }
        }
    
        // Função para salvar a nota no localStorage
        function saveNote() {
          const noteContent = document.getElementById("note").value;
    
          if (noteContent.trim() !== "") {
            // Recupera as notas salvas ou cria um array vazio
            let notes = JSON.parse(localStorage.getItem("notes")) || [];
            
            // Adiciona a nova nota ao array
            notes.push(noteContent);
            
            // Salva o array de notas no localStorage
            localStorage.setItem("notes", JSON.stringify(notes));
            
            // Limpa o campo de texto
            document.getElementById("note").value = "";
    
            // Atualiza a lista de notas salvas
            showSavedNotes();
          }
        }
    
        // Função para exibir as notas salvas
        function showSavedNotes() {
          const savedNotesContainer = document.getElementById("savedNotes");
          savedNotesContainer.innerHTML = ''; // Limpa a área de notas salvas
    
          // Recupera as notas salvas no localStorage
          const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    
          // Exibe todas as notas salvas
          savedNotes.forEach(function(note, index) {
            const noteDiv = document.createElement("div");
            noteDiv.classList.add("saved-note");
            noteDiv.innerText = note;
            
            // Adiciona um botão de exclusão a cada nota
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Excluir";
            deleteButton.classList.add("delete-single-btn");
            deleteButton.onclick = function() {
              deleteSingleNote(index);
            };
    
            // Adiciona a nota e o botão de exclusão ao contêiner
            noteDiv.appendChild(deleteButton);
            savedNotesContainer.appendChild(noteDiv);
          });
        }
    
        // Função para excluir uma anotação específica
        function deleteSingleNote(index) {
          // Recupera as notas salvas no localStorage
          let notes = JSON.parse(localStorage.getItem("notes")) || [];
    
          // Remove a nota pelo índice
          notes.splice(index, 1);
    
          // Atualiza o localStorage com as notas restantes
          localStorage.setItem("notes", JSON.stringify(notes));
    
          // Atualiza a exibição das notas salvas
          showSavedNotes();
        }
    
        // Exibe as notas salvas quando a página é carregada
        window.onload = function() {
          showSavedNotes();
        };
        function toggleFooter() {
          var footer = document.getElementById('footer');
          var button = document.getElementById('toggle-footer-btn');
        
          // Se o footer estiver desativado (oculto)
          if (footer.style.display === 'none' || footer.style.display === '') {
            footer.style.display = 'block';  // Ativar o footer
            footer.classList.remove('disabled');  // Certifique-se de que não há classe 'disabled'
            button.textContent = 'Desativar Tempo de Descanso';  // Alterar o texto do botão
          } else {
            footer.style.display = 'none';  // Ocultar o footer (desativar)
            footer.classList.add('disabled');  // Adicionar classe para desativar interações
            button.textContent = 'Tempo de Descanso';  // Alterar o texto do botão
          }
        }
        
// Exemplo de como você pode implementar o método deleteNote no objeto noteBlock
const noteBlock = {
  saveNote: function() {
    const note = document.getElementById('note').value;
    if (note.trim() !== '') {
      const savedNotes = document.getElementById('savedNotes');
      const noteElement = document.createElement('div');
      noteElement.classList.add('saved-note');
      noteElement.innerHTML = note + ' <button onclick="noteBlock.deleteSingleNote(this)">Deletar</button>';
      savedNotes.appendChild(noteElement);
      document.getElementById('note').value = ''; // Limpar a área de texto
    }
  },
  
  deleteNote: function() {
    document.getElementById('note').value = ''; // Limpar o texto da anotação
  },

  deleteSingleNote: function(button) {
    const noteElement = button.parentElement;
    noteElement.remove(); // Remove a anotação específica
  },

  toggleNoteContainer: function() {
    const container = document.getElementById('noteContainer');
    container.style.display = container.style.display === 'none' ? 'block' : 'none';
  }
};

        
        