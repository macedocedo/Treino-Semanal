
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
let selectedTime = 2 * 60; // Tempo padrão: 2 minutos
let audio = new Audio('./assets/tistreza.mp3'); // Caminho para o arquivo de áudio

// Função para tocar o som
function playSound() {
  audio.play();
}

let vibrationInterval;
let isVibrating = false;

function toggleVibration() {
  const vibrateBtn = document.getElementById('vibrate-btn');
  
  if (isVibrating) {
    // Parar vibração
    clearInterval(vibrationInterval);
    vibrateBtn.textContent = "🔊 Vibrar";
    vibrateBtn.classList.remove('vibrating');
    isVibrating = false;
  } else {
    // Iniciar vibração
    vibrateBtn.textContent = "■ Parar";
    vibrateBtn.classList.add('vibrating');
    isVibrating = true;
    
    // Vibrar imediatamente e então a cada 2 segundos
    vibrateDevice();
    vibrationInterval = setInterval(vibrateDevice, 2000);
  }
}

function vibrateDevice() {
  // Verifica se a API de vibração é suportada
  if ("vibrate" in navigator) {
    // Vibra por 500ms
    navigator.vibrate(500);
  } else {
    alert("Seu dispositivo não suporta vibração ou o navegador não tem permissão.");
  }
}

// Função para iniciar ou reiniciar o temporizador
function startTimer() {
  let timerDisplay = document.getElementById('timer');
  let timeLeft = selectedTime;


  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(function () {
    timeLeft--;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;

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
  document.getElementById('timer').textContent = `${formatTime(selectedTime / 60)}:00`;
}


// Funções para controle do tempo customizado
function toggleTimeOptions() {
  const options = document.getElementById('time-options');
  options.style.display = options.style.display === 'none' ? 'block' : 'none';
}

function setTimer(minutes) {
  selectedTime = minutes * 60;
  resetTimer(); // Reinicia o temporizador ao escolher um novo tempo
  toggleTimeOptions();
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
            button.textContent = 'Desativar Registro';  // Alterar o texto do botão
          } else {
            footer.style.display = 'none';  // Ocultar o footer (desativar)
            footer.classList.add('disabled');  // Adicionar classe para desativar interações
            button.textContent = 'Registro';  // Alterar o texto do botão
          }
        }

         // Função para salvar o estado de um checkbox no sessionStorage
    function saveCheckboxState(checkbox) {
      // Salva o estado (checked) do checkbox no sessionStorage usando o id como chave
      sessionStorage.setItem(checkbox.id, checkbox.checked);
  }

  // Função para carregar o estado de um checkbox do sessionStorage
  function loadCheckboxState(checkbox) {
      // Recupera o estado salvo no sessionStorage e aplica no checkbox
      var storedState = sessionStorage.getItem(checkbox.id);
      checkbox.checked = storedState === 'true'; // Se o valor salvo for 'true', o checkbox será marcado
  }

  // Função para resetar apenas os checkboxes selecionados (marcados)
  function resetSelectedCheckboxes() {
      var checkboxes = document.querySelectorAll('.checkbox');
      
      // Desmarcar apenas os checkboxes que estão selecionados (marcados)
      checkboxes.forEach(function(checkbox) {
          if (checkbox.checked) {
              checkbox.checked = false; // Desmarca o checkbox
              saveCheckboxState(checkbox); // Salva o novo estado (desmarcado) no sessionStorage
          }
      });
  }

  // Chama a função de carregar os estados dos checkboxes quando a página for carregada
  window.onload = function() {
      var checkboxes = document.querySelectorAll('.checkbox');
      
      // Carrega o estado de cada checkbox individualmente
      checkboxes.forEach(function(checkbox) {
          loadCheckboxState(checkbox);
          
          // Adiciona o evento de clique para salvar o estado sempre que o checkbox for alterado
          checkbox.addEventListener('click', function() {
              saveCheckboxState(checkbox);
          });
      });


  }
        

