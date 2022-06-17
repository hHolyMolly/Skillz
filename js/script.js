//< " КАСТОМНЫЙ СЕЛЕКТ " >=============================================================================================================>//
function select() {
	const locationSelect = document.querySelector('.header-location__select');

	function showSelect(elem) {
		const selectSelected = elem.querySelector('.select__selected');
		const selectItems = elem.querySelectorAll('.select__item');
		const selectBtn = elem.querySelector('.select__btn');
		let selectList = selectItems[0];

		selectList.classList.add('_current');

		selectBtn.addEventListener('click', function () {
			selectBtn.parentElement.classList.toggle('_active');
			selectBtn.classList.toggle('_active');
		});

		selectItems.forEach(function (currentElement) {
			currentElement.addEventListener('click', function () {
				selectList.classList.remove('_current');
				selectList = currentElement;
				currentElement.classList.add('_current');
				selectSelected.innerText = currentElement.textContent;

				if (selectBtn.parentElement.classList.contains("_active")) {
					selectBtn.parentElement.classList.remove("_active")
					selectBtn.classList.remove('_active');
				}
			});
		});

		document.addEventListener("click", function (e) {
			const elementTarget = e.target;

			if (selectBtn.classList.contains("_active") && !elementTarget.closest(".select")) {
				selectBtn.parentElement.classList.remove("_active")
				selectBtn.classList.remove('_active');
			}
		})

	};
	showSelect(locationSelect);
}
select()



//< " ВЫПАДАЮЩИЙ СПИСОК ПОЛЬЗОВАТЕЛЯ " >=============================================================================================================>//
function userShow() {
	const userBtn = document.querySelector(".header-user__dropdown");
	const userBody = document.querySelector(".header-user__body");

	userBtn.addEventListener("click", function () {
		userBtn.classList.toggle("_active");
		userBody.classList.toggle("_active");
	});

	document.addEventListener("click", function (e) {
		const elementTarget = e.target;

		if (userBtn.classList.contains("_active") && userBody.classList.contains("_active") && !elementTarget.closest(".header-action__user")
			|| elementTarget.closest(".header-user__close")) {
			userBtn.classList.remove("_active");
			userBody.classList.remove("_active");
		}
	});

	document.addEventListener("keyup", function (e) {
		if (e.code === "Escape") {
			userBtn.classList.remove("_active");
			userBody.classList.remove("_active");
		}
	});
}
userShow()

//< " МЕНЮ БУРГЕР " >=============================================================================================================>//
function мenuBurger() {
	const menuBody = document.querySelector(".header-menu__body");
	const menuWrapper = document.querySelector(".header-menu__wrapper");

	const body = document.body;

	document.addEventListener("click", function (e) {
		const elementTarget = e.target;

		if (elementTarget.closest(".header-menu__burger")) {
			menuBody.classList.add("_active");
			menuWrapper.classList.add("_active");
			body.classList.add("_lock-scroll");
		}

		if (elementTarget.closest(".header-menu__wrapper") || elementTarget.closest(".header-menu__close") || elementTarget.closest(".header-menu__logo")) {
			menuBody.classList.remove("_active");
			menuWrapper.classList.remove("_active");
			body.classList.remove("_lock-scroll");
		}
	});
}
мenuBurger()

//< " ПОИСКОВОЙ ЗАПРОС ПО КЛИКУ НА КНОПКУ " >=============================================================================================================>//
function showSearch() {
	const searchOpen = document.querySelector(".header-search__open");
	const searchBody = document.querySelector(".header-search__item");

	searchOpen.addEventListener("click", function () {
		searchBody.classList.toggle('_active');
	});

	document.addEventListener("click", function (e) {
		const elementTarget = e.target;

		if (!elementTarget.closest(".header-search") && searchBody.classList.contains('_active') && window.innerWidth < 552.2) {
			searchBody.classList.remove('_active');
			searchOpen.style.display = "flex";
		}
	});
}
showSearch()

//< " ДОБАВЛЕНИЕ КЛАССА ХЕДЕРУ ПРИ СКРОЛЛЕ " >=============================================================================================================>//
function scrollHeader() {

	const header = document.querySelector('.header');

	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			header.classList.remove('_scroll');
		} else {
			header.classList.add('_scroll');
		}
	};

	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(header);

}
scrollHeader()


//< " ДИНАМИЧЕСКИЙ АДАПТИВ " >=============================================================================================================>//
function dynamicAdaptive() {
	function DynamicAdapt(type) {
		this.type = type;
	}

	DynamicAdapt.prototype.init = function () {
		const _this = this;
		this.оbjects = [];
		this.daClassname = "_dynamic_adapt_";
		this.nodes = document.querySelectorAll("[data-da]");

		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const data = node.dataset.da.trim();
			const dataArray = data.split(",");
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(dataArray[0].trim());
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
			оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		}

		this.arraySort(this.оbjects);

		this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
			return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
		}, this);
		this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
			return Array.prototype.indexOf.call(self, item) === index;
		});

		for (let i = 0; i < this.mediaQueries.length; i++) {
			const media = this.mediaQueries[i];
			const mediaSplit = String.prototype.split.call(media, ',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];

			const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
				return item.breakpoint === mediaBreakpoint;
			});
			matchMedia.addListener(function () {
				_this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		}
	};

	DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
		if (matchMedia.matches) {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			}
		} else {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				if (оbject.element.classList.contains(this.daClassname)) {
					this.moveBack(оbject.parent, оbject.element, оbject.index);
				}
			}
		}
	};

	DynamicAdapt.prototype.moveTo = function (place, element, destination) {
		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.insertAdjacentElement('beforeend', element);
			return;
		}
		if (place === 'first') {
			destination.insertAdjacentElement('afterbegin', element);
			return;
		}
		destination.children[place].insertAdjacentElement('beforebegin', element);
	}

	DynamicAdapt.prototype.moveBack = function (parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].insertAdjacentElement('beforebegin', element);
		} else {
			parent.insertAdjacentElement('beforeend', element);
		}
	}

	DynamicAdapt.prototype.indexInParent = function (parent, element) {
		const array = Array.prototype.slice.call(parent.children);
		return Array.prototype.indexOf.call(array, element);
	};

	DynamicAdapt.prototype.arraySort = function (arr) {
		if (this.type === "min") {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return -1;
					}

					if (a.place === "last" || b.place === "first") {
						return 1;
					}

					return a.place - b.place;
				}

				return a.breakpoint - b.breakpoint;
			});
		} else {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return 1;
					}

					if (a.place === "last" || b.place === "first") {
						return -1;
					}

					return b.place - a.place;
				}

				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	};

	const da = new DynamicAdapt("max");
	da.init();

}
dynamicAdaptive()