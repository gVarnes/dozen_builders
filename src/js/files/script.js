// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

window.addEventListener("load", windowLoad);

function windowLoad() {
	// ФYHKцiя iнiціалізації
	function digitsCountersInit(digitsCountersItems) {
		let digitsCounters = digitsCountersItems
			? digitsCountersItems
			: document.querySelectorAll("[data-digits-counter]");
		if (digitsCounters) {
			digitsCounters.forEach((digitsCounter) => {
				digitsCountersAnimate(digitsCounter);
			});
		}
	}
	// Функцiя анімації
	function digitsCountersAnimate(digitsCounter) {
		let startTimestamp = null;
		const duration = parseInt(digitsCounter.dataset.digitsCounter)
			? parseInt(digitsCounter.dataset.digitsCounter)
			: 1000;
		const startValue = parseInt(digitsCounter.innerHTML);
		const startPosition = 0;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			digitsCounter.innerHTML = Math.floor(
				progress * (startPosition + startValue)
			);
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}
	// Пуск при загрузці сторiнки
	// digitsCountersInit();

	// Пуск при скроллі (появі блока з лiчільниками)
	let options = {
		threshold: 0.3,
	};
	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const targetElement = entry.target;
				const digitsCountersItems = targetElement.querySelectorAll(
					"[data-digits-counter]"
				);
				if (digitsCountersItems.length) {
					digitsCountersInit(digitsCountersItems);
				}
				// Buмкнуmu відслідковування після спрацювання
				// observer.unobserve (targetElement);
			}
		});
	}, options);
	let sections = document.querySelectorAll("section");
	if (sections.length) {
		sections.forEach((section) => {
			observer.observe(section);
		});
	}

	// Зворотній відлік таймеру

	function reverseTimer() {
		const date = new Date("March 20 2023");

		const hoursId = document.getElementById("timer-hours");
		const minutesId = document.getElementById("timer-minutes");
		const secondsId = document.getElementById("timer-seconds");

		function timerHelpre(number) {
			return number < 10 ? `0${number}` : number;
		}

		function timeCount() {
			const now = new Date();
			const timeDifference = date - now;

			const hours = Math.floor(timeDifference / 1000 / 60 / 60) % 24;
			const minutes = Math.floor(timeDifference / 1000 / 60) % 60;
			const seconds = Math.floor(timeDifference / 1000) % 60;

			if (timeDifference > 0) {
				hoursId.textContent = timerHelpre(hours);
				minutesId.textContent = timerHelpre(minutes);
				secondsId.textContent = timerHelpre(seconds);
			}
		}
		timeCount();
		setInterval(timeCount, 1000);
	}

	reverseTimer();
}
