// 'use strict';

// var player;
// function onYouTubeIframeAPIReady() {
// 	player = new YT.Player('player', {
// 		height: '320',
// 		width: '560',
// 		videoId: 'M38aWHxwtXE',
// 		events: {
// 			'onReady': onPlayerReady,
// 		}
// 	});
// }

// function onPlayerReady(event) {
// 	event.target.playVideo();
// }

// function videoPlay() {
// 	player.videoPlay();
// }

let mySwiper = new Swiper('.honors-slider', {

	speed: 400,
	slidesPerView: 3,
	loop: true,
	navigation: {
		nextEl: '.honors-button-next',
		prevEl: '.honors-button-prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			navigation: {
				nextEl: '.honors-2-button-next',
				prevEl: '.honors-2-button-prev',
			},
		},
		700: {
			slidesPerView: 2,
			spaceBetween: 10
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 40
		}
	},
});

let mySwiper1 = new Swiper('.clients-slider', {

	speed: 400,
	slidesPerView: 3,
	loop: true,
	navigation: {
		nextEl: '.clients-button-next',
		prevEl: '.clients-button-prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			navigation: {
				nextEl: '.clients-2-button-next',
				prevEl: '.clients-2-button-prev',
			},
		},
		700: {
			slidesPerView: 2,
			spaceBetween: 10
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 40
		}
	},
});

let mySwiper2 = new Swiper('.offers-slider', {
	slidesPerView: 1,
	loop: true,
	navigation: {
		nextEl: '.offers-2-button-next',
		prevEl: '.offers-2-button-prev',
	},
});

let mySwiper3 = new Swiper('.all-inclusive-slider', {
	slidesPerView: 1,
	loop: true,
	navigation: {
		nextEl: '.all-inclusive-2-button-next',
		prevEl: '.all-inclusive-2-button-prev',
	},
});

const quizSwiper = new Swiper('.quiez__slider', {
	speed: 400,
	slidesPerView: 1,
	loop: false,
	navigation: {
		nextEl: '.quiez__swiper-button-next',
		prevEl: '.quiez__swiper-button-prev',
  	},
  	pagination: {
		el: '.quiez__swiper-pagination',
		clickable: true,
		renderBullet: (index, className) => {	// поменял скидку с 5% на 10%
			return `<div class="${className} swiper-custom-bullet"><p class="quiz-bullet-discount-block"><span class="quiz-bullet-discount-percent">10%</span><br>Ваша скидка</p><div class="quiz-bullet"></div></div>`;
	}
  	},
  	on: {
		slideChange: function () {
	  		const prevButton = document.querySelector('.quiez__navigation-container > .quiez__swiper-button-prev'),
				nextButton = document.querySelectorAll('.quiez__navigation-container > .quiez__swiper-button-next')[1],
				submitButton = document.querySelector('.quiez__navigation-container > .quiez__swiper-button-next--big'),
				submitButtonText = submitButton.querySelector('.big-arrow-text');

		  	if (quizSwiper.activeIndex === quizSwiper.slides.length - 1) {
				nextButton.style.visibility = 'hidden';
				submitButtonText.textContent = 'Отправить';

				submitButton.addEventListener('click', clickListener);

				submitButton.ariaDisabled = false;
				submitButton.classList.remove('swiper-button-disabled');
		  	} else {
				const submitButton = document.querySelector('.quiez__swiper-button-next--big');
				submitButton.querySelector('.big-arrow-text').textContent = 'Следующий вопрос';
				submitButton.removeEventListener('click', clickListener);

				nextButton.style.visibility = 'visible';

				if (quizSwiper.activeIndex > 0) {
			  		prevButton.style.visibility = 'visible';
				} else {
					prevButton.style.visibility = 'hidden';
					nextButton.style.visibility = 'hidden';
					submitButton.querySelector('.big-arrow-text').textContent = 'Пройти тест';
				}
				}
				
				// логика для увеличения всех буллетов перед активным
				const quizBullets = document.querySelectorAll('.quiz-bullet');

				for (let i = 0; i < quizBullets.length; i++) {
					if (i <= quizSwiper.activeIndex) {
						quizBullets[i].style.height = '21px';
						quizBullets[i].style.width = '21px';
						quizBullets[i].style.marginTop = '5px';
					} else {
						quizBullets[i].style.height = '11px';
						quizBullets[i].style.width = '11px';
						quizBullets[i].style.marginTop = '11px';
					}
				}
		}
  	}
});


const range = document.querySelector('.wall-square-select'),
	rangeContent = document.querySelector('.wall-square-amount');

range.addEventListener('input', () => {
  	rangeContent.innerHTML = `${range.value} м<sup>2</sup>`;
});

const filesInput = document.querySelector('.slider-files');
filesInput.addEventListener("change", () => {
  	const fileList = filesInput.files;
});



  // плавный переход по меню
const smoothDocument = () => {
	const menuItem = document.querySelectorAll('.main-menu__item > a'),
		mainDisplayFooterLink = document.querySelector('.main-display__footer-link > a');
  	anchors = [...menuItem];
  	anchors[anchors.length] = mainDisplayFooterLink;
  	anchors.forEach(item => {
		item.addEventListener('click', event => {
	  		event.preventDefault();
	  		const blockID = item.getAttribute('href').substr(1);
	  		if (blockID !== 'close') {
				document.getElementById(blockID).scrollIntoView({
		 			behavior: 'smooth',
		 			 block: 'start'
				});
	  		}
		});
  	});
};
smoothDocument();


// появление/закрытие модалки
const modalView = () => {
  	const mainMenuModeBut = document.querySelector('.main-menu__mode-but'),
  		mainDisplayButWrap = document.querySelector('.main-display__but-wrap'),
		modal = document.querySelector('.modal');

		mainMenuModeBut.addEventListener('click', () => {
		modal.classList.remove('modal__display');
		document.getElementById('present').style.display = 'none';
		document.getElementById('measurement').style.display = 'flex';
	});

		mainDisplayButWrap.addEventListener('click', () => {
		modal.classList.remove('modal__display');
		document.getElementById('present').style.display = 'flex';
		document.getElementById('measurement').style.display = 'none';
	});

  	modal.addEventListener('click', event => {
		if (event.target.matches('.modal__close') ||
	  		event.target.matches('.modal')) {
			modal.classList.add('modal__display');
		}
  	});
};
modalView();


// отправка
const postDataForm = body => {
	return fetch('send.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
};


// Появление и скрытие сообщения
const newModalView = (arg, error) => {
	const modalNew = document.getElementById('send-finaly'),
		statusMessage = modalNew.querySelector('h3'),
		modal = document.querySelector('.modal');
		modalNew.classList.toggle('modal-news');
	if (arg === 0) {
		statusMessage.innerHTML = `<span class="title-document__header_bold">
			Спасибо за обращение к нам! </span> <br> Менеджер свяжется
					с Вами в ближайшее время `;
		modal.classList.add('modal__display');
	} else {
		statusMessage.innerHTML = `<span class="title-document__header_bold"> ${error}</span>`;
		modal.classList.add('modal__display');
	}
};

// Формирование и отправка КВИЗА
const clickListener = () => {
    const squareButtons = document.querySelectorAll('[id^="squareChoice"]'),
    	container = document.querySelector('.quiez__navigation-container'),
	    typeButtons = document.querySelectorAll('[id^="typeChoice"]'),
	    materialButtons = document.querySelectorAll('[id^="materialChoice"]'),
	    preparedButtons = document.querySelectorAll('[id^="preparedChoice"]'),
	    extraButtons = document.querySelectorAll('[id^="extraChoice"]'),
	    wallSquare = document.querySelector('.wall-square-amount'),
	    filesInput = document.querySelector('.slider-files'),
	    dataObj = {},
	    messageInput = document.querySelector('.slider-text'),
	    customCheckbox = document.querySelectorAll('.custom-checkbox'),
	    wallSquareSelect = document.querySelector('.wall-square-select');


	const enumerateButtons = (buttons, field, isRadio) => {
			for (let button of buttons) {
			if (button.checked === true) {
		  		if (isRadio) {
					if (field === 'prepared') {
			 			 dataObj[field] = button.value ? 'Поверхность подготовлена для штукатурки' : 'Поверхность не подготовлена для штукатурки';
					} else {
			  			dataObj[field] = button.value;
					}
					break;
		  		} else {
				dataObj[field] += button.value + ', ';
		  		}
			}
	  	}
		if (!isRadio && dataObj[field] != undefined && dataObj[field].length > 0) {
			dataObj[field] = dataObj[field].substring(0, dataObj[field].length - 2);
	  	}
	};
	dataObj.type = '';
	dataObj.material = '';
	dataObj.extra = '';

	enumerateButtons(squareButtons, 'square', true);
	enumerateButtons(typeButtons, 'type', false);
	enumerateButtons(materialButtons, 'material', false);
	enumerateButtons(preparedButtons, 'prepared', true);
	enumerateButtons(extraButtons, 'extra', false);

	dataObj.wallSquare = wallSquare.textContent;

	if (filesInput.files.item(0) !== null) {
	  	dataObj.fileName = filesInput.files.item(0).name;
	} else {
	  	dataObj.fileName = "";
	}
	dataObj.message = messageInput.value;
	dataObj.select = 1;

	// добавил проверку - если форма не заполнена, показываем модалку
	if (checkObjectForEmptiness(dataObj)) {
		postDataForm(dataObj)
		.then(response => {
			if (response.status !== 200) {
				throw new Error('Что-то пошло не так...');
			}
			newModalView(0);
			wallSquare.innerHTML = '1 м<sup>2</sup>';
			wallSquareSelect.value = '1';
			messageInput.value = '';
			filesInput.value = '';

	// Вот здесь пытаюсь сбросить кнопки
	// ---------------------------------------------------------------------------------
			const buttonPrev = document.querySelector('.quiez__swiper-button-prev'),
				buttonNext = document.querySelectorAll('.quiez__swiper-button-next'),
				submitButton = document.querySelector('.quiez__swiper-button-next--big'),
				submitButtonText = submitButton.querySelector('.big-arrow-text');
				buttonPrev.classList.add('swiper-button-disabled');
				
				submitButtonText.textContent = 'Следующий вопрос';
				buttonNext[1].classList.remove('swiper-button-disabled');
				buttonNext[1].style.visibility = 'visible';
				submitButton.ariaDisabled = true;
				buttonNext[1].ariaDisabled = false;
				buttonNext[1].tabindex = 1;
				submitButton.removeEventListener('click', clickListener);
	// ---------------------------------------------------------------------------------

			const swiperWrapper = document.querySelector('#swiper-wrapper');
			swiperWrapper.style.transform = '';
			const swiperCustomBullet = document.querySelectorAll('.swiper-custom-bullet');
			swiperCustomBullet.forEach((elem, index) => {
				if (index !== 0) {
					elem.classList.remove('swiper-pagination-bullet-active');
				} else {
					elem.classList.add('swiper-pagination-bullet-active');
				}
			});
			customCheckbox.forEach(item => {
				item.checked = false;
			});
		})
		.catch(error => {
			newModalView(1, error);
		})
		.finally(() => {
			setTimeout(newModalView, 5000);
		});
	} else {
		newModalView(1, "Заполните форму!");
	}
};

// проверка заполнения формы
const checkObjectForEmptiness = (dataObj) => {
	for (let field in dataObj) {
		if (dataObj[field] != undefined && dataObj[field] != '' && field != 'select' && field != 'wallSquare') {
			return true;
		}
	}

	return false;
}

// Валидация
const validation = form => {
	maskPhone('#user-phone');
	form.querySelectorAll('input').forEach(elem => {
		elem.addEventListener('input', event => {
			if (event.target.matches('#user-email')) {
				elem.value = elem.value.replace(/[^a-z@.]/gi, '');
			}
			if (event.target.closest('.rating__form-column') &&
				!event.target.matches('#user-phone')) {
				elem.value = elem.value.replace(/[^\d,.]/gi, '');
			}
			if (event.target.matches('.rating__form-input-big')) {
				elem.value = elem.value.replace(/[^а-я.,0-9-/ ]/gi, '');
			}
			if (event.target.matches('#user-name')) {
				elem.value = elem.value.replace(/[^а-я ]/gi, '');
			}
		});
	});
};


// Формирование и отправка форм
const sendData = () => {
	const forms = document.querySelectorAll('.form'),
	ratingForm = document.querySelector('.rating__form'),
		body = {};
		let form = [];
	form = [...forms];
	form[form.length] = ratingForm;
  	form.forEach(item => {

  		const sendForm = () => {
		  	const formData = new FormData(item);
			formData.forEach((elem, index) => {
				body[index] = elem;
				const button = item.querySelectorAll('button');
				button.forEach(but => {
					if (but.style.display !== 'none') {
						body.val = but.textContent.trim();
					}
				});
				if (event.target.matches('.form')) {
					body.select = 0;
				}
				if (event.target.matches('.rating__form')) {
					body.select = 3;
				}  
			});

			postDataForm(body)
			.then(response => {
				if (response.status !== 200) {
				  	throw new Error('Что-то пошло не так...');
				}
				newModalView(0);
				item.querySelectorAll('input').forEach(elem => {
			   		elem.value = '';
				});
				if (item.querySelector('input[name="policyCheckbox"]')) {
					item.querySelector('input[name="policyCheckbox"]').checked = false;
				}
				if (item.querySelectorAll('.rating__form-checkbox')) {
					item.querySelectorAll('.rating__form-checkbox').forEach(con => {
						con.querySelector('input').checked = false;
					});
				}
			})
			.catch(error => {
				newModalView(1, error);
			})
			.finally(() => {
				setTimeout(newModalView, 5000);
			});
		}; 

		validation(item);

		item.addEventListener('submit', event => {
		  	event.preventDefault();
		  	const arrCkeck = item.querySelector('input[name="policyCheckbox"]');
		  	const arrCheckConnect = item.querySelectorAll('.rating__form-checkbox');
		  	if (arrCkeck && !arrCkeck.checked) {
		  		item.querySelector('.policy__label').style.border = '2px solid red';
		  		arrCkeck.addEventListener('change', () => {
		  			if (arrCkeck.checked) {
		  				item.querySelector('.policy__label').style.border = 'none';
		  			}
		  		});
		  		return;
		  	} 
		  	if (!arrCkeck && arrCheckConnect) {
				let count = 0;
				arrCheckConnect.forEach(con => {
					if (con.querySelector('input').checked) {
						return;
					} else {
						count ++;
					}
				});
				if (count > 0 && count === arrCheckConnect.length) {
					document.querySelector('.rating__form-checkbox-wrap').style.border = 'solid 2px red';
					arrCheckConnect.forEach(con => {
						con.addEventListener('change', () => {
							document.querySelector('.rating__form-checkbox-wrap').style.border = 'none';
						});
					});
					count =0;
				} else {
					count =0;
					document.querySelector('.rating__form-checkbox-wrap').style.border = 'none';
					sendForm();
				}
			} else {
				sendForm();
		  	} 
		});
	});
};
sendData();